<script setup>
  import { ref } from 'vue';
  import RestaurantForm from '../../components/RestaurantForm.vue';  
  import service from '../services/restaurants/restaurant_service'
  import tokensService from '../services/tokensService';

  const props = defineProps(['restaurant'])
  const emits = defineEmits(['data-change'])

  const updatRestaurant = async () => {
    let { 
      response, 
      isSuccessful
    } = await service.apiUpdateRestaurants(tokensService.auth_headers(), props.restaurant)

    if (isSuccessful) {      
      // props.restaurant.value = response.data
      tokensService.setAuthTokens(response.headers)
      emits('data-change')
    }
  }
</script>

<template>
  <div class="block">
    Edit Restaurant:
    <RestaurantForm :reRestaurantFostaurant="restaurant" action-name="update" @form-suRestaurantFobmit="updatRestaurant"/>
  </div>
</template>