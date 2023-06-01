<script setup>
  import { computed } from 'vue';
  import { useRestaurantsStore } from '../../stores/RestaurantsStore';
  import RestaurantCard from '../components/RestaurantCardView.vue';

  const restaurantsStore = useRestaurantsStore()
  const restaurants = computed(() => restaurantsStore.restaurants);
</script>

<template>
  <div v-for="restaurant in restaurants" :key="restaurant.id">
    <RestaurantCard :restaurant="restaurant" />
  </div>
</template>