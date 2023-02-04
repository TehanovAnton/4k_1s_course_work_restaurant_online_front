import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCurrentMenuIdStore = defineStore('currentMenuId', () => {  
  const currentMenuId = ref(false)

  const setCurrentMenuId = (menuId) => {
    debugger
    currentMenuId.value = menuId
  }

  const getCurrentMenuId = computed(() => {
    return currentMenuId ? currentMenuId : 0
  })

  return { setCurrentMenuId, getCurrentMenuId }
})