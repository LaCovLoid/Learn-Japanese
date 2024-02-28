<template>
  <div>
    <img :src="getSrc()" alt="" :class="$style.star" @click="favoriteClicked"/>
    {{word.word}}
    {{word.mean}}
    {{word.yomigana}}
    {{word.example_word}}
    {{word.example_mean}}
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const propData = defineProps(['propData']);
const emits = defineEmits(['sendingData']);
let word = reactive(propData.propData);


function favoriteClicked() {
  if (word.favorite == null || word.favorite == 0) {
    word['favorite'] = 1;
  } else {
    word['favorite'] = 0;
  }
  emits('sendingData', {id:word.id, favorite:word.favorite});
}

function getSrc() {
  if (word.favorite == null || word.favorite == 0) {
    return '/src/assets/image/star_empty.png';
  }else {
    return '/src/assets/image/star.png'
  }
}

</script>

<style lang="scss" module>
.star{
  width: 15px;
}
</style>