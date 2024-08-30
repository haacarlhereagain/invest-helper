<template>
    <div class="invest-calculator-result">
      <span class="invest-calculator-result__title">
        {{ label }}
      </span>
      <Input
        v-for="(label, period) in CALCULATOR_RESULS_LABELS"
        :key="period"
        :model-value="result?.[period]"
        type="number"
        :label="label"
        readonly
      />
    </div>
</template>

<script lang="ts" setup>
import { CALCULATOR_RESULS_LABELS } from './InvestCalculatorResult.constant';
import { Input } from '../../shared/components';
import { ICalculateResult } from '../../entities';

defineProps<{
  result: ICalculateResult | undefined;
  label?: string;
}>();
</script>

<style lang="scss" scoped>
  
.invest-calculator-result {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;

  &__title {
    font-weight: 700;
  }
}
</style>