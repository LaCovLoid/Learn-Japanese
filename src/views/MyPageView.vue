<template>
  <div :class="$style.index">
    <main :class="$style.myPageMain" v-if="userId">
      <div :class="$style.top">
        <span :class="$style.name"> {{userId}}님의 단어 리스트</span>
        <span :class="getStyle(0)" @click="menuClicked(0)">모든 단어</span>
        <span :class="getStyle(1)" @click="menuClicked(1)">즐겨찾기</span>
      </div>
      <div :class="$style.wordContainer" v-if="menuSelected == 0">
        <!-- 클릭 누르면 routerView로 연결해서 단어 상세보기
          상세보기는 chatGPT(3.5 무료) 써서 '~~ 상세 뜻' 출력 
        -->
        <wordComponent v-for="(item,index) in resolve" :key="index" :propData="item" @sendingData="changeFavorite"/>
      </div>
      <div :class="$style.wordContainer" v-if="menuSelected == 1">
        <wordComponent v-for="(item,index) in favorite" :key="index" :propData="item" @sendingData="changeFavorite"/>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { getAPI } from '@/api/api';
import { piniaStore } from '@/store/index';
import wordComponent from '@/components/wordComponent.vue';

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
        resolve[j]['favorite'] = 1;
        favorite[i]['favorite'] = 1;
      }
    }
  }
}
function userInfoFailedHandler() {
  alert("잘못된 유저정보입니다.");
  router.push('/');
}

function changeFavorite(data:any) {
  getAPI('/modify_favorite', {wordId: data.id})
    .then(modifyFetchHandler)
    .catch(modifyFailedHandler);
  
  let idExist = false;
  for (let i = 0; i < favorite.length; i++) {
    if (favorite[i].id == data.id) {
      favorite.splice(i, 1);
      idExist = true;
      return;
    }
  }
  if (!idExist) {
    for (let i = 0; i < resolve.length; i++) {
      if (resolve[i].id == data.id) {
        favorite.push(resolve[i]);
        return;
      }
    }
  }

  //양쪽에서 클릭하고 새로고침하면 나오는 버그  (두번누르니 작동안하는버그같음) 혹은 두번이상누르면 첫번째것만인정되는걸지도
  //코드 다듬기
  //기초부터 페이지 제작 && 즐겨찾기와 모든단어 단어수 20개씩 페이지 나누기
  //UI개선 && 단어 눌렀을때 chatGPT로 상세 뜻 적어주는 페이지 띄우기
  //포폴만들준비
}

function modifyFetchHandler(response:any) {
}
function modifyFailedHandler() {
  alert("error");
  router.push('/');
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