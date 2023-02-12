import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useSelectedModeStore = defineStore('selectedMode', () => {  
  const selectedMode = ref('index')

  const setSelectedMenuMode = (menuMode) => {
    selectedMode.value = menuMode
  }

  const getSelectedMenuMode = computed(() => {
    return selectedMode.value
  })

  return { setSelectedMenuMode, getSelectedMenuMode, selectedMode }
})