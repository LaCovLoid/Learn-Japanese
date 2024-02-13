
<template>
  
  <header>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </header>
  <RouterView /> <!--이게 본체?? 뭘 소환하는거지 홈뷰소환한건데 어디서 소환된겨?-->
</template>


<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

</script>

<style scoped>
</style>