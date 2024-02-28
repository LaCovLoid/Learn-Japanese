<template>
  <div :class="$style.container">
    {{ word }} 링크에 접속
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const word = ref(route.params.word);

</script>

<style lang="scss" module>
.container{
  font-size: 60px;
}
</style>