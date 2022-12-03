import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCurrentUserStore = defineStore('currentUser', () => {  
  const user = computed(() => {
    return JSON.parse(sessionStorage.getItem('current-user'))
  })

  const setCurrentUser = (user) => {
    if (user)
      sessionStorage.setItem('current-user', JSON.stringify(user))
  }

  return { setCurrentUser, user }
})