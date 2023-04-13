<script setup>
  import { ref } from 'vue';
  import RestaurantForm from '../../RestaurantForm.vue';
  import restaurant_service from '../../../views/services/restaurants/restaurant_service';
  import { useContentsStore } from '../../../views/restaurants/stores/ContentsStore';
  import { useRestaurantsStore } from '../../../views/restaurants/stores/RestaurantsStore';
  import tokensService from '../../../views/services/tokensService';
  import { useCurrentUserStore } from '../../../stores/users/currentUser';

  const contentsStore = useContentsStore()
  const restaurantsStore = useRestaurantsStore()
  const currentUserStore = useCurrentUserStore()

  const restaurant = ref({
    id: '',
    email: '',
    address: '',
    phone: ''
  })

  const createRestaurant = async (restaurant) => {
    restaurant.updateAttributes.restaurants_admins_attributes = [{ user_id: currentUserStore.user.id }]
    let { isSuccessful, response } = await restaurant_service.apiCreateRestaurants(tokensService.auth_headers(), restaurant.updateAttributes)

    if (isSuccessful) {
      restaurantsStore.currentRestaurant
      restaurantsStore.updateAndSetCurrent(response.data)
      contentsStore.setContent('RestaurantShowView')
    }
  }

  const showRestaurants = () => {
    contentsStore.setContent('RestaurantsIndexView')
  }
</script>

<template>
  <div class="create-rest">
    <RestaurantForm action-name="Create" :restaurant="restaurant" label="New Restaurant"
                  @form-submit="createRestaurant" @cancle="showRestaurants" />
  </div>
</template>

<style>
.create-rest {
  display: flex;
  justify-content: space-around;
}
</style>