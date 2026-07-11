/* わんこさんぽ ドット絵変換パイプライン（恒久版）
   gpt-image2の納品PNG（白背景・高解像度）をゲーム用に変換する。
   使い方: const P = require("./pixel-pipeline"); P.convW(src,dst,96); など */
const fs = require("fs");
const zlib = require("zlib");

function readPNG(path){
  const buf = fs.readFileSync(path);
  let pos = 8, w=0, h=0, bitDepth=0, colorType=0;
  const idat = [];
  while(pos < buf.length){
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos+4, pos+8);
    const data = buf.slice(pos+8, pos+8+len);
    if(type==="IHDR"){ w=data.readUInt32BE(0); h=data.readUInt32BE(4); bitDepth=data[8]; colorType=data[9]; }
    else if(type==="IDAT") idat.push(data);
    else if(type==="IEND") break;
    pos += 12 + len;
  }
  if(bitDepth !== 8) throw new Error("bitDepth!=8: "+path);
  const ch = colorType===6 ? 4 : colorType===2 ? 3 : colorType===0 ? 1 : -1;
  if(ch < 0) throw new Error("colorType "+colorType+" 未対応: "+path);
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = w*ch;
  const out = Buffer.alloc(w*h*4);
  let prev = Buffer.alloc(stride);
  for(let y=0;y<h;y++){
    const f = raw[y*(stride+1)];
    const line = raw.slice(y*(stride+1)+1, y*(stride+1)+1+stride);
    const cur = Buffer.alloc(stride);
    for(let i=0;i<stride;i++){
      const a = i>=ch ? cur[i-ch] : 0, b = prev[i], c = i>=ch ? prev[i-ch] : 0;
      let v = line[i];
      if(f===1) v=(v+a)&255; else if(f===2) v=(v+b)&255; else if(f===3) v=(v+((a+b)>>1))&255;
      else if(f===4){ const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);
        v=(v+(pa<=pb&&pa<=pc?a:pb<=pc?b:c))&255; }
      cur[i]=v;
    }
    for(let x=0;x<w;x++){
      const o=(y*w+x)*4;
      if(ch===4){ out[o]=cur[x*4]; out[o+1]=cur[x*4+1]; out[o+2]=cur[x*4+2]; out[o+3]=cur[x*4+3]; }
      else if(ch===3){ out[o]=cur[x*3]; out[o+1]=cur[x*3+1]; out[o+2]=cur[x*3+2]; out[o+3]=255; }
      else { out[o]=out[o+1]=out[o+2]=cur[x]; out[o+3]=255; }
    }
    prev = cur;
  }
  return { w, h, data: out };
}

const CRC_TABLE = (()=>{ const t=[]; for(let n=0;n<256;n++){ let c=n; for(let k=0;k<8;k++) c = c&1 ? 0xEDB88320 ^ (c>>>1) : c>>>1; t[n]=c>>>0; } return t; })();
function crc32(buf){ let c=0xFFFFFFFF; for(let i=0;i<buf.length;i++) c = CRC_TABLE[(c^buf[i])&0xFF] ^ (c>>>8); return (c^0xFFFFFFFF)>>>0; }
function chunk(type, data){
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, "ascii");
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([Buffer.from(type,"ascii"), data])), 8+data.length);
  return out;
}
function writePNG(p, w, h, rgba){
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w,0); ihdr.writeUInt32BE(h,4);
  ihdr[8]=8; ihdr[9]=6;
  const raw = Buffer.alloc(h*(w*4+1));
  for(let y=0;y<h;y++){ raw[y*(w*4+1)]=0; rgba.copy(raw, y*(w*4+1)+1, y*w*4, (y+1)*w*4); }
  fs.writeFileSync(p, Buffer.concat([
    Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]),
    chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw,{level:9})), chunk("IEND", Buffer.alloc(0))
  ]));
}

