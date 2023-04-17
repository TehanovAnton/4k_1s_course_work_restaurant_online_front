<script setup>
import { computed } from 'vue';
import { useRestaurantsStore } from '../stores/RestaurantsStore';
import RestaurantCard from './components/RestaurantCardView.vue';
import LoadRestaurants from './components/datacomponents.vue/LoadRestaurants.vue';
const restaurantStore = useRestaurantsStore();
const restaurants = computed(() => restaurantStore.restaurants);
const currentUserRestaurants = computed(() => restaurantStore.currentUserRestaurants)

</script>


<template>
  <LoadRestaurants>
    <div>
      <h1>My Restaurants</h1>
      <div v-for="restaurant in currentUserRestaurants" :key="restaurant.id">
        <RestaurantCard :restaurant="restaurant" />
      </div>
    </div>
    <div>
      <h1>Restaurants</h1>
      <div v-for="restaurant in restaurants" :key="restaurant.id">
        <RestaurantCard :restaurant="restaurant" />
      </div>
    </div>
  </LoadRestaurants>  
</template>