<template>
    <ItemsWrapper
      :item-list="placeList"
      :attached-item-id="attachMostPerspective ? mostPerspectivePlaceId : undefined"
      class="place-list"
      @add="$emit('add')"
      @delete="$emit('delete', $event as string)"
    >
      <template #="{ item: place }">
        <div
          class="place-list__item place-list-item"
          :class="{ 'place-list-item--most-perspective': place.id === mostPerspectivePlaceId }"
        >
          <Input
            v-model="place.title"
            label="Name"
            class="place-list-item__title"
          />
          <InvestCalculator v-model="place.params" />
          <slot
            name="result"
            :place="place"
          />
        </div>
      </template>
    </ItemsWrapper>
</template>

<script lang="ts" setup>
import { IPlace } from '../../entities';
import { ItemsWrapper, Input } from '../../shared/components';
import { InvestCalculator } from '../InvestCalculator';

defineProps<{
    placeList: IPlace[];
    attachMostPerspective?: boolean;
    mostPerspectivePlaceId?: string;
}>();

defineEmits<{
    (e: 'add'): void;
    (e: 'delete', id: string): void;
}>();
</script>

<style lang="scss" scoped>
.place-list__item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 6px;
    transition: background-color ease-in-out 150ms;
  }
  
  .place-list-item {
    &--most-perspective {
      background-color: #faf9d7;
    }

    &__title {
      :deep(label) {
        font-weight: 700;
      }
    }
  }
</style>