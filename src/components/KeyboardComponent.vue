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
import {ref} from 'vue';
import {specialKey,hiragana,dakuon,handakuon,smallHiragana} from '../assets/hiragana';


let text = ref("");
let filled = 0;

let wordLength = defineProps(['wordLength']);
for (let i = 0; i < wordLength.wordLength; i++){
  text.value += "□"
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
  if (filled == 0) {
      return;
  }
  let dicKey:string = text.value[filled-1];
  switch (key) {
    case "←":
      if (filled != 0) {filled--;}
        changeText('□');
        filled--;
      break;
    case "＂":
      if (dicKey in dakuon) {
        filled--;
        changeText(dakuon[dicKey]);
      }
      break;
    case "゜":
      if (dicKey in handakuon) {
        filled--;
        changeText(handakuon[dicKey]);
      }
      break;
    case "小":
    if (dicKey in smallHiragana) {
        filled--;
        changeText(smallHiragana[dicKey]);
      }
      break;
    case "ー":
      keySelected("ー");
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