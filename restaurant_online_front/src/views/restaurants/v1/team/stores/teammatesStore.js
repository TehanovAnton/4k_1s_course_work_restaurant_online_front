import { defineStore } from "pinia";
import restaurant_service from '../../../../services/restaurants/restaurant_service'
import { useRestaurantsStore } from '../../../../restaurants/stores/RestaurantsStore'
import { ref } from "vue";
export const useTeammatesStore = defineStore('teammatesStore', () => {
  const teamates = ref([])

  const restaurantStore = useRestaurantsStore()

  const fetchTeammates = async () => {
    let restaurantId = restaurantStore.currentRestaurant.id

    await restaurant_service.apiRestaurantTeam(
      restaurantId,
      {},
      (response) => {
        teamates.value = response.data
      }
    )
  }

  return {
    teamates,
    fetchTeammates    
  }
})