
<template>
  
  <HeaderComponent />

  <RouterView /> <!--그 라우터 주소에 따라 상황에 맞는 view를 출력함-->

  <div>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink :to="{name:'test',params:{word:'idd'}}" >Test</RouterLink>
  </div>

  <FooterComponent />
</template>


<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<style scoped>
</style>