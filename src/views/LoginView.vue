<template>
  <div :class="$style.index">
    <main :class="$style.loginMain">
      <input :class="$style.inputId" placeholder="아이디" v-model="id">
      <br/>
      <input type="password" placeholder="비밀번호" :class="$style.inputPassword" v-model="password">
      <br/>
      <span :class="$style.loginButton" @click="onSubmit">로그인</span>
      <br/>
      <RouterLink to="/regist" :class="$style.regist">회원 가입</RouterLink>
    </main>
  </div>
</template>


<script setup lang="ts">

import { ref } from 'vue';
import router from "@/router";
import { postAPI } from '@/api/api';
import { piniaStore } from '@/store/index';

const store = piniaStore();

let id = ref("");
let password = ref("");

loginCheck();

function loginCheck() {
  if (store.accessToken) {
    alert("이미 로그인되어있습니다.");
    router.push("/mypage");
  }
}

function onSubmit() {
  postAPI("/login",{
    id: id,
    password: password,
  })
  .then(loginFetchHandler)
  .catch(loginFailedHandler);
}

function loginFetchHandler(response:any){
  //아이디도 store에 보관해서 활용 ex)닉넴과 토큰값이 동시에 같은지? 혹은 닉넴님~어서오세요
  //아냐 받는값이 엑세스토큰이라 db를 새로 만들어야해
  store.setAccessToken(response.data);
  router.push("/");
}
function loginFailedHandler(){
  alert("로그인 실패");
  return;
}
</script>


<style lang="scss" module>
.index{
  background-color: #ffdefd;
  padding-bottom: 100px;
  .loginMain{
    margin: 0 auto;
    max-width: 1280px;
    padding-bottom: 30px;

    text-align: center;
    vertical-align:middle;
    background-color: #ffffff;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

    .inputId{
      margin-top: 100px;
      font-size: 20px;
    }
    .inputPassword{
      margin-top: 10px;
      font-size: 20px;
    }
    .loginButton{
      margin-top: 50px;
      padding: 10px 15px;
      display: inline-block;
      background-color: #ffeeee;

      border: #000000 solid 2px;
      border-radius: 5px;
      cursor: pointer;
    }
    .regist{
      margin-top: 50px;
      margin-left: 80%;
      padding: 2px 3px;
      display: inline-block;
      border: 1px solid #000000;
    }
  }
}
</style>