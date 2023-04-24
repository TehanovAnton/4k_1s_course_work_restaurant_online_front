import { defineStore } from "pinia"
import { computed, ref } from "vue"
import menuservice from '../../services/menus/menu_service';
import tokensService from "../../services/tokensService";
import { useRestaurantsStore } from '../../restaurants/stores/RestaurantsStore';
import { OwnService } from "../../services/owns/ownService";
import { ModelsStoreHelper } from "../../restaurants/stores/ModelsStoreHelper";
import { SessionObject } from "../../restaurants/stores/SessionObject";

export const useMenusStore = defineStore('menusStore', () => {
  const ownService = new OwnService()
  const sessionObject = new SessionObject('menu', {})

  const currentMenu = ref(sessionObject.initObject())
  const restaurantsStore = useRestaurantsStore()
  const modelsStore = new ModelsStoreHelper()

  const menus = computed(() => {
    return restaurantsStore.currentRestaurant.menus
  })

  const findMenu = (menu) => {
    return modelsStore.findModel(menus.value, menu)
  }

  const fetchMenus = async (callback, options = {}) => {
    await modelsStore.fetchModels(
      async () => {
        return await menuservice.apiIndexMenus(
          tokensService.auth_headers(),
          restaurantsStore.currentRestaurant.id,
          options
        )
      },
      (response) => callback(response)
    )
  }

  const setMenu = (menu) => {
    sessionObject.updateSessionObjectContent(
      modelsStore.currentModelExists(currentMenu.value),
      () => modelsStore.currentModelJsonData(currentMenu.value),
      () => currentMenu.value = menu
    )
  }

  const updateAndSetCurrent = async (menu, options = {}) => {
    fetchMenus((response) => {
        restaurantsStore.currentRestaurant.menus = response.data
        restaurantsStore.setModel(restaurantsStore.currentRestaurant)

        let findedMenu = modelsStore.findModel(menus.value, menu)
        setMenu(findedMenu)
      },
      options
    )
  }

  const allDishes = computed(() => {
    let dishes = []
    menus.value.forEach(menu => dishes = dishes.concat(menu.dishes));
    return dishes
  })
  
  const menusExists = computed(() => {
    if (!!!menus.value)
      return false

    return menus.value.length > 0
  })

  const userMenus = (user) => {
    let userModels = restaurantsStore.userModels(user),
        userRestaurantsMenus = []

    userModels.forEach(restaurant => {
      restaurant.menus.forEach(menu => userRestaurantsMenus.push(menu))
    })
  
    return userRestaurantsMenus
  }

  const ownMenu = (menu, user) => {
    if (!ownService.ownModel(restaurantsStore.currentRestaurant, user, restaurantsStore.userModels(user)))
      return false

    return ownService.ownModel(menu, user, menus.value)
  }

  return { 
    currentMenu, 
    menus,
    allDishes,
    menusExists,
    findMenu,
    userMenus,
    ownMenu,
    setMenu, 
    updateAndSetCurrent,
    fetchMenus
  }
})