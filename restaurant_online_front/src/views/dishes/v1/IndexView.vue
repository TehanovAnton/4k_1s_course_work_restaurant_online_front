<script setup>
  import { useDishesStore } from '../stores/DishesStore';
  import { useBasketsStore } from '../../orders/stores/BasketsStore';
  import ShowView from './ShowView.vue';

  const dishesStore = useDishesStore()
  const basketsStore = useBasketsStore()
</script>

<template>
  {{ basketsStore.baskets }}
  <ShowView v-for="dish in dishesStore.dishes"
            :dish="dish"/>
</template>