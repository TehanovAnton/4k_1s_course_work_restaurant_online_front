import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useRestaurantsStore } from '../../restaurants/stores/RestaurantsStore'


export const useBasketsStore = defineStore('basketsStore', () => {
  const restaurantsStore = useRestaurantsStore()
  const currentRestaurantId = computed(() => restaurantsStore.currentRestaurant.id)

  const initBaskets = () => {
    let sessionBaskets = sessionStorage.getItem('baskets')
    if (!!sessionBaskets)
      return JSON.parse(sessionBaskets)

    return []
  }
  const baskets = ref(initBaskets())

  const updateSessionBaskets = (callBack) => {
    if (!!!currentRestaurantId.value)
      return

    callBack()
    
    sessionStorage.setItem('baskets', JSON.stringify(baskets.value))
  }

  const addDish = (dish) => {
    updateSessionBaskets(() => {
      if (baskets.value.length == 0) {
        let initBasket = {
          restaurantId: currentRestaurantId.value,
          dishes: [{ dish_id: dish.id }]
        }

        return baskets.value.push(initBasket)
      }

      baskets.value = baskets.value.map(basket => {
        if (basket.restaurantId === currentRestaurantId.value)
          basket.dishes.push({ dish_id: dish.id })

        return basket
      })
    })
  }

  const removeDish = (dish) => {
    updateSessionBaskets(() => {
      if (baskets.value.length == 0)
        return

      baskets.value = baskets.value.map(basket => {
        if (basket.restaurantId === currentRestaurantId.value)
          basket.dishes = basket.dishes.filter(d => d.dish_id !== dish.id)

        return basket
      })
    })
  }
  
  return {
    baskets,
    addDish,
    removeDish
  }
})