
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCurrentDishModeStore = defineStore('CurrentDishMode', () => {
  const defaultDishMode = 'index'
  const modes = ['index', 'create', 'edit', 'delete']
  const currentDishMode = ref(defaultDishMode)

  const setCurrentMode = (dishMode) => {
    currentDishMode.value = dishMode
  }

  const getCurrentMode = computed(() => {
    return currentDishMode ? currentDishMode : defaultDishMode
  })

  return { 
    setCurrentMode, 
    getCurrentMode,
    modes
  }
})