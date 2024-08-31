<template>
    <Table
        :column-list="columnList"
        :data="incomes"
        id-key="date"
        class="invest-calculator-result-apy"
    >
        <template #['row-date']="{ row }">
            {{ formatDate(row.date) }}
        </template>
    </Table>
    <Input
        :model-value="total"
        label="Item total"
        readonly
    />
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { IIncomeAPY } from '../../entities';
import { Table } from '../../shared/components';
import { IColumn } from '../../shared/types';
import { computed } from 'vue';
import { Input } from '../../shared/components';

const props = withDefaults(defineProps<{
    incomes: IIncomeAPY[];
    sum?: number;
}>(), {
    sum: 0,
    incomes: () => [],
});

const columnList: IColumn<keyof IIncomeAPY>[] = [
    { field: 'date', label: 'Date' },
    { field: 'income', label: 'Income' },
    { field: 'total', label: 'Total' },
]

const formatDate = (date: number): string => dayjs(date).format('YYYY-MM-DD');

const total = computed(() => {
    if (!props.incomes.length) {
        return 0;
    }
    return props.incomes[props.incomes.length - 1].total - props.sum;
})
</script>

<style lang="scss" scoped>
.invest-calculator-result-apy {
    max-height: 300px;
}
</style>