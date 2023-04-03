import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useContentsStore = defineStore('contentsStore', () => {  
  const currentContent = ref('RestaurantIndexView')
  const setContent = (content) => {
    currentContent.value = content
  }

  return { currentContent, setContent }
})