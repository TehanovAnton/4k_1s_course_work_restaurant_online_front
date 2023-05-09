<script setup>
  import { computed } from 'vue';
  import { useDishesStore } from '../../stores/DishesStore';
  import { useBasketsStore } from '../../../baskets/stores/BasketsStore';
  import DishShowView from './../Show/ShowView.vue';
  import DishCreateView from '../../CreateView.vue';
  import DishesGrid from './DishesGrid.vue';

  const dishesStore = useDishesStore()
  const basketsStore = useBasketsStore()

  const dishes = computed(() => { return dishesStore.dishes })
  const dishesExists = computed(() => {
    if (!!!dishes.value)
      return false

    return dishes.value.length > 0
  })
</script>

<template>
  <DishesGrid v-if="dishesExists">
    <DishShowView v-for="dish in dishes" :dish="dish" />
  </DishesGrid>

  <DishCreateView v-if="!dishesExists" />
</template>

