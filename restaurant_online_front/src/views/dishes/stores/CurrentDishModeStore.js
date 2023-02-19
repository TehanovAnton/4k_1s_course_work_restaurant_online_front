
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCurrentDishModeStore = defineStore('CurrentDishMode', () => {
  const defaultDishMode = 'index'
  const modes = ['index', 'create', 'edit', 'delete']
  const currentDishMode = ref(defaultDishMode)

  const setCurrentDishMode = (dishMode) => {
    currentDishMode.value = dishMode
  }

  const getCurrentDishMode = computed(() => {
    debugger 
    return currentDishMode ? currentDishMode : defaultDishMode
  })

  return { 
    setCurrentDishMode, 
    getCurrentDishMode,
    modes
  }
})