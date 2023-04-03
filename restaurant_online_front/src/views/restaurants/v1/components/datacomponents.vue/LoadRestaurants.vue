<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRestaurantsStore } from '../../../stores/RestaurantsStore';

const restaurantsStore = useRestaurantsStore()

onBeforeMount(async () => {
  await restaurantsStore.fetchRestaurants((_response) => {
    dataReady.value = true
  })

  if (!!!restaurantsStore.currentRestaurant.id) {
    restaurantsStore.setRestaurant(restaurantsStore.restaurants[0])
  }
    
})

const dataReady = ref(false)
</script>

<template>
  <slot v-if="dataReady" />
</template>