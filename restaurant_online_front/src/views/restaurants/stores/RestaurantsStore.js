import { defineStore } from "pinia"
import { ref } from "vue"
import restaurantService from '../../../views/services/restaurants/restaurant_service';
import tokensService from "../../services/tokensService";

export const useRestaurantsStore = defineStore('restaurantsStore', () => {  
  const currentRestaurant = ref({})
  const restaurants = ref([])

  const setRestaurant = (restaurant) => {
    currentRestaurant.value = restaurant
  }

  const updateAndSetCurrent = async (restaurant) => {
    fetchRestaurants((response) => {
      currentRestaurant.value = response.data.filter(r => r.id === restaurant.id)[0]
    })
  }

  const fetchRestaurants = async (callback) => {
    let { response, isSuccessful } = await restaurantService.apiIndexRestaurants(tokensService.auth_headers())

    if (isSuccessful) {
      tokensService.setAuthTokens(response.headers)
      restaurants.value = response.data

      callback(response)
    }
  }

  return { 
    currentRestaurant, 
    restaurants, 
    setRestaurant, 
    updateAndSetCurrent,
    fetchRestaurants
  }
})