<template>
  <div class="calculator">
    <Input
      v-model="params.sum"
      type="number"
      label="Sum*"
      :readonly="readonly"
    />
    <template v-if="params.bonus">
      <Input
        v-model="params.bonus.sum"
        type="number"
        label="Bonus sum"
      />
      <Input
        v-model="params.bonus.apr"
        type="number"
        label="Bonus APR (%)"
      />
    </template>
    <Input
      v-model="params.apr"
      type="number"
      label="APR (%)*"
      :readonly="readonly"
    />
    <InvestCalculatorResult
      :result="result"
      label="Result"
    />
  </div>
</template>
  
<script setup lang="ts">
import { Input } from '../../shared/components';
import { InvestCalculatorResult } from '../InvestCalculatorResult';
import { ICalculateParamsWithBonus, ICalculateResult } from '../../entities';

defineProps<{
  result: ICalculateResult | undefined;
  readonly?: boolean;
}>();

const params = defineModel<ICalculateParamsWithBonus>({ required: true });
</script>

<style scoped lang="scss">
.calculator {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
  