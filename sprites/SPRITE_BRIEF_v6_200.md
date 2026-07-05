# 発注書 v6 — 追加200種（gpt-image2）—「わんこさんぽ」大拡張

使用モデル：**gpt-image2**。共通ルールは従来どおり（ドット絵・AAなし・こげ茶#4a3228アウトライン・
パステル・背景は無地の白・毎回 `sprites/mimii.png` を全体基準参照）。

将来実装を見据えた先行素材：🌊海エリア／🐕犬種えらび／🏡街カスタマイズ／🎆季節イベント／🌦天気。

## フォーマット2種類

**［シート］**＝キャラクター用。v3規格：3×3グリッド（行1正面/行2背面/行3**右向き**）、
足元そろえ、`sprites/48/dog.png` または `sprites/mimii.png` を参照添付。144×144直接でも高解像度でも可。
**［アイコン］**＝v4規格：1画像1個・中央大きく・白背景。いきものは目にキャッチライト。
家具・遊具は少し細かめ（64ドット相当まで）OK。

---

## A. あたらしい住民 30体 ［シート］ → sprites/items_raw/villagers2/

みんな服を着る。チャームポイント1つ必須。性格が顔に出るように。

| ファイル | なまえ | 指定 |
|---|---|---|
| konta.png | コンた（キツネ） | オレンジ×白、ふさふさしっぽ、いたずらな笑み、青パーカー |
| ponkichi.png | ポンきち（タヌキ） | 茶色、まるいおなか、葉っぱを頭に、緑セーター |
| ririsu.png | リリす（リス） | 栗色、体より大きなしっぽ、どんぐり柄セーター |
| paopao.png | パオパオ（パンダ） | 白黒、笹の葉をくわえる、たれ目、赤ちゃんちゃんこ |
| koaran.png | コアラン（コアラ） | グレー、大きな鼻、ねむそうな半目、水色セーター |
| hamujiro.png | ハムじろう（ハムスター） | 金色、ぱんぱんのほお袋、ちび体型、黄セーター |
| harry.png | ハリー（ハリネズミ） | 針の間に小花、はにかみ顔、茶セーター |
| ho-chan.png | ホーちゃん（フクロウ） | 茶白、まんまるメガネ、本を持つ、紺ベスト |
| ga-ko.png | ガーコ（アヒル） | 黄色、赤リボン、おしゃべりな口、白セーラー服 |
| meemee.png | メェメェ（ヤギ） | 白、あごひげ、紙をくわえてる、緑ベスト |
| mo-san.png | モーさん（ウシ） | 白黒ぶち、大きな鼻輪なし優しい目、赤ネッカチーフ |
| poniko.png | ポニ子（ポニー） | クリーム色、ピンクのたてがみ、星の首飾り |
| chuta.png | チュー太（ネズミ） | グレー、大きな耳、チーズ柄セーター |
| mogurin.png | モグりん（モグラ） | こげ茶、丸サングラス、スコップ持ち、作業着 |
| kawacchi.png | カワっち（カワウソ） | 茶、おなかに貝、つぶら目、水色マフラー |
| flamie.png | フラミー（フラミンゴ） | ピンク、片足立ち、まつげ長い、白チュチュ |
| kumagoro.png | クマ五郎（シロクマ） | 白、ソフトクリーム持ち、のんびり顔、青ボーダー |
| pakarun.png | パカルン（アルパカ） | クリームもこもこ、首長め、ぽかん顔、虹マフラー |
| rakkosuke.png | ラッコすけ（ラッコ） | 焦げ茶、貝を抱く、あおむけ癖、貝殻ネックレス |
| kamekichi.png | カメ吉（カメ） | 緑、六角柄甲羅、じいじ眉毛、茶ベスト |
| inkochan.png | インコちゃん（セキセイインコ） | 黄緑×黄、ほっぺオレンジ、音符、ピンクリボン |
| ookamin.png | オオカミん（オオカミ） | グレー、キリッと眉＋やさしい目、赤マント |
| kuroe.png | クロエ（くろねこ） | 黒、金の目、三日月の首飾り、紫セーター |
| toranosuke.png | トラのすけ（トラ） | 黄×黒しま、元気な笑顔、白ランニング |
| zo-san.png | ゾウさん（コゾウ） | グレー、鼻で水しぶき、ピンクほっぺ、黄シャツ |
| kabao.png | カバお（カバ） | うす紫、大きな口、湯おけ持ち（温泉好き）、タオル |
| waniwani.png | ワニワニ（ワニ） | 緑、歯ブラシ持ち、ギザ歯にっこり、赤スタイ |
| lionmaru.png | ライオンまる（ライオン） | 金たてがみ、実はこわがり眉、王冠マーク服 |
| sarumon.png | サルもん（おさる） | 茶、バナナ持ち、おちゃめ顔、オーバーオール |
| komorin.png | コウモリん（コウモリ） | 藤色、大きな耳と羽、ねぼけ目、星柄ケープ |

