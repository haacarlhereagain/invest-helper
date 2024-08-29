<template>

  <input v-model="sum" type="number">
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sum = ref<number>();
const apr = ref<number>();

const templateIds = {
  sum: crypto.randomUUID(),
  apr: crypto.randomUUID(),
}

</script>

<style scoped>

</style>
