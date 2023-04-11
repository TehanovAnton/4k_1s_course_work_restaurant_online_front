<script setup>
import { computed } from 'vue';
import { useRestaurantsStore } from '../stores/RestaurantsStore';
import RestaurantCard from './components/RestaurantCardView.vue';

const restaurantStore = useRestaurantsStore();
const restaurants = computed(() => restaurantStore.restaurants);

</script>


<template>
  <div>
    <h1>My Restaurants</h1>
    <div v-for="restaurant in restaurants" :key="restaurant.id">
      <RestaurantCard :restaurant="restaurant" />
    </div>
  </div>
</template>