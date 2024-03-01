<template>
  <main>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

</script>

<style lang="scss" module>
</style>