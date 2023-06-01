import { defineStore } from "pinia"
import { computed, ref } from "vue"
import auth_service from "../../views/services/auth_service"
import user_service  from '../../views/services/users/user_service'
import tokensService from "../../views/services/tokensService"

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

  const updateUser = async () => {
    let userResponse = await user_service.apiShowUser(tokensService.auth_headers(), user.value.id)
    setCurrentUser(userResponse.response.data)
  }
  
  return {
    setCurrentUser,
    apiSignOut,
    user,
    updateUser
  }
})