<template>
  <div :class="$style.index">
    <main :class="$style.homeMain">
      {{ word }}
      <br />
      {{ mean }}
      <br />
      {{ yomigana }}
      <br />
      {{ example_word }}
      <br />
      {{ example_mean }}
      <div v-if="word">
        <KeyboardComponent :wordLength=yomigana.length />
      </div>
    </main>
  </div>
</template>


<script setup lang="ts">
import {ref,reactive,computed} from 'vue';
import {getAPI} from '../api/api';
import KeyboardComponent from '../components/KeyboardComponent.vue'

let word = ref("");
let mean = ref("");
let yomigana = ref("");
let example_word = ref("");
let example_mean = ref("");

let apiData = getAPI("/random")
  .then(randomFetchHandler)
  .catch(randomFailedHandler);

function randomFetchHandler(response:any){
  word.value = response.data[0].word;
  mean.value = response.data[0].mean;
  yomigana.value = response.data[0].yomigana;
  example_word.value = response.data[0].example_word;
  example_mean.value = response.data[0].example_mean;
  console.log(word);
}

function randomFailedHandler(){
  
}

</script>


<style lang="scss" module>
.index {
  background-color: #fadaff;
  .homeMain {
    margin: 0 auto;
    padding: 10px 10px;
    max-width: 1280px;
    background-color: #b78fbe;
  }
}
</style>