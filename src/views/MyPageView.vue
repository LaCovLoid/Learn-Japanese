<template>
  <div :class="$style.index">
    <main :class="$style.myPageMain" v-if="userId">
      <div :class="$style.top">
        <span :class="$style.name"> {{userId}}님의 단어 리스트</span>
        <span :class="getStyle(0)" @click="menuClicked(0)">모든 단어</span>
        <span :class="getStyle(1)" @click="menuClicked(1)">즐겨찾기</span>
      </div>
      <div :class="$style.wordContainer" v-if="menuSelected == 0">
        <!-- 이거 컴포넌트로 넣는게 좋을거같음
          즐찾 누르면 컴포넌트에서 값 받는걸로 바로 어케든 해보셈
          글구 중요한거. 클릭 누르면 routerView로 연결해서 단어 상세보기
          상세보기는 chatGPT(3.5 무료) 써서 '~~ 상세 뜻' 출력 

          1.챌린지 제대로 만들고 랭킹시스템 & DB 작성
          2.마이페이지 정리&컴포넌트 작성
          3.석탄이한테 카톡로그인 도움
        -->
        <div v-for="(item,index) in resolve" :key="index">
          {{ item.word }}
        </div>
      </div>
      <div :class="$style.wordContainer" v-if="menuSelected == 1">
        <div v-for="(item,index) in favorite" :key="index">
          {{ item.word }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { getAPI } from '@/api/api';
import { piniaStore } from '@/store/index';

const store = piniaStore();

let resolve:any = [];
let favorite:any = [];
let userId = ref("");
let menuSelected = ref(0);

if (store.accessToken=="" || store.accessToken==null) {
  alert("로그인한 유저만 들어올 수 있는 페이지입니다.")
  router.push("/");
}

getAPI("/user_info")
  .then(userInfoFetchHandler)
  .catch(userInfoFailedHandler);

function userInfoFetchHandler(response:any) {
  resolve = response.data.resolve;
  userId.value = response.data.user_id;

  let favoriteNumbers = response.data.favorite;
  for (var i = 0; i < favoriteNumbers.length; i++) {
    for (var j = 0; j < resolve.length; j++) {
      if (resolve[j].id == favoriteNumbers[i]){
        favorite.push(resolve[j]);
        return;
      }
    }
  }
}
function userInfoFailedHandler() {

}

function getStyle(value: number) {
  let text = "menu menu"+String(value);
  if (value == menuSelected.value) text = text + " selected";
  return text;
}

function menuClicked(value: number) {
  menuSelected.value = value;
}

</script>

<style>
.menu{
  padding: 4px 10px;

  font-size: 20px;
  border: 1px solid #000000;
  border-radius: 10px;
  background-color: rgb(255, 214, 214);
  display: inline-block;
  position: absolute;
  cursor: pointer;
}
.menu0{
  right: 150px;
}
.menu1{
  right: 30px;
}
.selected{
  background-color: rgb(255, 125, 125);
}
</style>

<style lang="scss" module>
.index{
  background-color: #fadaff;
  padding-bottom: 30px;
  .myPageMain{
    margin: 0 auto;
    padding: 40px 200px;
    max-width: 1280px;
    background-color: #ffffff;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    position: relative;
    
    .top{
      border-bottom: 1px solid #000000;
      position: relative;

      .name{
        font-size: 36px;
      }
    }
  }
}
</style>