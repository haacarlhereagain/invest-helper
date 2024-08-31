<template>
    <div class="date-picker">
        <label :for="templateId">
            {{ label }}
        </label>
        <input
            v-model="innerValue"
            :id="templateId"
            type="date"
        >
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { computed } from 'vue';

const templateId = `date-picker-${crypto.randomUUID()}`;

const props = defineProps<{
    label?: string;
    modelValue?: number;
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', v: number): void;
}>();

// const value = defineModel();

const innerValue = computed({
    get() {
        return dayjs(props.modelValue).format('YYYY-MM-DD');
    },
    set(v: string) {
        emits('update:modelValue', new Date(v).valueOf());
    }
})
</script>

<style lang="scss" scoped>
.date-picker {
    display: flex;
    flex-direction: column;
    align-items: start;
}
</style>