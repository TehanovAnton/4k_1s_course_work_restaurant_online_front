import { defineStore } from "pinia"
import { computed, ref } from "vue"
import restaurantService from '../../../views/services/restaurants/restaurant_service';
import tokensService from "../../services/tokensService";
import { useCurrentUserStore } from '../../../stores/users/currentUser'
import { OwnService } from "../../services/owns/ownService";
import { ModelsStoreHelper } from "./ModelsStoreHelper";
import { SessionObject } from "./SessionObject";

export const useRestaurantsStore = defineStore('restaurantsStore', () => {  
  const currentUserStore = useCurrentUserStore()
  const ownService = new OwnService()
  const sessionObject = new SessionObject('restaurant', {})

  const currentRestaurant = ref(sessionObject.initObject())
  const restaurants = ref([])
  const modelsStore = new ModelsStoreHelper(restaurants, currentRestaurant)

  const userModels = (user) => {
    return modelsStore.modelsFilter(r => {
      return r.restaurants_admins.find(ra => {
        return ra.user_id === user.id
      })
    })
  }

  const currentUserModels = computed(() => {
    return userModels(currentUserStore.user)
  })

  const setModel = (model) => {
    modelsStore.setModel(sessionObject, model)
  }

  const findRestaurant = (modelsCollection, model) => {
    return modelsStore.findModel(modelsCollection, model)
  }  

  const fetchModels = async (callback) => {
    modelsStore.fetchModels(
      async () => restaurantService.apiIndexRestaurants(tokensService.auth_headers()),
      callback
    )
  }

  const updateAndSetCurrent = async (model) => {
    await fetchModels((response) => {
      let foundModel = response.data.find(m => m.id === model.id)
      setModel(foundModel)
    })
  }

  const ownRestaurant = (restaurant, user) => {
    return ownService.ownModel(restaurant, user, userModels(user))
  }

  return { 
    currentRestaurant, 
    restaurants,
    currentUserModels,
    userModels,
    ownRestaurant,
    findRestaurant,
    setModel, 
    updateAndSetCurrent,
    fetchModels
  }
})