function bgMask(img){
  const {w,h,data} = img;
  const mask = new Uint8Array(w*h);
  const isBg = p=>{
    const o=p*4, r=data[o], g=data[o+1], b=data[o+2];
    if(data[o+3] < 40) return true;
    return Math.abs(r-g)<15 && Math.abs(g-b)<15 && Math.abs(r-b)<15 && r>180;
  };
  const q = [];
  for(let x=0;x<w;x++){ q.push(x, (h-1)*w+x); }
  for(let y=0;y<h;y++){ q.push(y*w, y*w+w-1); }
  const stack = [];
  for(const p of q) if(!mask[p] && isBg(p)){ mask[p]=1; stack.push(p); }
  while(stack.length){
    const p = stack.pop(), x=p%w, y=(p/w)|0;
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const nx=x+dx, ny=y+dy;
      if(nx<0||ny<0||nx>=w||ny>=h) continue;
      const np=ny*w+nx;
      if(!mask[np] && isBg(np)){ mask[np]=1; stack.push(np); }
    }
  }
  return mask;
}
function bbox(img, mask){
  let x0=img.w, y0=img.h, x1=-1, y1=-1;
  for(let y=0;y<img.h;y++) for(let x=0;x<img.w;x++){
    if(!mask[y*img.w+x]){ if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y; }
  }
  return { x0, y0, w: x1-x0+1, h: y1-y0+1 };
}
function shrink(img, mask, bb, W, H){
  const out = Buffer.alloc(W*H*4);
  const hist = new Map(); const px = [];
  for(let y=0;y<H;y++) for(let x=0;x<W;x++){
    const sx = Math.min(img.w-1, Math.floor(bb.x0 + (x+0.5)*bb.w/W));
    const sy = Math.min(img.h-1, Math.floor(bb.y0 + (y+0.5)*bb.h/H));
    const p = sy*img.w+sx;
    if(mask[p]){ px.push(null); continue; }
    const o=p*4, c=[img.data[o],img.data[o+1],img.data[o+2]];
    px.push(c);
    const k=(c[0]>>3)+","+(c[1]>>3)+","+(c[2]>>3);
    hist.set(k,(hist.get(k)||0)+1);
  }
  const pal = [...hist.entries()].filter(e=>e[1]>=3).map(e=>e[0].split(",").map(v=>(+v<<3)+4));
  for(let i=0;i<px.length;i++){
    const c = px[i]; if(!c) continue;
    let best=c, bd=2200;
    for(const p of pal){ const d=(c[0]-p[0])**2+(c[1]-p[1])**2+(c[2]-p[2])**2; if(d<bd){bd=d;best=p;} }
    out[i*4]=best[0]; out[i*4+1]=best[1]; out[i*4+2]=best[2]; out[i*4+3]=255;
  }
  return out;
}

function convW(src,dst,W){ const img=readPNG(src),m=bgMask(img),bb=bbox(img,m); const H=Math.round(W*bb.h/bb.w); writePNG(dst,W,H,shrink(img,m,bb,W,H)); return `${W}x${H}`; }
function convH(src,dst,H){ const img=readPNG(src),m=bgMask(img),bb=bbox(img,m); const W=Math.max(6,Math.round(H*bb.w/bb.h)); writePNG(dst,W,H,shrink(img,m,bb,W,H)); return `${W}x${H}`; }
function convBox(src,dst,box){ const img=readPNG(src),m=bgMask(img),bb=bbox(img,m); let W,H; if(bb.w>=bb.h){W=box;H=Math.max(4,Math.round(box*bb.h/bb.w));}else{H=box;W=Math.max(4,Math.round(box*bb.w/bb.h));} writePNG(dst,W,H,shrink(img,m,bb,W,H)); return `${W}x${H}`; }
/* キャラシート（3×3・セル48） */
function convSheet(src,dst){
  const CELL=48, SHEET=144;
  const img=readPNG(src), mask=bgMask(img), cs=img.w/3, out=Buffer.alloc(SHEET*SHEET*4);
  const hist=new Map(), samp=[];
  for(let cr=0;cr<3;cr++)for(let cc=0;cc<3;cc++){const cp=[];
    for(let y=0;y<CELL;y++){const row=[];
      for(let x=0;x<CELL;x++){const sx=Math.min(img.w-1,Math.floor(cc*cs+(x+.5)*cs/CELL)),sy=Math.min(img.h-1,Math.floor(cr*cs+(y+.5)*cs/CELL)),p=sy*img.w+sx;
        if(mask[p]){row.push(null);continue;}
        const o=p*4,c=[img.data[o],img.data[o+1],img.data[o+2]];row.push(c);
        const k=(c[0]>>3)+","+(c[1]>>3)+","+(c[2]>>3);hist.set(k,(hist.get(k)||0)+1);}
      cp.push(row);}
    samp.push(cp);}
  const pal=[...hist.entries()].filter(e=>e[1]>=6).map(e=>e[0].split(",").map(v=>(+v<<3)+4));
  const snap=c=>{let b=null,bd=1e9;for(const p of pal){const d=(c[0]-p[0])**2+(c[1]-p[1])**2+(c[2]-p[2])**2;if(d<bd){bd=d;b=p;}}return bd<2200?b:c;};
  for(let ci=0;ci<9;ci++){const cr=(ci/3)|0,cc=ci%3;
    for(let y=0;y<CELL;y++)for(let x=0;x<CELL;x++){const c=samp[ci][y][x];if(!c)continue;const s=snap(c);
      const o=((cr*CELL+y)*SHEET+cc*CELL+x)*4;out[o]=s[0];out[o+1]=s[1];out[o+2]=s[2];out[o+3]=255;}}
  writePNG(dst,SHEET,SHEET,out);
}

module.exports = { readPNG, writePNG, bgMask, bbox, shrink, convW, convH, convBox, convSheet };
