<script setup>
  import { useDishesStore } from '../stores/DishesStore';
  import { useBasketsStore } from '../../baskets/stores/BasketsStore';
  import ShowView from './Show/ShowView.vue';

  const dishesStore = useDishesStore()
  const basketsStore = useBasketsStore()
</script>

<template>
  {{ basketsStore.baskets }}
  {{ dishesStore.dishes }}
  <ShowView v-for="dish in dishesStore.dishes"
            :dish="dish"/>
</template>