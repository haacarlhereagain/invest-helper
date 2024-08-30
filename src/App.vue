<template>
  <div class="invest-helper">
    <div
      class="invest-helper__list"
      :class="{ 'invest-helper__list--sticked': attachMostPerspective }"
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
        <button @click="deletePlace(place.id)">
          Delete place
        </button>
      </div>
      <button @click="addPlace">
        Add place
      </button>
    </div>
    <Checkbox
      v-model="attachMostPerspective"
      label="Attach most perspective"
    />
    <div class="invest-helper-total">
      <div class="invest-helper-total__title">
        Total
      </div>
      <Input
        v-for="(label, key) in totalLabels"
        :key="key"
        :label="label"
        :model-value="total[key]"
        readonly
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { InvestCalculator, IInvestCalculatorResult, CALCULATOR_RESULS_LABELS } from './components/InvestCalculator';
import { ICalculator } from './types/investHelper';
import Input from './components/Input.vue';
import Checkbox from './components/Checkbox.vue';
import { sortBy } from 'lodash-es';
import { getIncomePerDay } from './utils';

const placeList = ref<ICalculator[]>([]);
const attachMostPerspective = ref(false);

const totalLabels = {
  ...CALCULATOR_RESULS_LABELS,
  total: 'Sum',
}

const addPlace = (): void => {
  placeList.value.push({
    id: crypto.randomUUID(),
    title: '',
    params: {
      apr: undefined,
      sum: undefined,
      bonus: {
        apr: undefined,
        sum: undefined,
      }
    },
  });
}

const deletePlace = (id: string): void => {
  placeList.value = placeList.value.filter(place => place.id !== id);
}

const results = computed<Record<string,  IInvestCalculatorResult>>(() => (
  placeList.value.reduce((result, { id, params }) => {
    if (!params.apr || !params.sum) {
      return result;
    }
    const bonusSumNormalized = params.bonus?.sum && params.bonus?.apr ? params.bonus?.sum :  0;
    const sumWithoutBonusSum = Math.max(params.sum - bonusSumNormalized, 0);
    const bonusSumAvailable = Math.min(bonusSumNormalized, params.sum);
    const perDayBonus = params.bonus?.apr && bonusSumAvailable ? getIncomePerDay(bonusSumAvailable, params.bonus?.apr) : 0;
    const perDay = getIncomePerDay(sumWithoutBonusSum, params.apr);
    const perDayFinalized = perDayBonus + perDay;

    result[id] = {
      perDay: perDayFinalized,
      perMonth: perDayFinalized * 30,
      perYear: perDayFinalized * 365,
    }
    return result;
  }, {} as Record<string,  IInvestCalculatorResult>)
))

const mostPerspectivePlaceId = computed<string | undefined>(() => {
  let rate = -Infinity;
  let id: string | undefined;
  for (const place of placeList.value) {
    const placeResult = results.value[place.id];
    if (!placeResult || !place.params.sum) {
      continue;
    }
    const placeRate = placeResult.perDay / place.params.sum;
    if (placeRate <= rate) {
      continue;
    }
    rate = placeRate;
    id = place.id;
  }
  return id;
})

const placeListSorted = computed(() => {
  if (!attachMostPerspective.value) {
    return placeList.value;
  }
  return sortBy(placeList.value, (prev) => prev.id === mostPerspectivePlaceId.value ? -1 : 0);
})

const init = (): void => {
  addPlace();
}

const total = computed<{ total: number } & IInvestCalculatorResult>(() => placeList.value.reduce((total, { id, params }) => {
  total.total += params.sum || 0;
  const result = results.value[id];
  if (!result) {
    return total;
  }
  total.perDay += result.perDay;
  total.perMonth += result.perMonth;
  total.perYear += result.perYear;
  return total;
}, { total: 0, perDay: 0, perMonth: 0, perYear: 0 } as { total: number } & IInvestCalculatorResult));

init();
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

  .invest-helper-total {
    display: flex;
    flex-direction: column;
    align-items: start;

    &__title {
      font-weight: 700;
    }
  }
}
</style>
