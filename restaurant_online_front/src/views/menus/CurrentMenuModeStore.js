
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCurrentMenuModeStore = defineStore('CurrentMenuMode', () => {
  const defaultMenuMode = 'index'
  const modes = ['index', 'create', 'edit', 'delete']
  const preferFromSelect = ref(false)
  const currentMenuMode = ref(defaultMenuMode)

  const setCurrentMenuMode = (menuMode, fromSelect = false) => {
    currentMenuMode.value = menuMode
    preferFromSelect.value = fromSelect
  }

  const getCurrentMenuMode = computed(() => {
    return currentMenuMode ? currentMenuMode : defaultMenuMode
  })

  return { 
    setCurrentMenuMode, 
    getCurrentMenuMode, 
    preferFromSelect,
    modes
  }
})