<template>
  <div :class="$style.index">
    <main :class="$style.homeMain" v-if="visibleBoolean">
      <div :class="$style.description">
        <div :class="$style.heartContainer">
          <img id="heart1" :class="$style.heart" src="@/assets/image/heart.png" alt="">
          <img id="heart2" :class="$style.heart" src="@/assets/image/heart.png" alt="">
          <img id="heart3" :class="$style.heart" src="@/assets/image/heart.png" alt="">
        </div>
        {{ word.word }} {{ word.mean }}
      </div>
      <div v-if="word.word">
        <QuestionComponent :yomiganaLength=word.yomiganaLength :wordId=word.id @sendingData="answerCheck" />
      </div>
    </main>

    <main :class="$style.homeMain" v-else>
      <div :class="$style.retryButton" @click="retry">
        다시 하기
      </div>
      <div :class="$style.congrate">
        당신의 점수 : {{ score }}
      </div>
      <div :class="$style.rankContainer" v-if="rank.length">
        <div>
          <span :class="$style.rankText">등수</span>
          <span :class="$style.rankText">이름</span>
          <span :class="$style.rankText">점수</span>
        </div>
        <div v-for="(item,index) in rank" :key="index">
          <span :class="$style.rankText">{{ Number(index+1) }}</span>
          <span :class="$style.rankText">{{ item.user_id }}</span>
          <span :class="$style.rankText">{{ item.score }}</span>
        </div>
      </div>
    </main>
  </div>
</template>


<script setup lang="ts">
import { ref,reactive } from 'vue';
import { getAPI } from '@/api/api';
import QuestionComponent from '@/components/QuestionComponent.vue';

let word = reactive({
  id: -1,
  word: "",
  mean: "",
  yomigana: "",
  yomiganaLength: ""
});
let visibleBoolean = ref(true);
let isAnswer = ref(false);
let life = 3;
let score = ref(0);
let rank:any = ref([]);

getQuestion();

function getQuestion(){
  word.word = "";
  getAPI("/random")
    .then(randomFetchHandler)
    .catch(randomFailedHandler);
}
function randomFetchHandler(response:any){
  word.id = response.data.word_id;
  word.word = response.data.word;
  word.mean = response.data.mean;
  word.yomiganaLength = response.data.yomigana_length;
}
function randomFailedHandler(){
  alert('정보를 받아올 수 없습니다.');
}

function answerCheck(data:any) {
  isAnswer.value = data;
  if (isAnswer.value) {
    score.value++;
    getQuestion();
  }else {
    changeSrc(life);
    life--;
    if (life == 0){
      visibleBoolean.value = false;
      getAPI("/rank",{score:score.value})
        .then(rankFetchHandler)
        .catch(rankFailedHandler);
    }else {    
      getQuestion();
    }
  }
}

function rankFetchHandler(response:any) {
  rank.value = response.data.rank;
}

function rankFailedHandler() {
  alert("error");
}

function changeSrc(heart_num:number) {
  let img = document.querySelector('#heart'+heart_num);
  (img as any).src = "/src/assets/image/heart_empty.png";
}

function retry(){
  visibleBoolean.value = true;
  isAnswer.value = false;
  word.word = "";
  score.value = 0;
  life = 3;
  getQuestion();
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
      position: relative;

      .heartContainer{
        .heart {
          width: 40px;
          margin: 5px;
        }
      }
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
    z-index: 1;
  }
  .rankContainer{
    text-align: center;
    .rankText{
      width: 100px;
      padding: 3px 0;

      display: inline-block;
      border-bottom: 1px solid #000000;
    }
    
  }
}
</style>