<template>
    <div class="counter">
      <p>숫자: {{ count }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  
  export default defineComponent({
    setup() {
      const count = ref(0);
  
      // 1초마다 숫자 증가
      const increaseCount = () => {
        count.value += 1;
      };
  
      // 컴포넌트가 마운트되면 타이머 시작
      onMounted(() => {
        setInterval(increaseCount, 1000);
      });
  
      return {
        count,
      };
    },
  });
  </script>
  
  <style scoped>
  /* 스타일 추가 */
  </style>