<script setup>
  import { ref } from 'vue';
  import RestaurantForm from '../../components/restaurants/RestaurantForm.vue';
  import restaurant_service from '../services/restaurant_service';
  import tokensService from '../services/tokensService';
  
  const emits = defineEmits(['data-change'])
  const newRestaurant = ref({ name:'', email:'', address:''})

  const createRestaurant = async () => {
    let {
      response,
      isSuccessful
    } = await restaurant_service.apiCreateRestaurants(tokensService.auth_headers(), newRestaurant.value)

    if (isSuccessful) {      
      tokensService.setAuthTokens(response.headers)
      emits('data-change')
    }
  }
</script>

<template>  
  <RestaurantForm :restaurant="newRestaurant" action-name="create" @form-submit="createRestaurant"/>
</template>