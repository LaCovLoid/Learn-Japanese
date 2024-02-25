<template>
    <main :class="$style.index">
        <div :class="$style.inputContainer">{{ text }}</div>
        <div :class="$style.left">
            <div v-for="(item,index) in hiragana" :key="index" :class="getStyleName(item)" @click="keySelected(item)">
                {{ item }}
            </div>
        </div>
        <div :class="$style.right">
            <div v-for="(item,index) in specialKey" :key="index" :class="getStyleName(item)" @click="specialKeySelected(item)">
                {{ item }}
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import {ref,reactive,defineProps,defineEmits} from 'vue';


let text = ref("");
let filled = 0;

let wordLength = defineProps(['wordLength']);
for (let i = 0; i < wordLength.wordLength; i++){
    text.value += "□"
}

const specialKey = ["←", "＂", "゜", "小", "ー"];
const hiragana:any = [
    "あ","か","さ","た","な","は","ま","や","ら","わ",
    "い","き","し","ち","に","ひ","み","" ,"り","" ,
    "う","く","す","つ","ぬ","ふ","む","ゆ","る","を",
    "え","け","せ","て","ね","へ","め","" ,"れ","" ,
    "お","こ","そ","と","の","ほ","も","よ","ろ","ん",
];

const dakuon:any = {
    "か":"が", "き":"ぎ", "く":"ぐ", "け":"げ", "こ":"ご",
    "さ":"ざ", "し":"じ", "す":"ず", "せ":"ぜ", "そ":"ぞ",
    "た":"だ", "ち":"ぢ", "つ":"づ", "て":"で", "と":"ど",
    "は":"ば", "ひ":"び", "ふ":"ぶ", "へ":"べ", "ほ":"ぼ",
}
const dakuonInverse:any = {
    "が":"か", "ぎ":"き", "ぐ":"く", "げ":"け", "ご":"こ",
    "ざ":"さ", "じ":"し", "ず":"す", "ぜ":"せ", "ぞ":"そ",
    "だ":"た", "ぢ":"ち", "づ":"つ", "で":"て", "ど":"と",
    "ば":"は", "び":"ひ", "ぶ":"ふ", "べ":"へ", "ぼ":"ほ",
}
const handakuon:any = {
    "は":"ぱ", "ひ":"ぴ", "ふ":"ぷ", "へ":"ぺ", "ほ":"ぽ",
}
const handakuonInverse:any = {
    "ぱ":"は", "ぴ":"ひ", "ぷ":"ふ", "ぺ":"へ", "ぽ":"ほ",
}
const smallHiragana:any = {
    "あ":"ぁ", "い":"ぃ", "う":"ぅ", "え":"ぇ", "お":"ぉ",
    "つ":"っ",
    "や":"ゃ", "ゆ":"ゅ", "よ":"ょ",
    "わ":"ゎ",
}
const smallHiraganaInverse:any = {
    "ぁ":"あ", "ぃ":"い", "ぅ":"う", "ぇ":"え", "ぉ":"お",
    "っ":"つ",
    "ゃ":"や", "ゅ":"ゆ", "ょ":"よ",
    "ゎ":"わ",
}

function keySelected(key:string) {
    if (key == ""){
        return;
    }
    changeText(key);
}

function changeText(value:string){
    if (text.value.length > filled) {
        let temp = text.value.split('');
        temp[filled] = value;
        text.value = "";
        filled++;
        for (let i = 0; i < temp.length; i++){
            text.value += temp[i];
        }
    } else {
        alert("꽉 참");
    }
}

function specialKeySelected(key:string) {
    switch (key) {
        case "←":
            if (filled != 0) {filled --;}
                changeText('□');
                filled--;
            break;

        case "＂":
            // eslint-disable-next-line no-case-declarations
            let dicKey:string = text.value[filled-1];
            
            if (dicKey in dakuon) {
                filled--;
                changeText(dakuon[dicKey]);
            } else if (dicKey in dakuonInverse) {
                filled--;
                changeText(dakuonInverse[dicKey]);
            }
            
            break;

        case "゜":
            break;
        case "小":
            break;
        case "ー":
            break;
    }
}

function getStyleName(value:string):string {
    if(value == ""){
        return "keyboardItem noText";
    }
    return "keyboardItem";
}
</script>

<style type="text/css">
.keyboardItem {
    width: 50px;
    height: 50px;
    margin-top: 10px;
    margin-right: 20px;

    font-size: 26px;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    border: 1px solid #000000;
    border-radius: 5px;
}

.keyboardItem:hover {
    background-color: pink;
}
.noText {
    opacity: 0;
    border: none;
}

</style>

<style lang="scss" module>
.index {
    width: 800px;
    margin: 0 auto;
    position: relative;
    
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    .inputContainer{
        height: 100px;
        padding-top: 20px;

        font-size: 40px;
        text-align: center;
        background-color: aquamarine;
    }
    .left {
        width: 750px;
        display: inline-block;
    }
    .right {
        width: 50px;
        padding-right: 10px;
        display: inline-block;
        position: absolute;
    }
}
</style>