<template>
  <div :class="$style.index">
    <main :class="$style.translateMain">
      <span :class="getStyle(0)" @click="toFromSelect(0)">일본어 → 한국어<br />日本語 → 韓国語</span>
      <span :class="getStyle(1)" @click="toFromSelect(1)">한국어 → 일본어<br />韓国語 → 日本語</span>
      <div :class="$style.container">
        <textarea :class="$style.inputBar" v-model="inputText"></textarea>
        <div :class="$style.middle">→<br />←</div>
        <span :class="$style.resultBar">{{ resultText }}</span>
      </div>
      <span :class="$style.translateButton" @click="translateClicked">번역/翻訳</span>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAPI } from '@/api/api';

let selected = ref(0);
let resultText = ref("");
let inputText = ref("");


function translateClicked() {
  console.log(inputText.value, selected.value);
  getAPI("/translate", {text:inputText.value, type:selected.value})
    .then(translateFetchHandler)
    .catch(translateFailedHandler);
}
function translateFetchHandler(response:any) {
  resultText.value = response.data;
}
function translateFailedHandler() {
  alert("번역 실패");
}

function toFromSelect(value:number) {
  selected.value = value;
}

function getStyle(value:number) {
  if (selected.value == value) return "toFrom selected";
  else return "toFrom";
}

</script>

<style>
.toFrom{
  width: 150px;
  margin-bottom: 5px;
  margin-right: 10px;
  padding: 5px;

  text-align: center;
  border: 1px solid #000000;
  border-radius: 5px;
  display: inline-block;
  cursor: pointer;
}
.toFrom:hover{
  background-color: #ffe9e9;
}
.selected{
  background-color: #ffd1f7;
}
</style>

<style lang="scss" module>
.index{
  background-color: #fadaff;
  padding-bottom: 30px;
  .translateMain{
    margin: 0 auto;
    padding: 20px 30px;
    max-width: 1280px;
    background-color: #ffffff;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;

    .container{
      margin-top: 20px;
      display: flex;
      .inputBar{
        width: 50%;
        height: 300px;
        padding: 20px;

        resize: none;
        font-size: 24px;

      }
      .middle{
        width: 50px;
        margin-top: 120px;
        text-align: center;
      }
      .resultBar{
        width: 50%;
        height: 300px;
        padding: 20px;
        background-color: #d2d2d2;
        border: 1px solid #000000;
        display: inline-block;
      }
    }
    .translateButton{
      width: 130px;
      margin: 20px auto;
      padding: 10px;

      background-color: #fadaff;
      border: 1px solid #000000;
      border-radius: 5px;
      display: block;
      text-align: center;
    }
    .translateButton:hover{
      background-color: #f3a3ff;
    }
  }
}
</style>