<template>
    <div class="num-input">
        <label :for="templateId">
            {{ label }}
        </label>
        <input
            v-model.number="value"
            :id="templateId"
            :readonly="readonly"
            type="number"
        >
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    label?: string;
    readonly?: boolean;
}>();

const value = defineModel<number>();

const templateId = crypto.randomUUID();
</script>

<style lang="scss" scoped>
.num-input {
    display: flex;
    flex-direction: column;
    align-items: start;
    
    label {
        line-height: 1.2;
    }
}
</style>
