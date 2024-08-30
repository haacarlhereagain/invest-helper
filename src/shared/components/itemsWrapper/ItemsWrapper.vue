<template>
    <div class="items-wrapper">
        <div
            v-for="(item, idx) in itemList"
            :key="item[idKey] as string || idx"
            class="items-wrapper__item"
            :class="{ 'items-wrapper__item--attached': item[idKey] as string === attachedItemId }"
        >
            <slot :item="item" />
            <button @click="$emit('delete', item[idKey] as string)">
                <slot name="delete-btn-content">
                    Delete
                </slot>
            </button>
        </div>
        <button @click="$emit('add')">
          <slot name="add-btn-content">
            Add
          </slot>
        </button>
    </div>
</template>

<script lang="ts" setup generic="Item extends Record<string, unknown>">
withDefaults(defineProps<{
    itemList: Item[];
    idKey?: string;
    attachedItemId?: string | number;
}>(), {
    idKey: 'id',
});

defineEmits<{
    (e: 'delete', id: string | number): void;
    (e: 'add'): void;
}>()
</script>

<style lang="scss" scoped>
$root: '.items-wrapper';

.items-wrapper {
    display: flex;
    align-items: center;
    overflow: auto;
    max-width: 100%;
    
    &__item {
        &--attached {
            position: sticky;
            left: 0;
        }
    }
}
</style>