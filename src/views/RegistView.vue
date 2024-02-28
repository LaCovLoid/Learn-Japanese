<template>
  <div :class="$style.index">
    <main :class="$style.registMain">
      <input :class="$style.inputId" placeholder="아이디" v-model="id">
      <br/>
      <input type="password" placeholder="비밀번호" :class="$style.inputPassword" v-model="password">
      <br/>
      <input type="password" placeholder="비밀번호 재입력" :class="$style.inputPassword" v-model="checkPassword">
      <br/>
      <span :class="$style.registButton" @click="onSubmit">회원가입</span>
      <hr>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from "@/router";
import { postAPI } from '@/api/api';

let id = ref("");
let password = ref("");
let checkPassword = ref("");

function onSubmit() {
  if (checkPassword.value != password.value){
    alert("재입력된 비밀번호가 같지 않습니다");
    console.log("안왔엉");
    return;
  }
  console.log("왔엉");
  postAPI("/regist",{
    id: id,
    password: password,
  })
  .then(registFetchHandler)
  .catch(registFailedHandler);
}

function registFetchHandler(){
  alert("회원가입에 성공하였습니다");
  router.push("/login");
}
function registFailedHandler(){
  alert("회원가입 실패");
  return;
}
</script>

<style lang="scss" module>
.index{
  background-color: #f0ffff;
  .registMain{
    margin: 0 auto;
    max-width: 1280px;

    text-align: center;
    vertical-align:middle;
    background-color: #ffdefd;

    .inputId{
      margin-top: 100px;
      font-size: 20px;
    }
    .inputPassword{
      margin-top: 10px;
      font-size: 20px;
    }
    .registButton{
      margin-top: 10px;
      padding: 10px 15px;
      display: inline-block;
      background-color: #ffffff;

      border: #000000 solid 2px;
      border-radius: 5px;
    }
  }
}
</style>