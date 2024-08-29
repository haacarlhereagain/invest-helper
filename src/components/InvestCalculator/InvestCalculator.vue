<template>
  <div class="calculator">
    <Input
      v-model="params.sum"
      label="Sum"
      :readonly="readonly"
    />
    <Input
      v-model="params.apr"
      type="number"
      label="APR (%)"
      :readonly="readonly"
    />
    
    <div class="result">
      <span class="result__title">
        Result
      </span>
      <Input
        v-for="(label, period) in labels"
        :key="period"
        :model-value="result?.[period]"
        type="number"
        :label="label"
        readonly
      />
    </div>
  </div>
</template>
  
<script setup lang="ts">
import Input from '../Input.vue';
import { IInvestCalculatorResult } from './InvestCalculator.type';
import { ICalculatorParams } from '../../types/investHelper';

defineProps<{
  result: IInvestCalculatorResult | undefined;
  readonly?: boolean;
}>();

const params = defineModel<ICalculatorParams>({ required: true });

const labels: Record<keyof IInvestCalculatorResult, string> = {
  perDay: 'Per day',
  perMonth: 'Per 30 days',
  perYear: 'Per 365 days',
}
</script>

<style scoped lang="scss">
.calculator {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .result {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 6px;

    &__title {
      font-weight: 700;
    }
  }
}
</style>
  