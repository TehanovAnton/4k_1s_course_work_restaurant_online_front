<script setup>
import { onBeforeMount, ref } from 'vue';
import restaurantService from '../../../../services/restaurants/restaurant_service';
import tokensService from '../../../../services/tokensService';

const emits = defineEmits(['dataReady'])

onBeforeMount(async () => {
  let { response, isSuccessful } = await restaurantService.apiIndexRestaurants(tokensService.auth_headers())

  if (isSuccessful) {      
    restaurants.value = response.data
    dataReady.value = true

    tokensService.setAuthTokens(response.headers)
  }

  emits('dataReady', restaurants)
})

const restaurants = ref([])
const dataReady = ref(false)
</script>

<template>
  <slot v-if="dataReady" />
</template>