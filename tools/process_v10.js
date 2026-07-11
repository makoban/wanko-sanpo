/* v10 うらまち編 変換 */
const fs = require("fs");
const P = require("./pixel-pipeline");
const ROOT = require("path").resolve(__dirname, "..");
const RAW = ROOT + "/sprites/items_raw";

for(const f of fs.readdirSync(`${RAW}/villagers3`).filter(f=>f.endsWith(".png"))){
  P.convSheet(`${RAW}/villagers3/${f}`, `${ROOT}/sprites/48/${f}`);
  console.log("sheet:", f);
}
const TOWN_JOBS = [
  ["terrain","gake-face","convW",24],["terrain","gake-top","convW",24],["terrain","iwa","convW",20],
  ["terrain","iwa-big","convW",40],["terrain","taki","convW",32],["terrain","kawa-hashi","convW",96],
  ["terrain","hashi-tate","convH",72],["terrain","tsuribashi","convW",96],["terrain","watashibune","convW",40],
  ["terrain","cave-in","convW",48],["terrain","sancho-torii","convW",36],["terrain","yukiyama","convW",160],
  ["uramachi","yokocho-gate","convW",72],["uramachi","izakaya","convW",58],["uramachi","ramen-yatai","convW",48],
  ["uramachi","shichiya","convW",58],["uramachi","uranai","convW",48],["uramachi","denchu","convH",56],
  ["uramachi","jihanki","convH",36],["uramachi","koban","convW",58],["uramachi","gomiyama","convW",36],
  ["uramachi","neon-kanban","convH",48],
  ["kabuki","kabukiza","convW",192],["kabuki","kabuki-maku","convW",96],["kabuki","kabuki-chochin","convBox",24],
  ["onsen2","ryokan","convW",120],["onsen2","onsen-gate","convW",72],["onsen2","ashiyu","convW",48],
  ["onsen2","taruburo","convW",36],["onsen2","sento-noren","convW",36],
  ["wonder","kanransha","convW",140],["wonder","merry","convW",80],["wonder","coffee-cup","convW",64],
  ["wonder","obakeyashiki","convW",96],["wonder","wonder-gate","convW",80],["wonder","fuusen-wagon","convW",36],
  ["wonder","popcorn","convW",32],["wonder","wonder-kanban","convW",24],
  ["uraitem","quest-board","convW",56],["uraitem","kabu-board","convW",56]
];
for(const [cat,n,fn,arg] of TOWN_JOBS) console.log("town:", n.padEnd(14), P[fn](`${RAW}/${cat}/${n}.png`, `${ROOT}/sprites/town/${n}.png`, arg));

fs.mkdirSync(`${ROOT}/sprites/items/ura`, { recursive: true });
const ITEM_JOBS = [
  ["kabuki","kabuki-inu",64],["kabuki","kuroko",48],["kabuki","ougi",32],
  ["onsen2","yumomi",48],
  ["uraitem","keiyakusho",32],["uraitem","tsubo",32],["uraitem","joho-dvd",32],["uraitem","takarakuji",32],
  ["uraitem","loan-techo",32],["uraitem","hanko",32],["uraitem","meishi",32],["uraitem","bell-fukuro",32],
  ["uraitem","yami-aura",48],["uraitem","hiyaase",32],["uraitem","gaan",48],["uraitem","satsutaba",48],
  ["uraitem","keisatsu-light",32]
];
for(const [cat,n,box] of ITEM_JOBS) console.log("item:", n.padEnd(14), P.convBox(`${RAW}/${cat}/${n}.png`, `${ROOT}/sprites/items/ura/${n}.png`, box));
console.log("ALL DONE");
