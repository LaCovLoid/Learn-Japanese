<template>
  <main>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { getAPI } from '../api/api';
import { piniaStore } from '@/store/index';
const store = piniaStore();

let test = getAPI("/user_info");


</script>

<style lang="scss" module>
</style>