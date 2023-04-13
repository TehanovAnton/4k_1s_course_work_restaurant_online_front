<script setup>
  import { ref } from 'vue';
  import RestaurantForm from '../../../components/RestaurantForm.vue';
  import restaurant_service from '../../services/restaurants/restaurant_service';
  import tokensService from '../../services/tokensService';
  
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
  <div>
    <RestaurantForm :restaurant="newRestaurant" action-name="create" label="New Restaurant"
                    @form-submit="createRestaurant"/>
  </div>
</template>