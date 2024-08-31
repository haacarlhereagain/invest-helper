<template>
  <div class="invest-helper">
    <PlaceList
      :place-list="placeListSorted"
      :attach-most-perspective="attachMostPerspective"
      :most-perspective-place-id="mostPerspectivePlaceId"
      @add="addPlace"
      @delete="deletePlace"
    >
      <template #result="{ place }">
        <InvestCalculatorResult
          :result="incomes[place.id]"
          label="Result"
        />
      </template>
    </PlaceList>
    <Checkbox v-model="attachMostPerspective">
      Attach most perspective
    </Checkbox>
    <div class="invest-helper__total">
      <InvestCalculatorResult
        :result="total"
        label="Total"
      />
      <Input
        :model-value="total.sum"
        label="Spent"
        readonly
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IIncome, usePlaceList } from '../../entities';
import { InvestCalculatorResult, PlaceList } from '../../widgets';
import { Checkbox, Input } from '../../shared/components';
import { sortBy } from 'lodash-es';
import { calculateIncome, getRate } from '../../features';

const attachMostPerspective = ref(false);

const {
  placeList,
  addPlace,
  deletePlace,
} = usePlaceList();

const incomes = computed<Record<string, IIncome>>(() => (
  placeList.value.reduce((result, { id, params }) => {
    result[id] = calculateIncome(params);
    return result;
  }, {} as Record<string,  IIncome>)
))

const mostPerspectivePlaceId = computed<string | undefined>(() => {
  let rate = -Infinity;
  let id: string | undefined;
  for (const place of placeList.value) {
    const income = incomes.value[place.id];
    if (!income || !place.params.sum) {
      continue;
    }
    const placeRate = getRate(place.params.sum, income.perDay);
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

const total = computed<{ sum: number } & IIncome>(() => placeList.value.reduce((total, { id, params }) => {
  total.sum += params.sum || 0;
  const income = incomes.value[id];
  total.perDay += income.perDay;
  total.perMonth += income.perMonth;
  total.perYear += income.perYear;
  return total;
}, { sum: 0, perDay: 0, perMonth: 0, perYear: 0 } as { sum: number } & IIncome));

init();
</script>

<style scoped lang="scss">
.invest-helper {
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: start;

  &__total {
    padding: 6px;
  }
}
</style>
