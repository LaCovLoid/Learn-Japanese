<template>
  <div :class="$style.index">
    <main :class="$style.footerMain">
      <span :class="$style.maked">maked by LaCov</span>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" module>
.index{
  background-color: #fadaff;
  .footerMain{
    margin: 0 auto;
    padding: 10px 10px;
    max-width: 1280px;

    background-color: #e9fbff;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    .maked{
      color: #5c5c5c;
      font-size: 12px;
    }
  }
}
</style>