## B. えらべる犬種 12種 ［シート・走りポーズ重視］ → sprites/items_raw/dogs/

主人公の相棒として選べる用＋レース出場用。首輪必須。行3は走り。

| ファイル | 犬種 | 指定 |
|---|---|---|
| poodle.png | トイプードル | アプリコットのもこもこカット、ピンク首輪 |
| chihuahua.png | チワワ | クリーム、大きな目と耳、赤首輪 |
| dachs.png | ミニチュアダックス | 茶、ながい胴、緑首輪 |
| corgi.png | コーギー | 茶白、大きな耳、おしりチャーム、青首輪 |
| pome.png | ポメラニアン | オレンジのふわふわ玉、黄首輪 |
| pug.png | パグ | フォーン、しわ顔、くるくるしっぽ、赤首輪 |
| husky.png | ハスキー | グレー白、青い目、青首輪 |
| golden.png | ゴールデンレトリバー | 金色、たれ耳、優しい目、緑首輪 |
| dalmatian.png | ダルメシアン | 白×黒ぶち、赤首輪 |
| schnauzer.png | シュナウザー | グレー、りっぱな眉とひげ、紺首輪 |
| frenchbull.png | フレンチブルドッグ | クリーム、こうもり耳、ピンク首輪 |
| shirosiba.png | しろしば | 白い柴犬、赤首輪（シロとは別個体・首輪違い） |

## C. うみのさかな 30種 ［アイコン］ → sprites/items_raw/fish2/

将来の海エリア用。横向き・目にキャッチライト。

maguro マグロ / katsuo カツオ / tai タイ（赤） / sake サケ / sanma サンマ / iwashi イワシ /
aji アジ / saba サバ / buri ブリ / hirame ヒラメ / karei カレイ / tako タコ（赤・にっこり） /
ika イカ（白） / kurage クラゲ（透け水色） / fugu フグ（ぷくー） / harisenbon ハリセンボン /
chochin チョウチンアンコウ（提灯が光る） / ryugu リュウグウノツカイ（長い赤ひれ） /
jinbee ジンベエザメ（水玉） / shumoku シュモクザメ / ei エイ（にっこり裏顔） / kani カニ（赤） /
iseebi イセエビ / uni ウニ / hitode ヒトデ（ピンク） / kumanomi クマノミ（オレンジ白しま） /
tatsu タツノオトシゴ（黄） / hotate ホタテ / sazae サザエ / kinmedai キンメダイ（金目）

## D. むしの追加 20種 ［アイコン］ → sprites/items_raw/bug2/

kamakiri カマキリ / koorogi コオロギ / katatsumuri カタツムリ / dangomushi ダンゴムシ /
amenbo アメンボ / gengoro ゲンゴロウ / tagame タガメ / oniyanma オニヤンマ /
kuroageha クロアゲハ / oomurasaki オオムラサキ / morpho モルフォチョウ（青キラ） /
nokogiri ノコギリクワガタ / miyama ミヤマクワガタ / hercules ヘラクレスオオカブト /
kanabun カナブン / minmin ミンミンゼミ / higurashi ヒグラシ / tsukutsuku ツクツクボウシ /
tentou-ki キイロテントウ / minomushi ミノムシ（ぶらさがり）

## E. くだもの・めぐみ 20種 ［アイコン］ → sprites/items_raw/fruit2/

