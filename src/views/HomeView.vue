<template>
  <main>
    <router-link :to='{path:abcc.abcPath}'>{{ abcc.abcMessage }}</router-link>
    <div> {{time}} </div>
    <h1 @click="increase">{{ count }}</h1>
    <ByeWorld />
    <TheWelcome />
  </main>
</template>

<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';
import ByeWorld from '../components/ByeWorld.vue';
</script>

<script lang="ts">
import {ref,onMounted,onUpdated,onUnmounted} from 'vue';

const time = ref(0);
const count = ref(0);
const abcc = ref({
  abcMessage: "abcc",
  abcPath: "abcd",
});

setInterval(() => {timeIncrease()}, 1000);

onMounted(()=> {
});
onUpdated(()=> {
});
onUnmounted(()=>{
});


function timeIncrease() {
  time.value ++;
  if (time.value > 5) time.value = 0;
}

function increase() {
  count.value++;
  return "1second";
};

</script>
