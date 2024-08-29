<template>
  <div class="invest-helper">
    <NumInput
      v-model="sum"
      label="Sum"
    />
    <NumInput
      v-model="apr"
      label="APR (%)"
    />
    
    <div class="result">
      <span class="result__title">
        Result
      </span>
      <NumInput
        v-for="(label, period) in labels"
        :key="period"
        :model-value="result?.[period]"
        :label="label"
        readonly
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import NumInput from './components/NumInput.vue';
import { IResult } from './types/result.type';

const sum = ref<number>();
const apr = ref<number>();

const labels: Record<keyof IResult, string> = {
  perDay: 'Per day',
  perMonth: 'Per month',
  perYear: 'Per year',
}

const result = computed<IResult | undefined>(() => {
  if (!sum.value || !apr.value) {
    return;
  }
  const perDay = apr.value / 365 / 100 * sum.value;
  return {
    perDay,
    perMonth: perDay * 30,
    perYear: perDay * 365,
  }
})
</script>

<style scoped lang="scss">
.invest-helper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .result {
    background-color: #f5f2f2;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 12px;

    &__title {
      font-weight: 700;
    }
  }
}
</style>
