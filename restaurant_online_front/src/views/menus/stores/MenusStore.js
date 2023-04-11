import { defineStore } from "pinia"
import { computed, ref } from "vue"
import menuservice from '../../services/menus/menu_service';
import tokensService from "../../services/tokensService";
import { useRestaurantsStore } from '../../restaurants/stores/RestaurantsStore';

export const useMenusStore = defineStore('menusStore', () => {  
  const currentMenu = ref({})
  const restaurantsStore = useRestaurantsStore()

  const menus = computed(() => {
    return restaurantsStore.currentRestaurant.menus
  })

  const setMenu = (menu) => {
    currentMenu.value = menu
  }

  const updateAndSetCurrent = async (menu, options = {}) => {
    fetchMenus((response) => {
        currentMenu.value = response.data.filter(m => m.id === menu.id)[0]
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

  return { 
    currentMenu, 
    menus,
    allDishes,
    menusExists,
    setMenu, 
    updateAndSetCurrent,
    fetchMenus
  }
})