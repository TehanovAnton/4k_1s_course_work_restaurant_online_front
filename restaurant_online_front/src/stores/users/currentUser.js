import { defineStore } from "pinia"
import { computed, ref } from "vue"
import auth_service from "../../views/services/auth_service"

export const useCurrentUserStore = defineStore('currentUser', () => {  
  const user = computed(() => {
    return JSON.parse(sessionStorage.getItem('current-user'))
  })

  const setCurrentUser = (user) => {
    if (user)
      sessionStorage.setItem('current-user', JSON.stringify(user))
  }

  const apiSignOut = async () => {
    await auth_service.apiSignOut()
  }
  
  return { setCurrentUser, apiSignOut, user }
})