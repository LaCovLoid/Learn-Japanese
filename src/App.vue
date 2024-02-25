
<template>
  
  <div @click="handleClick">
    <HeaderComponent />
    <RouterView /> <!--그 라우터 주소에 따라 상황에 맞는 view를 출력함-->
    <FooterComponent />
  </div>
</template>


<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { piniaStore } from '@/store/index';
const store = piniaStore();
function handleClick() {
  store.setCount(0);
}
</script>

<style scoped>
</style>