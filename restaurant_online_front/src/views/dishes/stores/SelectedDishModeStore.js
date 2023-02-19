import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useSelectedModeStore = defineStore('SelectedDishModeStore', () => {  
  const selectedMode = ref('index')

  const setSelectedMode = (menuMode) => {
    selectedMode.value = menuMode
  }

  const getSelectedMode = computed(() => {
    return selectedMode.value
  })

  return { setSelectedMode, getSelectedMode, selectedMode }
})