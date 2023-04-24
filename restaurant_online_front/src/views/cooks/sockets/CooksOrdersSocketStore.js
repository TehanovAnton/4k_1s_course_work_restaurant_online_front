import { defineStore } from "pinia"
import order_service from '../../services/orders/order_service'
import { useCooksOrdersStore } from '../stores/CooksOrdersStore'
import { SocketService } from "../../services/sockets/SocketService"

export const useCooksOrdersSocketStore = defineStore('cooksOrdersSocketStore', () => {
  const ordersStore = useCooksOrdersStore()

  const socketService = new SocketService(
    ordersStore,
    'ws://localhost:3000/cable',
    "CooksOrdersChannel",
    "cooks_orders_channel",
    'order'
  )

  socketService.bindSocket()

  const udpateTransition = async (orderStateId, orderState) => {
    await order_service.apiUpdateOrderState(orderStateId, orderState)
  }

  return {
    udpateTransition
  }
})
