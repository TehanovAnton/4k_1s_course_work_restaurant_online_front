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
  <div class="edit-restaurant">
    <RestaurantForm :restaurant="contentRestaurant" :action-name="'Update'" label="Edit Restaurant"
                    @form-submit="updatRestaurant" @cancel="showRestaurant" />
  </div>
</template>

<style>
  .models-content-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .dish {
    background-color: darkgray;
    border-radius: 15px;
    padding: 15px;
    box-shadow: inset 0 0 5px 2px rgb(207, 168, 168);
    margin: 5px 0px 0 0px;
  }

  .edit-restaurant {
    display: flex;
    justify-content: space-around;
  }
</style>