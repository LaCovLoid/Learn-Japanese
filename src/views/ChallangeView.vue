<template>
  <div :class="$style.index">
    <main :class="$style.homeMain" v-if="visibleBoolean">
      <div :class="$style.description">
        {{ word }} {{ mean }}
        <div :class="$style.retryButton" @click="retry">
          다른 문제
        </div>
        <div :class="[$style.retryButton, $style.answerButton]" @click="viewAnswer">
          정답보기
        </div>
      </div>
      <div v-if="word">
        <QuestionComponent :yomiganaLength=yomiganaLength :wordId=wordId @sendingData="answerCheck" />
      </div>
    </main>
    <main :class="$style.homeMain" v-else>
      <div :class="$style.retryButton" @click="retry">
        다시 하기
      </div>
      <div :class="$style.congrate" v-if="isAnswer">
        문제를 푸셨습니다!<br /><br />
        축하합니다!
      </div>
      <div :class="$style.congrate" v-else >
        {{ word }}
        <br />
        {{ yomigana }}
        <br />
        {{ mean }}
        <br />
        <br />
        문제를 풀지 못하였습니다.
      </div>
    </main>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { getAPI } from '../api/api';
import QuestionComponent from '../components/QuestionComponent.vue';

let wordId = ref(-1);
let word = ref("");
let mean = ref("");
let yomigana = ref("");
let yomiganaLength = ref("");
let visibleBoolean = ref(true);
let isAnswer = ref(false);

getQuestion();

function getQuestion(){
  getAPI("/random")
    .then(randomFetchHandler)
    .catch(randomFailedHandler);
}
function randomFetchHandler(response:any){
  wordId.value = response.data.word_id;
  word.value = response.data.word;
  mean.value = response.data.mean;
  yomiganaLength.value = response.data.yomigana_length;
}
function randomFailedHandler(){
  alert('정보를 받아올 수 없습니다.');
}

function answerCheck(data:any) {
  isAnswer.value = data;
  if (isAnswer.value) {
    visibleBoolean.value = false;
  }
}

function retry(){
  visibleBoolean.value = true;
  isAnswer.value = false;
  word.value = "";
  getQuestion();
}
function viewAnswer() {
  getAPI("/answer",{wordId:wordId.value})
  .then(answerFetchHandler)
  .catch(answerFailedHandler);
}
function answerFetchHandler(response:any) {
  yomigana.value = response.data.yomigana;
  visibleBoolean.value = false;
  isAnswer.value = false;
}
function answerFailedHandler() {
  alert("정답을 불러오는데 실패하였습니다.");
}
</script>


<style lang="scss" module>
.index{
  background-color: #fadaff;
  padding-bottom: 30px;
  .homeMain{
    margin: 0 auto;
    padding: 10px 10px;
    max-width: 1280px;
    background-color: #ffffff;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    position: relative;

    .description{
      margin: 30px 0;
      font-size: 28px;
      text-align: center;

    }

    .congrate{
      width: 100%;
      text-align: center;
      margin: 100px 0;

      display: block;
      font-size: 40px;
      font-weight: bold;
      position: relative;
    }
  }
  .retryButton{
    width: 130px;
    margin: auto;
    padding: 5px 8px;

    border: 1px solid #000000;
    border-radius: 10px;
    text-align: center;
    font-size: 20px;
    display: inline-block;
    cursor: pointer;
    position:absolute;
    top: 50px;
    right: 50px;
  }
  .answerButton{
    top: 100px;
  }
}
</style>