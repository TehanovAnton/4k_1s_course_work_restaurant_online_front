import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useContentsStore = defineStore('contentsStore', () => {  
  const sessionObjectkey = 'contetn'

  const sessionObject = (sessionData) => {
    return JSON.parse(sessionData).content
  }

  const sessionOBjectContent = () => {
    return sessionStorage.getItem(sessionObjectkey)
  }

  const defaultSessionObject = () => {
    return 'RestaurantsIndexView'
  }

  const initObject = () => {
    let sessionData = sessionOBjectContent()
    if (!!sessionData)
      return sessionObject(sessionData)

    return defaultSessionObject()
  }

  const currentContent = ref(initObject())
  const contentArgs = ref({})

  const currentObjectExists = () => {
    return !!currentContent.value
  }

  const sessionObjectJsonData = () => {
    return JSON.stringify({ content: currentContent.value})
  }

  const updateSessionContent = (callBack) => {
    if (!currentObjectExists())
      return

    callBack()
    
    sessionStorage.setItem(sessionObjectkey, sessionObjectJsonData())
  }

  const setContent = (content, args) => {
    updateSessionContent(() => {
      contentArgs.value = args
      currentContent.value = content
    })    
  }

  return { currentContent, setContent, contentArgs }
})