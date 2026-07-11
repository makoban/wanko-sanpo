/* v11 おみおくり編 変換 */
const fs = require("fs");
const P = require("./pixel-pipeline");
const ROOT = require("path").resolve(__dirname, "..");
const RAW = ROOT + "/sprites/items_raw/omiokuri";
const OUT = ROOT + "/sprites/items/omiokuri";
fs.mkdirSync(OUT, { recursive: true });

const TOWN_JOBS = [
  ["ceremony-hall","convW",96], ["okuri-tower","convW",72], ["memorial-gate","convW",72],
  ["ohaka","convW",26], ["ohaka-hana","convW",20], ["saidan","convW",80]
];
for(const [n,fn,arg] of TOWN_JOBS) console.log("town:", n.padEnd(14), P[fn](`${RAW}/${n}.png`, `${ROOT}/sprites/town/${n}.png`, arg));

const ITEM_JOBS = [
  ["iei-frame",40],["kiku",28],["candle",16],["juushoku-inu",56],["mofuku-ribbon",16],
  ["mizu-bowl",24],["ohaka-hikari",28],["tenshi-wanko",52],["hoshi-kira",24]
];
for(const [n,box] of ITEM_JOBS) console.log("item:", n.padEnd(14), P.convBox(`${RAW}/${n}.png`, `${OUT}/${n}.png`, box));
console.log("wide:", "niji-hashi".padEnd(14), P.convW(`${RAW}/niji-hashi.png`, `${OUT}/niji-hashi.png`, 300));
console.log("ALL DONE");