banana バナナ / pineapple パイナップル / melon メロン / suika スイカ（カット） / kiwi キウイ /
lemon レモン / yohnashi ようなし / ume うめ / anzu あんず / mango マンゴー /
satsumaimo さつまいも / tomorokoshi とうもろこし / tomato トマト / kabocha かぼちゃ /
ninjin にんじん / takenoko たけのこ / matsubokkuri まつぼっくり / himawari-tane ひまわりのたね /
hachimitsu はちみつポット / kin-ringo きんのりんご（キラキラ）

## F. わんこのおしゃれ 25種 ［アイコン］ → sprites/items_raw/fashion2/

beret ベレーぼう（赤） / cap キャップ（青） / silkhat シルクハット / hanakanmuri はなかんむり /
usamimi うさみみカチューシャ / headphone ヘッドホン / parka パーカー（青） /
kigurumi-dino きょうりゅうきぐるみ / raincoat レインコート（黄） / yukata ゆかた（あさがお柄） /
santa サンタふく / tonakai トナカイカチューシャ / kubiwa-hoshi ほしの首輪 /
kubiwa-heart ハートの首輪 / kubiwa-gold きんの首輪 / lead-ao リード（青） /
lead-hana リード（花柄） / lead-gold リード（金） / megane まるメガネ / ribbon-tie ちょうネクタイ /
ryuck ちいさなリュック / muffler あかいマフラー / ukiwa うきわ（アヒル柄） /
tanken たんけんぼう / tenshi てんしのはねコスプレ

## G. おやつ・ごはん追加 15種 ［アイコン］ → sprites/items_raw/food2/

pudding プリン / donut ドーナツ / softcream ソフトクリーム / taiyaki たいやき /
dango みたらしだんご / onigiri おにぎり / sandwich サンドイッチ / cookie-set クッキーづめあわせ /
hotcake ホットケーキ / pizza ピザ / ichigo-cake いちごショート / milk-pudding ミルクプリン /
mamepan まめぱん / rebaja レバージャーキー / furikake ふりかけごはん

## H. かぐ・にわ（街カスタマイズ）25種 ［アイコン・64ドット相当まで可］ → sprites/items_raw/furniture/

planter プランター / hanadan レンガの花だん / arch ガーデンアーチ（バラ） / buranko ブランコ /
suberidai すべりだい / seesaw-kids こども用シーソー / sunaba すなば / post あかいポスト /
kanban たて看板 / ido いど / fusha 風車ごや / torigoya とりごや / inugoya-aka 犬小屋（あか） /
inugoya-ao 犬小屋（あお） / flag ガーデンフラッグ / parasol パラソルとテーブル / takibi たき火 /
tent テント / kakashi かかし / yukidaruma ゆきだるま / koinobori こいのぼり /
tourou いしどうろう / shishiodoshi ししおどし / minifountain ミニふんすい / bench-shiro 白いベンチ

## I. きせつイベント 15種 ［アイコン］ → sprites/items_raw/seasonal/

hanabi うちあげ花火 / senko 線香花火 / uchiwa うちわ / furin ふうりん / momiji もみじ /
icho イチョウ / pumpkin かぼちゃランタン / obake かわいいおばけ / tree クリスマスツリー /
present プレゼントばこ / snowflake ゆきのけっしょう / kagamimochi かがみもち /
kadomatsu かどまつ / heart-balloon ハートのふうせん / sasa たなばたのささ

## J. てんき・そら 8種 ［アイコン］ → sprites/items_raw/weather/

ame あめつぶ / yuki ゆき / niji にじ / kaminari かみなりぐも / taiyo たいよう /
tsuki みかづき / hoshizora ほし3つ / kiri くも

---

## 手順
1. 順番：A → B → C → D → E → F → G → H → I → J（各カテゴリ1個目を基準に統一）
2. シート（A/B）はチェック：3×3・行3右向き・足元そろえ・かわいさ基準（目は下半分＋キャッチライト＋チーク）
3. アイコンはチェック：1画像1個・白背景・中央・ドット絵
4. カテゴリごとに完了報告（ファイル一覧）

合計 **200種**（A30＋B12＋C30＋D20＋E20＋F25＋G15＋H25＋I15＋J8）
