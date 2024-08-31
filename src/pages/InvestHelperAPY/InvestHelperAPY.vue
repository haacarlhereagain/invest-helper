<template>
    <div class="invest-helper-apy">
        <div class="invest-helper-apy__period">
            <DatePicker
                v-model="period.from"
                label="From"
            />
            <DatePicker
                v-model="period.to"
                label="To"
            />
        </div>
        <PlaceList
            :place-list="placeList"
            @add="addPlace"
            @delete="deletePlace"
        >
            <template #result="{ place }">
                <InvestCalculatorResultAPY
                    :incomes="incomes[place.id] || []"
                    :sum="place.params.sum"
                />
            </template>
        </PlaceList>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { IIncomeAPY, usePlaceList } from '../../entities';
import { DatePicker } from '../../shared/components';
import { PlaceList, InvestCalculatorResultAPY } from '../../widgets';
import { IPeriod } from '../../shared/types';
import { calculateIncomeAPY } from '../../features';

const period = reactive<IPeriod>({
    from: undefined,
    to: undefined,
})

const {
    placeList,
    addPlace,
    deletePlace,
} = usePlaceList();

const init = (): void => {
    addPlace();
}

const incomes = computed<Record<string, IIncomeAPY[]>>(() => {
    if (!period.from || !period.to) {
        return {};
    }

    return placeList.value.reduce((incomes, { params, id }) => {
        incomes[id] = calculateIncomeAPY(params, period);
        return incomes;
    }, {} as Record<string, IIncomeAPY[]>)
})

init();
</script>