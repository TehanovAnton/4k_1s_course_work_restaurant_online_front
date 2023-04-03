import { defineStore } from "pinia"
import { ref } from "vue"
import menuservice from '../../services/menus/menu_service';
import tokensService from "../../services/tokensService";

export const useMenusStore = defineStore('menusStore', () => {  
  const currentMenu = ref({})
  const menus = ref([])

  const setMenu = (menu) => {
    currentMenu.value = menu
  }

  const updateAndSetCurrent = async (menu) => {
    fetchMenus((response) => {
      currentMenu.value = response.data.filter(r => r.id === menu.id)[0]
    })
  }

  const fetchMenus = async (callback) => {
    let { response, isSuccessful } = await menuservice.apiIndexMenus(tokensService.auth_headers())

    if (isSuccessful) {
      tokensService.setAuthTokens(response.headers)
      menus.value = response.data

      callback(response)
    }
  }

  return { 
    currentMenu, 
    menus, 
    setMenu, 
    updateAndSetCurrent,
    fetchMenus
  }
})