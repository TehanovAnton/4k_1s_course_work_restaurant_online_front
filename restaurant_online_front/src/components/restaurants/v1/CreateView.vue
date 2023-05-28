<script setup>
  import { computed, ref } from 'vue';
  import RestaurantForm from '../../RestaurantForm.vue';
  import Errors from '../../errors/Errors.vue';
  import restaurant_service from '../../../views/services/restaurants/restaurant_service';
  import tokensService from '../../../views/services/tokensService';
  import { useRestaurantFormErrorsStore } from '../../../views/restaurants/stores/RestaurantFormErrorsStore';
  import { useContentsStore } from '../../../views/restaurants/stores/ContentsStore';
  import { useRestaurantsStore } from '../../../views/restaurants/stores/RestaurantsStore';  
  import { useCurrentUserStore } from '../../../stores/users/currentUser';
  import { CacncelToRestaurant } from '../../../views/services/cancele/CancelToRestaurant';

  const contentsStore = useContentsStore()
  const restaurantsStore = useRestaurantsStore()
  const currentUserStore = useCurrentUserStore()
  const restaurantFormErrorsStore = useRestaurantFormErrorsStore()

  const currentUser = computed(() => {
    return currentUserStore.user
  })

  const restaurant = ref({
    id: '',
    email: '',
    address: '',
    phone: '',
    companies_restaurant_attributes: { company_id: currentUser.value.company_id }
  })

  const createRestaurant = async (restaurant) => {
    restaurant.updateAttributes.restaurants_admins_attributes = [{ user_id: currentUserStore.user.id }]
    await restaurant_service.apiCreateRestaurants(
      tokensService.auth_headers(),
      restaurant.updateAttributes,
      restaurantFormErrorsStore,
      (reqResponse) => {
        let { response } = reqResponse
        restaurantsStore.currentRestaurant
        restaurantsStore.updateAndSetCurrent(response.data)
        contentsStore.setContent('RestaurantShowView')
      }
    )
  }

  const showRestaurants = () => {
    new CacncelToRestaurant().cancel()
  }
</script>

<template>
  <Errors :errors-store="restaurantFormErrorsStore" />

  <RestaurantForm action-name="Create" :restaurant="restaurant" label="New Restaurant"
                  @form-submit="createRestaurant" @cancel="showRestaurants" />
</template>
