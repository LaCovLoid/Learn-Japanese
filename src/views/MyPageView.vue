<template>
  <div :class="$style.index">
    <main :class="$style.myPageMain" v-if="userId">
      <div :class="$style.top">
        <span :class="$style.name"> {{userId}}님의 단어 리스트</span>
        <span :class="getMenuButtonStyle(0)" @click="menuClicked(0)">모든 단어</span>
        <span :class="getMenuButtonStyle(1)" @click="menuClicked(1)">즐겨찾기</span>
      </div>
      <div :class="$style.wordContainer" v-if="selectedList">
        <wordComponent v-for="(item) in selectedList" :key="item" :propData="item" @sendingData="changeFavorite" />
      </div>
      <div :class="$style.bottom">
        <span v-for="index in maxPage" :key="index" @click="pageSelected(index)" :class="getPageButtonStyle(index)">{{ index }}</span>
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
let selectedList:any = ref([]);
let userId = ref("");
let selectedMenu = ref(0);
let maxPage = ref(1);
let selectedPage = ref(1);

checkLogin();

getAPI("/user_info")
  .then(userInfoFetchHandler)
  .catch(userInfoFailedHandler);

function checkLogin() {
  if (store.accessToken=="" || store.accessToken==null) {
    alert("로그인한 유저만 들어올 수 있는 페이지입니다.")
    router.push("/");
  }
}

function userInfoFetchHandler(response:any) {
  resolve = response.data.resolve;
  userId.value = response.data.user_id;

  let favoriteNumbers = response.data.favorite;
  for (let i = 0; i < favoriteNumbers.length; i++) {
    for (let j = 0; j < resolve.length; j++) {
      if (resolve[j].id == favoriteNumbers[i]){
        favorite.push(resolve[j]);
        resolve[j]['favorite'] = 1;
        favorite[i]['favorite'] = 1;
      }
    }
  }

  maxPage.value = (resolve.length-1)/10;
  pageSelected(1);
}
function userInfoFailedHandler() {
  alert("잘못된 유저정보입니다.");
  router.push('/');
}

function pageSelected(num:number) {
  selectedList.value = [];
  selectedPage.value = num;
  maxPage.value = selectedMenu.value ? Math.trunc((favorite.length-1)/10)+1 : Math.trunc((resolve.length-1)/10)+1;

  if (selectedMenu.value) {
    for (let i = 0; i < 10; i++) {
      selectedList.value.push(favorite[(num-1)*10 + i]);
      if (num == maxPage.value && i == (favorite.length%10)-1) break;
    }
  } else {
    for (let i = 0; i < 10; i++) {
      selectedList.value.push(resolve[(num-1)*10 + i]);
      if (num == maxPage.value && i == (resolve.length%10)-1) break;
    }
  }
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
}
function modifyFetchHandler(response:any) {

}
function modifyFailedHandler() {
  alert("error");
  router.push('/');
}

function getMenuButtonStyle(value: number) {
  let text = "menu menu" + String(value);
  if (value == selectedMenu.value) text = text + " selected";
  return text;
}
function getPageButtonStyle(value: number) {
  let text = "page";
  if (value == selectedPage.value) text = text + " selected";
  return text;
}

function menuClicked(value: number) {
  selectedMenu.value = value;
  pageSelected(1);
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
.page{
  margin: 5px;
  padding: 1px 5px;
  border: 1px solid #000000;
  cursor: pointer;
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
      border-bottom: 4px solid #000000;
      position: relative;

      .name{
        font-size: 36px;
      }
    }
    .bottom{
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>