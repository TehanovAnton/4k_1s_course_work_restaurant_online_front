import { defineStore } from "pinia"
import { computed, ref } from "vue"
import tokensService from "../../services/tokensService";
import orders_service from '../../services/orders/order_service';
import { useRestaurantsStore } from '../../restaurants/stores/RestaurantsStore';
import { useCurrentUserStore } from '../../../../src/stores/users/currentUser'

export const useOrdersStore = defineStore('ordersStore', () => {  
  const restaurantsStore = useRestaurantsStore()
  const currentUserStore = useCurrentUserStore()

  const orders = ref([])

  const fetchOders = async (callback) => {
    let { response, isSuccessful } = await orders_service.apiIndexOrders(currentUserStore.user.id)

    if (isSuccessful) {
      tokensService.setAuthTokens(response.headers)
      orders.value = response.data

      callback(response)
    }
  }

  const currentRestaurantOrders = computed(() => {
    let restaurantOrders = orders.value.filter(order => {
      return order.restaurant_id == restaurantsStore.currentRestaurant.id
    })

    return restaurantOrders
  })

  return {
    orders,
    currentRestaurantOrders,
    fetchOders
  }
})