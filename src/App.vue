<template>
  <div class="invest-helper">
    <div
      class="invest-helper__list"
      :class="{ 'invest-helper__list--sticked': fixMostPerspective }"
    >
      <div
        v-for="place in placeListSorted"
        :key="place.id"
        class="invest-helper__item invest-item"
        :class="{ 'invest-item--most-perspective': place.id === mostPerspectivePlaceId }"
      >
        <Input
          v-model="place.title"
          label="Name"
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
    <div class="invest-helper__most-helper-to-left">
      <Checkbox
        v-model="fixMostPerspective"
        label="Fix most perspective"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { InvestCalculator, IInvestCalculatorResult } from './components/InvestCalculator';
import { ICalculator } from './types/investHelper';
import Input from './components/Input.vue';
import Checkbox from './components/Checkbox.vue';
import { sortBy } from 'lodash-es';

const placeList = ref<ICalculator[]>([]);
const fixMostPerspective = ref(false);

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

const mostPerspectivePlaceId = computed<string | undefined>(() => {
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
  return result?.id;
})

const placeListSorted = computed(() => {
  if (!fixMostPerspective.value) {
    return placeList.value;
  }
  return sortBy(placeList.value, (prev) => prev.id === mostPerspectivePlaceId.value ? -1 : 0);
})

</script>

<style scoped lang="scss">
.invest-helper {
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: start;

  &__list {
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 100%;
    overflow: auto;

    &--sticked {
      .invest-item--most-perspective {
        position: sticky;
        left: 0;
      }
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 6px;
    transition: background-color ease-in-out 150ms;
  }
  
  .invest-item {
    &--most-perspective {
      background-color: #faf9d7;
    }

    &__title {
      :deep(label) {
        font-weight: 700;
      }
    }
  }
}
</style>
