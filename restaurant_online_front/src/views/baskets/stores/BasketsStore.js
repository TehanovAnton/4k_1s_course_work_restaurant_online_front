import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useRestaurantsStore } from '../../restaurants/stores/RestaurantsStore'
import { useMenusStore } from "../../menus/stores/MenusStore"


export const useBasketsStore = defineStore('basketsStore', () => {
  const restaurantsStore = useRestaurantsStore()
  const menusStore = useMenusStore()
  const currentRestaurantId = computed(() => restaurantsStore.currentRestaurant.id)

  const initBaskets = () => {
    let sessionBaskets = sessionStorage.getItem('baskets')
    if (!!sessionBaskets)
      return JSON.parse(sessionBaskets)

    return []
  }
  const baskets = ref(initBaskets())

  const currentBasket = computed(() => {
    let basket = baskets.value.filter(basket => basket.restaurantId === currentRestaurantId.value)[0]
    if (!!basket)
      return basket

    return {}
  })

  const dishes = computed(() => {
    if (baskets.value.length === 0 || !!!currentBasket.value || !!!currentBasket.value.dishes)
      return []

    let baketDishes = menusStore.allDishes.filter(dish => {
      let baketDishesIds = currentBasket.value.dishes.map(d => d.dish_id)
      if (baketDishesIds.includes(dish.id))
        return dish
    })

    return baketDishes
  })

  const basketDishesPrice = computed(() => {
    let price = 0

    dishes.value.forEach(dish => {
      price += parseInt(dish.price_cents) * basketDishCount(dish)
    })

    return price
  })

  const updateSessionBaskets = (callBack) => {
    if (!!!currentRestaurantId.value)
      return

    callBack()
    
    sessionStorage.setItem('baskets', JSON.stringify(baskets.value))
  }

  const currentBasketUpdate = (callBack) => {
    baskets.value = baskets.value.map(basket => {
      if (basket.restaurantId === currentRestaurantId.value)
        callBack(basket)

      return basket
    })
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

      currentBasketUpdate((basket) => {
        basket.dishes.push({ dish_id: dish.id })
      })
    })
  }

  const removeDish = (dish) => {
    updateSessionBaskets(() => {
      if (baskets.value.length == 0)
        return

      currentBasketUpdate((basket) => {
        basket.dishes = basket.dishes.filter(d => d.dish_id !== dish.id)
      })
    })
  }

  const basketDishCount = (dish) => {
    if (!!!currentBasket.value || !!!currentBasket.value.dishes)
      return 0
  
    let dishes = currentBasket.value.dishes.filter(d => d.dish_id === dish.id)
    return dishes.length
  }

  const incBasketDishCount = (dish) => {
    addDish(dish)
  }

  const decrementBasketDishCount = (dish) => {
    updateSessionBaskets(() => {
      currentBasketUpdate(basket => {
        let dishIndex = currentBasket.value.dishes.findIndex(d => d.dish_id == dish.id)
        basket.dishes.splice(dishIndex, 1)
      })
    })
  }

  const clearBasket = () => {
    updateSessionBaskets(() => {
      currentBasketUpdate((basket) => {
        basket.dishes = []
      })
    })
  }
  
  return {
    baskets,
    dishes,
    currentBasket,
    basketDishesPrice,
    clearBasket,
    addDish,
    removeDish,
    basketDishCount,
    incBasketDishCount,
    decrementBasketDishCount
  }
})