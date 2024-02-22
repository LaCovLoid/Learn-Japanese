<template>
  <main>
    <div :class="$style.container"> {{time}} </div>
    <h1 @click="increase">{{ count }}</h1>
    <div>아아아아 {{ testText }}</div>
  </main>
</template>


<script setup lang="ts">
import {ref,reactive,computed,onMounted,onUpdated,onUnmounted} from 'vue';

const time = ref(0);
const count = ref(0);   //그냥 값 자체는 ref

const testText = computed(()=>{ //Watch역활의 computed / watch는 받아서 작업처리에 용이
  return time;
})

function timeIncrease() {
  time.value ++;
  if (time.value > 5) time.value = 0;
}
function increase() {
  count.value++;
  return "1second";
};

onMounted(()=> {
  setInterval(() => {timeIncrease()}, 1000);
});
onUpdated(()=> {
});
onUnmounted(()=>{
});

</script>

<script lang="ts">
</script>


<style lang="scss" module>
.container {
}
</style>