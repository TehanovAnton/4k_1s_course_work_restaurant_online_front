<script setup>
  import { computed } from 'vue';
  import { useSearchModelsStore } from '../../../search/stores/SearchModelsStore';
  import { useRestaurantsStore } from '../../stores/RestaurantsStore';
  import RestaurantCard from '../components/RestaurantCardView.vue';

  const modelsSearchStore = useSearchModelsStore()
  const restaurants = computed(() => modelsSearchStore.restaurants);
</script>

<template>
  <div v-for="restaurant in restaurants" :key="restaurant.id">
    <RestaurantCard :restaurant="restaurant" />
  </div>
</template>