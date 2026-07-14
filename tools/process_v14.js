/* v14 まちの善と悪 変換 */
const fs = require("fs");
const P = require("./pixel-pipeline");
const ROOT = require("path").resolve(__dirname, "..");
const RAW = ROOT + "/sprites/items_raw";
for(const c of ["law","danger","med","school","infra","life","uiicon"])
  fs.mkdirSync(`${ROOT}/sprites/items/${c}`, { recursive: true });

/* キャラシート20体 → sprites/48/ */
const SHEETS = [
  ["zenmin","omawari-ken"],["zenmin","keiji-torres"],["zenmin","doctor-shiro"],["zenmin","nurse-momo"],
  ["zenmin","fireman-go"],["zenmin","teacher-mari"],["zenmin","mailman-poppo"],["zenmin","chef-tonkatsu"],
  ["zenmin","farmer-ushio"],["zenmin","volunteer-hana"],
  ["akumin","bainin-doku"],["akumin","yamikin-gani"],["akumin","sagi-kon"],["akumin","kaidashi-nezu"],
  ["akumin","tobashi-mole"],["akumin","akunin-wani"],["akumin","itako-hebi"],["akumin","dfake-tanu"],
  ["akumin","oshi-sales-pig"],["akumin","netmulti-cat"]
];
for(const [cat,f] of SHEETS){ P.convSheet(`${RAW}/${cat}/${f}.png`, `${ROOT}/sprites/48/${f}.png`); console.log("sheet:", f); }

/* 建物・大型 → sprites/town/ */
const TOWN_JOBS = [
  ["law","police-hq","convW",120], ["law","koban-big","convW",88], ["law","courthouse","convW",110],
  ["law","jail","convW",90], ["law","patrol-car","convW",56], ["law","police-bike","convW",34],
  ["law","barricade","convW",40],
  ["civic","hospital","convW",130], ["civic","school","convW",120], ["civic","cityhall","convW",110],
  ["civic","fire-station","convW",100], ["civic","post-office","convW",90], ["civic","bank","convW",96],
  ["civic","library","convW",96], ["civic","clinic","convW",80], ["civic","jinja","convW",90],
  ["civic","kouminkan","convW",90], ["civic","bus-stop","convW",40], ["civic","fountain-plaza","convW",80],
  ["civic","clock-tower","convH",84], ["civic","recycle-center","convW",70],
  ["med","ambulance","convW",64], ["med","bed-med","convW",40],
  ["school","blackboard","convW",48], ["school","tetsubo","convW",44], ["school","tsuchi-yama","convW",52],
  ["infra","bus-wan","convW",72], ["infra","taxi-wan","convW",56], ["infra","signal","convH",52],
  ["infra","streetlight2","convH",52], ["infra","vending-good","convW",30], ["infra","dobu-fence","convW",44]
];
for(const [cat,n,fn,arg] of TOWN_JOBS) console.log("town:", n.padEnd(14), P[fn](`${RAW}/${cat}/${n}.png`, `${ROOT}/sprites/town/${n}.png`, arg));

/* 小物 → sprites/items/<cat>/ */
const ITEM_JOBS = [
  ["law","tehai-bill",28],["law","handcuff",24],["law","police-hat",24],["law","baton-light",24],
  ["law","tenbin",26],["law","whistle",24],["law","akairo-light",24],
  ["danger","zombie-tabako",26],["danger","ayashii-kusuri",26],["danger","ekitai-doku",26],
  ["danger","dame-stamp",26],["danger","dokuro-pop",26],["danger","tsuho-phone",26],
  ["danger","genki-mamori",26],["danger","warui-aura",30],["danger","bikkuri-ase",24],
  ["danger","taiho-flash",30],["danger","refuse-hand",26],["danger","hero-kirakira",30],
  ["med","tanka",32],["med","kurumaisu",28],["med","bandage",24],["med","chusha",24],
  ["med","kusuri-good",24],["med","taion",24],
  ["school","flag-undokai",30],["school","kyushoku",24],["school","randoseru",24],
  ["infra","manhole",24],["infra","yokodan",40],["infra","kouji-cone",24],["infra","jitensha",30],
  ["life","tegami",24],["life","kozutsumi",24],["life","shinbun",24],["life","meishi-good",24],
  ["life","toolbox",24],["life","houki-chiritori",26],["life","shohin-hako",24],["life","tsuchann-badge",24],
  ["uiicon","icon-hero",24],["uiicon","icon-tsuho",24],["uiicon","icon-zen",24],["uiicon","icon-aku",24],
  ["uiicon","icon-shinrai",24],["uiicon","icon-warning",24],["uiicon","icon-map-pin2",24],["uiicon","icon-heart-town",24]
];
for(const [cat,n,box] of ITEM_JOBS) console.log("item:", n.padEnd(16), P.convBox(`${RAW}/${cat}/${n}.png`, `${ROOT}/sprites/items/${cat}/${n}.png`, box));
console.log("ALL DONE");
