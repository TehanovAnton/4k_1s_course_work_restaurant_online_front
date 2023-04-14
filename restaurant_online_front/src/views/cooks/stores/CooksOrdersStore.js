import { defineStore } from "pinia"
import { computed, ref } from "vue"
import tokensService from "../../services/tokensService";
import orders_service from '../../services/orders/order_service';
import { useRestaurantsStore } from '../../restaurants/stores/RestaurantsStore';
import { useCurrentUserStore } from '../../../../src/stores/users/currentUser'

export const useCooksOrdersStore = defineStore('cooksOrdersStore', () => {
  const currentUserStore = useCurrentUserStore()
  const orders = ref([])

  const fetchOders = async (callback) => {
    let { response, isSuccessful } = await orders_service.apiIndexCooksOrders(currentUserStore.user.restaurant.id)

    if (isSuccessful) {
      tokensService.setAuthTokens(response.headers)
      orders.value = response.data

      callback(response)
    }
  }

  const updateOrders = async () => {
    fetchOders((_response) => {})
  }

  const updateOrder = (updatedOrder) => {
    orders.value = orders.value.map((order) => {
      if (order.id === updatedOrder.id) {
        return updatedOrder
      }

      return order
    })
  }

  return {
    orders,
    fetchOders,
    updateOrders,
    updateOrder
  }
})