<template>
  <main>
    <router-link :to='{path:abcc.abcPath}'>{{ abcc.abcMessage }}</router-link>
    <div> {{time}} </div>
    <h1 @click="increase">{{ count }}</h1>
    <div>아아아아 {{ testText }}</div>
    <ByeWorld />
  </main>
</template>


<script setup lang="ts">
import {ref,reactive,computed,onMounted,onUpdated,onUnmounted} from 'vue';
import ByeWorld from '../components/ByeWorld.vue';

onMounted(()=> {
  setInterval(() => {timeIncrease()}, 1000);
});
onUpdated(()=> {
});
onUnmounted(()=>{
});

const time = ref(0);
const count = ref(0);   //그냥 값 자체는 ref
const abcc = reactive({ //객체는 reactive
  abcMessage: "abcc",
  abcPath: "about",
});

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

</script>

<script lang="ts">
</script>


<style lang="scss" module>
</style>