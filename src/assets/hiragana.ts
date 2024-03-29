
const specialKey = ["←", "＂", "゜", "小", "ー"];

const hiragana:string[] = [
  "あ","か","さ","た","な","は","ま","や","ら","わ",
  "い","き","し","ち","に","ひ","み","" ,"り","" ,
  "う","く","す","つ","ぬ","ふ","む","ゆ","る","を",
  "え","け","せ","て","ね","へ","め","" ,"れ","" ,
  "お","こ","そ","と","の","ほ","も","よ","ろ","ん",
];
const katakana:string[] = [
  "ア","カ","サ","タ","ナ","ハ","マ","ヤ","ラ","ワ",
  "イ","キ","シ","チ","二","ヒ","三",""  ,"リ","" ,
  "ウ","ク","ス","ツ","ヌ","フ","ム","ユ","ル","ヲ",
  "エ","ケ","セ","テ","ネ","ヘ","メ",""  ,"レ","" ,
  "オ","コ","ソ","ト","ノ","ホ","モ","ヨ","ロ","ン",
];
const hatsuon:string[] = [
  "아","카","사","타","나","하","마","야","라","와",
  "이","키","시","치","니","히","미",""  ,"리","" ,
  "우","쿠","스","츠","누","후","무","유","루","오",
  "에","케","세","테","네","헤","메",""  ,"레","" ,
  "오","코","소","토","노","호","모","요","로","응",
]


const dakuon:any = {
  "か":"が", "き":"ぎ", "く":"ぐ", "け":"げ", "こ":"ご",
  "さ":"ざ", "し":"じ", "す":"ず", "せ":"ぜ", "そ":"ぞ",
  "た":"だ", "ち":"ぢ", "つ":"づ", "て":"で", "と":"ど",
  "は":"ば", "ひ":"び", "ふ":"ぶ", "へ":"べ", "ほ":"ぼ",
  "が":"か", "ぎ":"き", "ぐ":"く", "げ":"け", "ご":"こ",
  "ざ":"さ", "じ":"し", "ず":"す", "ぜ":"せ", "ぞ":"そ",
  "だ":"た", "ぢ":"ち", "づ":"つ", "で":"て", "ど":"と",
  "ば":"は", "び":"ひ", "ぶ":"ふ", "べ":"へ", "ぼ":"ほ",
}
const handakuon:any = {
  "は":"ぱ", "ひ":"ぴ", "ふ":"ぷ", "へ":"ぺ", "ほ":"ぽ",
  "ぱ":"は", "ぴ":"ひ", "ぷ":"ふ", "ぺ":"へ", "ぽ":"ほ",
}
const smallHiragana:any = {
  "あ":"ぁ", "い":"ぃ", "う":"ぅ", "え":"ぇ", "お":"ぉ",
  "つ":"っ",
  "や":"ゃ", "ゆ":"ゅ", "よ":"ょ",
  "わ":"ゎ",
  "ぁ":"あ", "ぃ":"い", "ぅ":"う", "ぇ":"え", "ぉ":"お",
  "っ":"つ",
  "ゃ":"や", "ゅ":"ゆ", "ょ":"よ",
  "ゎ":"わ",
}

export {specialKey,hiragana,smallHiragana,dakuon,handakuon};