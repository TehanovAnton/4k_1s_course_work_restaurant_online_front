import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useContentsStore = defineStore('contentsStore', () => {  
  const currentContent = ref('RestaurantsIndexView')
  const contentArgs = ref({})

  const setContent = (content, args) => {
    contentArgs.value = args
    currentContent.value = content
  }

  return { currentContent, setContent, contentArgs }
})