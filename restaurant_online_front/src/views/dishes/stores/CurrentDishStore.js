import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCurrentDishIdStore = defineStore('currentDishId', () => {  
  const currentDishId = ref(0)

  const setCurrentDishId = (menuId) => {
    currentDishId.value = menuId
  }

  const getCurrentDishId = computed(() => {
    return currentDishId ? currentDishId : 0
  })

  return { setCurrentDishId, getCurrentDishId }
})