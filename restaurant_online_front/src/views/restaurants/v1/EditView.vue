<script setup>
import { computed } from '@vue/reactivity';
import EditIconWrap from './components/EditIconWrap.vue';
import Errors from '../../../components/errors/Errors.vue';
import RestaurantForm from '../../../components/RestaurantForm.vue';
import { useContentsStore } from '../stores/ContentsStore';
import { useRestaurantsStore } from '../stores/RestaurantsStore';
import { useRestaurantFormErrorsStore } from '../stores/RestaurantFormErrorsStore';
import restaurantService from '../../services/restaurants/restaurant_service';
import tokensService from '../../services/tokensService';

const contentsStore = useContentsStore()
const restaurantsStore = useRestaurantsStore()
const restaurantFormErrorsStore = useRestaurantFormErrorsStore()

const contentRestaurant = computed(() => {
  return restaurantsStore.currentRestaurant
})

const showRestaurant = () => contentsStore.setContent('RestaurantShowView')

const updatRestaurant = async (modefiedRestaurant) => {
  await restaurantService.apiUpdateRestaurants(
    tokensService.auth_headers(), 
    modefiedRestaurant,
    restaurantFormErrorsStore,
    async (reqResponse) => {
      let { response } = reqResponse

      tokensService.setAuthTokens(response.headers)
      await restaurantsStore.updateAndSetCurrent(response.data)
      contentsStore.setContent('RestaurantShowView')
    }
  )
}
</script>

<template>  
  <Errors :errors-store="restaurantFormErrorsStore" />
  
  <RestaurantForm :restaurant="contentRestaurant" :action-name="'Update'" label="Restaurant"
                    @form-submit="updatRestaurant" @cancel="showRestaurant" />
</template>
