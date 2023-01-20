import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useMenuIndexStore = defineStore('menuInded', () => {  
  const menu = ref({})
  const restaurant = ref({})

  const setMenu = (fetchedMenu) => {
    menu.value = fetchedMenu
  }

  const setRestaurant = (fetchedRestaurant) => {
    restaurant.value = fetchedRestaurant
  }

  return { setMenu, setRestaurant, menu, restaurant }
})