/* v13 ほねずみ横丁・しおかぜ湊 変換 */
const fs = require("fs");
const P = require("./pixel-pipeline");
const ROOT = require("path").resolve(__dirname, "..");
const RAW = ROOT + "/sprites/items_raw";
fs.mkdirSync(`${ROOT}/sprites/items/slum`, { recursive: true });

for(const f of ["nora-shiro","nora-buchi","nora-kuro","gensan"])
  { P.convSheet(`${RAW}/slum/${f}.png`, `${ROOT}/sprites/48/${f}.png`); console.log("sheet:", f); }
P.convSheet(`${RAW}/minato/sencho.png`, `${ROOT}/sprites/48/sencho.png`); console.log("sheet: sencho");

const TOWN_JOBS = [
  ["slum","barrack-a","convW",58], ["slum","barrack-b","convW",58], ["slum","danboru-house","convW",30],
  ["slum","drum-fire","convW",24], ["slum","monohoshi","convW",48], ["slum","ware-lamp","convH",52],
  ["slum","takidashi","convW",48], ["slum","boro-hashi","convW",48], ["slum","guard-arch","convW",72],
  ["slum","slum-flower","convW",14], ["slum","nagaya","convW",120], ["slum","fukkou-hata","convW",32],
  ["minato","todai","convW",64], ["minato","ooki-sanbashi","convW",120], ["minato","gyosen","convW",72],
  ["minato","ichiba-stand","convW",56], ["minato","himono-noren","convW",48], ["minato","ikari","convW",28],
  ["minato","taru-minato","convW",32], ["minato","ami","convW",32]
];
for(const [cat,n,fn,arg] of TOWN_JOBS) console.log("town:", n.padEnd(14), P[fn](`${RAW}/${cat}/${n}.png`, `${ROOT}/sprites/town/${n}.png`, arg));

const ITEM_JOBS = [["slum","uwasa",24],["slum","soup",24],["slum","boro-mofu",24],["slum","bouenkyo",28],["minato","kamome",24]];
for(const [cat,n,box] of ITEM_JOBS) console.log("item:", n.padEnd(14), P.convBox(`${RAW}/${cat}/${n}.png`, `${ROOT}/sprites/items/slum/${n}.png`, box));
console.log("ALL DONE");
