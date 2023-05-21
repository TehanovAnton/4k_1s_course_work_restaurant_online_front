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
    let filter = (r) => {
      return r.restaurants_admins.find(ra => {
        return ra.user_id === user.id
      })
    }

    return modelsStore.modelsFilter(restaurants.value, filter)
  }

  const currentUserModels = computed(() => {
    return userModels(currentUserStore.user)
  })

  const setModel = (model) => {
    sessionObject.updateSessionObjectContent(
      modelsStore.currentModelExists(currentRestaurant.value),
      () => modelsStore.currentModelJsonData(currentRestaurant.value),
      () => currentRestaurant.value = model
    )
  }

  const findRestaurant = (modelsCollection, model) => {
    return modelsStore.findModel(modelsCollection, model)
  }
  
  const findByMenuId = (modelsCollection, menuId) => {
    return modelsStore.find(
      modelsCollection,
      (m) => !!m.menus.find(menu => menu.id === menuId )
    )
  }

  const fetchModels = async (callback) => {
    await modelsStore.fetchModels(
      async () => restaurantService.apiIndexRestaurants(tokensService.auth_headers()),
      callback
    )
  }

  const updateAndSetCurrent = async (model) => {
    await fetchModels((response) => {
      restaurants.value = response.data

      let foundModel = modelsStore.findModel(restaurants.value, model)
      setModel(foundModel)
    })
  }

  const ownRestaurant = (restaurant, user) => {
    return ownService.ownModel(restaurant, user, userModels(user))
  }

  const company = computed(() => {
    return currentRestaurant.value.company
  })

  return { 
    currentRestaurant, 
    restaurants,
    currentUserModels,
    company,
    findByMenuId,
    userModels,
    ownRestaurant,
    findRestaurant,
    setModel, 
    updateAndSetCurrent,
    fetchModels
  }
})