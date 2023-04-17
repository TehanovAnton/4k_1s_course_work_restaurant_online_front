import { defineStore } from "pinia"
import { computed, ref } from "vue"
import restaurantService from '../../../views/services/restaurants/restaurant_service';
import tokensService from "../../services/tokensService";
import { useCurrentUserStore } from '../../../stores/users/currentUser'
import { OwnService } from "../../services/owns/ownService";

export const useRestaurantsStore = defineStore('restaurantsStore', () => {  
  const currentUserStore = useCurrentUserStore()
  const sessionObjectkey = 'restaurant'
  const ownService = new OwnService()

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

  const currentUserRestaurants = computed(() => {
    return restaurants.value.filter(r => {
      return r.restaurants_admins.find(ra => {
        return ra.user_id === currentUserStore.user.id
      })
    })
  })

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
      let findedRest = restaurants.value.find((r) => r.id === restaurant.id)
      currentRestaurant.value = findedRest
    })
  }

  const findRestaurant = (restaurantsCollection, restaurant) => {
    let foundedRestaurant = restaurantsCollection.find(r => r.id === restaurant.id)

    if (!!!foundedRestaurant)
      foundedRestaurant = restaurantsCollection[0]

    return foundedRestaurant
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

  const userRestaurants = (user) => {
    return restaurants.value.filter(r => {
      return r.restaurants_admins.find(ra => {
        return ra.user_id === user.id
      })
    })
  }

  const ownRestaurant = (restaurant, user) => {
    return ownService.ownModel(restaurant, user, userRestaurants(user))
  }

  return { 
    currentRestaurant, 
    restaurants,
    currentUserRestaurants,
    userRestaurants,
    ownRestaurant,
    findRestaurant,
    setRestaurant, 
    updateAndSetCurrent,
    fetchRestaurants
  }
})