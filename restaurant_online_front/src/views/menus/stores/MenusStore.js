import { defineStore } from "pinia"
import { computed, ref } from "vue"
import menuservice from '../../services/menus/menu_service';
import tokensService from "../../services/tokensService";
import { useRestaurantsStore } from '../../restaurants/stores/RestaurantsStore';
import { OwnService } from "../../services/owns/ownService";

export const useMenusStore = defineStore('menusStore', () => {
  const ownService = new OwnService()

  const sessionObjectkey = 'menu'

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

  const currentMenu = ref(initObject())
  const restaurantsStore = useRestaurantsStore()

  const menus = computed(() => {
    return restaurantsStore.currentRestaurant.menus
  })

  const currentObjectExists = () => {
    return !!currentMenu.value
  }

  const sessionObjectJsonData = () => {
    return JSON.stringify(currentMenu.value)
  }

  const updateSessionObjectContent = (callBack) => {
    if (!currentObjectExists())
      return

    callBack()
    
    sessionStorage.setItem(sessionObjectkey, sessionObjectJsonData())
  }

  const findMenu = (menu) => {
    return menus.value.find((m) => m.id === menu.id)
  }

  const setMenu = (menu) => {
    updateSessionObjectContent(() => {
      let findedMenu = findMenu(menu)
      currentMenu.value = findedMenu
    })
  }

  const updateAndSetCurrent = async (menu, options = {}) => {
    fetchMenus((response) => {
        let findedMenu = response.data.filter(m => m.id === menu.id)[0]

        if (findedMenu)
          setMenu(findedMenu)
      },
      options
    )
  }

  const fetchMenus = async (callback, options = {}) => {
    let { response, isSuccessful } = await menuservice.apiIndexMenus(tokensService.auth_headers(),
                                                                     restaurantsStore.currentRestaurant.id,
                                                                     options)
    if (isSuccessful) {
      tokensService.setAuthTokens(response.headers)
      restaurantsStore.currentRestaurant.menus = response.data

      callback(response)
    }
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