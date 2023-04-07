import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useBasketsStore = defineStore('basketsStore', () => {
  const currentBasket = ref({
    restaurant_id:'', 
    basketDishes: []
  })

  const addDish = (dish) => {
    currentBasket.value.basketDishes.push({ dish_id: dish.id })
  }

  const removeDish = (dish) => {
    let clearedBasketdishes = currentBasket.value.basketDishes.filter(basketDish => {
      return basketDish.dish_id !== dish.id
    })


    currentBasket.value.basketDishes = clearedBasketdishes
  }
  
  return {
    currentBasket,
    addDish,
    removeDish
  }
})