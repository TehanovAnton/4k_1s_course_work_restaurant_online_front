import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useActiveRestaurant = defineStore('activeRestaurant', () => {
  const value = ref({})
  
  const setActiveRestaurant = (restaurant) => {
    value.value = restaurant
  }

  return { value, setActiveRestaurant }
})
