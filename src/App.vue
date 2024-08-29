<template>
  <div class="invest-helper">
    <div class="invest-helper__list">
      <div
        v-for="place in placeList"
        :key="place.id"
        class="invest-helper__item invest-item"
      >
        <Input
          v-model="place.title"
          label="Place"
          class="invest-item__title"
        />
        <InvestCalculator
          v-model="place.params"
          :result="results[place.id]"
        />
        <button @click="deleteCalculator(place.id)">
          Delete place
        </button>
      </div>
      <button @click="addCalculator">
        Add place
      </button>
    </div>

    <div
      v-if="mostPerspectivePlace"
      class="invest-helper__most-perspective-place most-perspective-place"
    >
      <div class="most-perspective-place__title">
        {{ mostPerspectivePlace.title }}
      </div>
      <InvestCalculator
        :model-value="mostPerspectivePlace.params"
        :result="mostPerspectivePlace"
        readonly
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { InvestCalculator, IInvestCalculatorResult } from './components/InvestCalculator';
import { ICalculator } from './types/investHelper';
import Input from './components/Input.vue';

const placeList = ref<ICalculator[]>([]);

const addCalculator = (): void => {
  placeList.value.push({ id: crypto.randomUUID(), title: '', params: { apr: undefined, sum: undefined } });
}

const deleteCalculator = (id: string): void => {
  placeList.value = placeList.value.filter(place => place.id !== id);
}

const results = computed<Record<string,  IInvestCalculatorResult>>(() => (
  placeList.value.reduce((result, { id, params }) => {
    if (!params.apr || !params.sum) {
      return result;
    }
    const perDay = params.apr / 365 / 100 * params.sum;

    result[id] = {
      perDay,
      perMonth: perDay * 30,
      perYear: perDay * 365,
    }
    return result;
  }, {} as Record<string,  IInvestCalculatorResult>)
))

const mostPerspectivePlace = computed<ICalculator & IInvestCalculatorResult | undefined>(() => {
  let result: ICalculator & IInvestCalculatorResult | undefined;
  for (const place of placeList.value) {
    const placeResult = results.value[place.id];
    if (placeResult && (!result || result?.perDay < placeResult.perDay)) {
      result = {
        ...place,
        ...placeResult
      };
    }
  }
  return result;
})

</script>

<style scoped lang="scss">
.invest-helper {
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: start;

  &__list {
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 100%;
    overflow: auto;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 6;
  }
  
  .invest-item {
    &__title {
      :deep(label) {
        font-weight: 700;
      }
    }
  }

  .most-perspective-place {
    display: flex;
    flex-direction: column;
    align-items: start;

    &__title {
      font-weight: 700;
    }
  }
}
</style>
