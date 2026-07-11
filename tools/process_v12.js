/* v12 わんこ富士・わん株・わん座演目 変換 */
const fs = require("fs");
const P = require("./pixel-pipeline");
const ROOT = require("path").resolve(__dirname, "..");
const RAW = ROOT + "/sprites/items_raw";
const OUT = ROOT + "/sprites/items/fuji";
fs.mkdirSync(OUT, { recursive: true });

const TOWN_JOBS = [
  ["fuji","tozan-guchi","convW",40], ["fuji","yama-goya","convW",72], ["fuji","onsen-tamago","convW",40],
  ["fuji","ropeway","convW",56], ["fuji","kumo-umi","convW",200], ["fuji","sancho-hokora","convW",44],
  ["fuji","yuki-patch","convW",22],
  ["kabu","kabu-kaikan","convW",96], ["kabu","fudosan","convW",72],
  ["kabu","myhome-s","convW",72], ["kabu","myhome-m","convW",88], ["kabu","myhome-l","convW",104],
  ["kabuki2","kabuki-bg","convW",160]
];
for(const [cat,n,fn,arg] of TOWN_JOBS) console.log("town:", n.padEnd(14), P[fn](`${RAW}/${cat}/${n}.png`, `${ROOT}/sprites/town/${n}.png`, arg));

const ITEM_JOBS = [
  ["fuji","inugami-sama",80], ["fuji","yama-flag",28], ["fuji","raicho",28],
  ["kabu","graph-up",32], ["kabu","graph-down",32], ["kabu","loan-keiyaku",32],
  ["kabuki2","tsuzumi",32], ["kabuki2","kido-fuda",32]
];
for(const [cat,n,box] of ITEM_JOBS) console.log("item:", n.padEnd(14), P.convBox(`${RAW}/${cat}/${n}.png`, `${OUT}/${n}.png`, box));
for(const n of ["engi-momotaro","engi-tsuru","engi-kaguya"])
  console.log("engi:", n.padEnd(14), P.convW(`${RAW}/kabuki2/${n}.png`, `${OUT}/${n}.png`, 220));
console.log("ALL DONE");
