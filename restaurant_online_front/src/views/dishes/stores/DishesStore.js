import { defineStore } from "pinia"
import { computed, ref } from "vue"
import dishApi from '../../services/api/model_api'
import tokensService from "../../services/tokensService";
import { useMenusStore } from '../../menus/stores/MenusStore';

export const useDishesStore = defineStore('dishesStore', () => {  
  const currentDish = ref({})
  const menusStore = useMenusStore()

  const dishes = computed(() => {
    return menusStore.currentMenu.dishes
  })

  const setDish = (dish) => {
    currentDish.value = dish
  }

  const currentMenu = computed(() => menusStore.currentMenu)

  const updateAndSetCurrent = async (dish) => {
    fetchDishes((response) => {
      if (!!dish)
        currentDish.value = response.data.filter(m => m.id === dish.id)[0]
    })
  }

  const fetchDishes = async (callback) => {
    let args = { 
      getUrl: `http://localhost:3000/menus/${currentMenu.value.id}/dishes?`,
      requestOptions: { 
        headers: tokensService.auth_headers()
      }
    }

    let { 
      response, 
      isSuccessful 
    } = await dishApi.apiIndexModels(args)
    
    if (isSuccessful) {
      menusStore.currentMenu.dishes = response.data
      callback(response)
    }
  }

  return { 
    currentDish, 
    dishes,
    setDish, 
    updateAndSetCurrent,
    fetchDishes
  }
})