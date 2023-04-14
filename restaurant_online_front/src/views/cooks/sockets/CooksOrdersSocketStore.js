import { defineStore } from "pinia"
import order_service from '../../services/orders/order_service'
import { useCooksOrdersStore } from '../stores/CooksOrdersStore'

export const useCooksOrdersSocketStore = defineStore('cooksOrdersSocketStore', () => {
  const ordersStore = useCooksOrdersStore()
  const socket = new WebSocket('ws://localhost:3000/cable')

  socket.onopen = (_event) => {  
    const identifier = { 
      channel:"OrdersChannel", 
      room: "orders_channel",
    }

    const subscribedMsg = { 
      command:"subscribe", 
      identifier: JSON.stringify(identifier)
    }
    
    socket.send(JSON.stringify(subscribedMsg))
  }

  socket.onmessage = (event) => {
    let data = JSON.parse(event.data)    

    if (data.type == 'ping') {
      return
    }

    if (data.message) {
      let order = JSON.parse(data.message.order)
      ordersStore.updateOrder(order)
    }
  }

  const udpateTransition = async (orderStateId, orderState) => {
    await order_service.apiUpdateOrderState(orderStateId, orderState)
  }

  return {
    udpateTransition
  }
})
