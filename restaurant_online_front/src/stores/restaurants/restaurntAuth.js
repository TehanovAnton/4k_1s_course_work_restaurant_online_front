import { defineStore } from "pinia"
import { useCurrentUserStore } from "../users/currentUser"
const currentUserStore = useCurrentUserStore()

export const useRestaurantAuthStore = defineStore('restaurantAuth', () => {
  
  function canCreate() {
    return currentUserStore.user == 'SuperAdmin'
  }

  function canUpdateDelete(restaurant) {
    
  }

  return { can }
})