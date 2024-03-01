<template>
  <div :class="$style.index">
    <div :class="$style.top">
      <img :src="getSrc()" alt="" :class="$style.star" @click="favoriteClicked"/>
      {{word.word}}
      ( {{word.yomigana}} )
      {{word.mean}}
      <RouterLink :to="getExampleLink(word.id)" :class="$style.example">예시</RouterLink>
    </div>
    <div :class="$style.line"></div>
    <div :class="$style.bottom">
      {{word.example_word}} <br/>
      {{word.example_mean}}
    </div>
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

function getExampleLink(value:number){
  return "/example?id="+value;
}

</script>

<style lang="scss" module>

.index{
  width: 50%;
  margin-top: 20px;
  padding: 5px;

  vertical-align: top;
  display: inline-block;
  .top{
    position: relative;
    .star{
      width: 15px;
    }
    .example{
      color: #7e7e7e;
      position: absolute;
      right: 30px;
    }
  }
  .line{
    height: 1px;
    width: 60%;
    margin:5px 0;
    border-bottom: 1px solid #000000;

  }
  .bottom{

  }
}
</style>