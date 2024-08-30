<template>
    <div class="num-input">
        <label :for="templateId">
            {{ label }}
        </label>
        <input
            v-model="value"
            :id="templateId"
            :readonly="readonly"
            :type="type"
        >
    </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
    label?: string;
    readonly?: boolean;
    type?: 'text' | 'number';
}>(), {
    type: 'text',
});

const value = defineModel<number | string>();

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
