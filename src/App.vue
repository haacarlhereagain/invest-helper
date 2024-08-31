<template>
  <div class="app">
    <div class="app__type">
      <Checkbox
        v-for="({ value, label }) in typeList"
        :key="value"
        :true-value="value"
        v-model="type"
      >
        {{ label }}
      </Checkbox>
    </div>
    <InvestHelperAPR v-if="type === EHelperType.APR" />
    <InvestHelperAPY v-else />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InvestHelperAPR, InvestHelperAPY } from './pages';
import { EHelperType } from './entities';
import { Checkbox } from './shared/components';

const type = ref<EHelperType>(EHelperType.APR);

const typeList: { value: EHelperType, label: string }[] = [
  { value: EHelperType.APR, label: 'APR' },
  { value: EHelperType.APY, label: 'APY' },
]
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;

  &__type {
    display: flex;
  }
}
</style>