<template>
    <div class="checkbox">
        <div>
            <input
                :id="templateId"
                type="checkbox"
                :checked="value === trueValue"
                :value="value"
                @input="setValue"
            />
            <label :for="templateId">
                {{ label }}
            </label>
        </div>
        
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    label?: string;
    valueList?: (string | number | boolean)[];
    trueValue?: boolean | string | number;
    falseValue?: boolean | string | number;
}>(), {
    trueValue: true,
    falseValue: false,
});

const templateId = `checkbox-${crypto.randomUUID()}`;

const value = defineModel<string | number | boolean>();

const setValue = (): void => {
    value.value = value.value === props.trueValue ? props.falseValue : props.trueValue;
}
</script>

<style lang="scss" scoped>
.checkbox {
    display: flex;
    flex-direction: column;
    align-items: start;
}
</style>