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
  const currentOrder = ref({})

  const fetchOders = async (callback) => {
    let { response, isSuccessful } = await orders_service.apiIndexOrders(currentUserStore.user.id)

    if (isSuccessful) {
      tokensService.setAuthTokens(response.headers)
      orders.value = response.data

      callback(response)
    }
  }

  const order = computed(() => {
    return currentOrder.value
  })

  const setOrder = (order) => {
    currentOrder.value = order
  }

  const updateOrders = async () => {
    fetchOders((_response) => {})
  }

  const restaurantOrders = (restaurant) => {
    let userRestaurantOrders = orders.value.filter(order => {
      return order.restaurant_id == restaurant.id
    })

    return userRestaurantOrders
  }

  const currentRestaurantOrders = computed(() => {
    return restaurantOrders(restaurantsStore.currentRestaurant)
  })

  const updateModel = (updatedOrder) => {
    orders.value = orders.value.map((order) => {
      if (order.id === updatedOrder.id) {
        return updatedOrder
      }

      return order
    })
  }

  return {
    orders,
    order,
    currentRestaurantOrders,
    updateModel,
    restaurantOrders,
    setOrder,
    fetchOders,
    updateOrders
  }
})