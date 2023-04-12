import { defineStore } from "pinia"
import { ref } from "vue"
import restaurantService from '../../../views/services/restaurants/restaurant_service';
import tokensService from "../../services/tokensService";

export const useRestaurantsStore = defineStore('restaurantsStore', () => {  
  const sessionObjectkey = 'restaurant'

  const sessionObject = (sessionData) => {
    return JSON.parse(sessionData)
  }

  const sessionOBjectContent = () => {
    return sessionStorage.getItem(sessionObjectkey)
  }

  const defaultSessionObject = () => {
    return {}
  }

  const initObject = () => {
    let sessionData = sessionOBjectContent()
    if (!!sessionData)
      return sessionObject(sessionData)

    return defaultSessionObject()
  }

  const currentRestaurant = ref(initObject())
  const restaurants = ref([])

  const currentObjectExists = () => {
    return !!currentRestaurant.value
  }

  const sessionObjectJsonData = () => {
    return JSON.stringify(currentRestaurant.value)
  }

  const updateSessionObjectContent = (callBack) => {
    if (!currentObjectExists())
      return

    callBack()
    
    sessionStorage.setItem(sessionObjectkey, sessionObjectJsonData())
  }

  const setRestaurant = (restaurant) => {
    updateSessionObjectContent(() => { 
      currentRestaurant.value = restaurant
    })
  }

  const updateAndSetCurrent = async (restaurant) => {
    fetchRestaurants((response) => {
      let foundedRestaurant = response.data.filter(r => r.id === restaurant.id)[0]
      setRestaurant(foundedRestaurant)
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