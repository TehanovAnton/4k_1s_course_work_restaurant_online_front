import axios from 'axios';
import { errorshandler, isSuccessful, setHeadersIfSuccessful, responseHandler } from '../../services/common_methods';
import tokensService from '../../services/tokensService';

const apiGetOrderMessges = async (orderId) => {
  let response = await axios.get(`${import.meta.env.VITE_BACK_HOST}/orders/${orderId}/order_messages`,
    { headers: tokensService.auth_headers() })
  .catch(errorshandler)  

  return responseHandler(response)
}

const apiPostOrderMessges = async (orderId, message) => {
  let data = message  
  let response = await axios.post(`${import.meta.env.VITE_BACK_HOST}/orders/${orderId}/post_message`,
    data,
    { headers: tokensService.auth_headers() })
  .catch(errorshandler)

  return responseHandler(response)
}

const apiDeleteOrderMessge = async (orderId, messageId) => {
  let data = { message_id:messageId }
  let response = await axios.delete(`${import.meta.env.VITE_BACK_HOST}/orders/${orderId}/delete_message`,
    {
      headers: tokensService.auth_headers(),
      data: data
    }
  ).catch(errorshandler)

  return responseHandler(response)
}

const apiGetRestaurantMessges = async (restaurantId) => {
  let response = await axios.get(`${import.meta.env.VITE_BACK_HOST}/restaurants/${restaurantId}/restaurant_messages`,
    { headers: tokensService.auth_headers() })
  .catch(errorshandler)  

  return responseHandler(response)
}

const apiPostRestaurantMessges = async (restaurantId, message) => {
  let data = message  
  let response = await axios.post(`${import.meta.env.VITE_BACK_HOST}/restaurants/${restaurantId}/post_message`,
    data,
    { headers: tokensService.auth_headers() })
  .catch(errorshandler)

  return responseHandler(response)
}

const apiDeleteRestaurantMessage = async (restaurantId, messageId) => {
  let data = { message_id:messageId }
  let response = await axios.delete(`${import.meta.env.VITE_BACK_HOST}/restaurants/${restaurantId}/delete_message`,
    {
      headers: tokensService.auth_headers(),
      data: data
    }
  ).catch(errorshandler)

  return responseHandler(response)
}


export default {
  apiGetOrderMessges,
  apiDeleteOrderMessge,
  apiPostOrderMessges,
  apiGetRestaurantMessges,
  apiPostRestaurantMessges,
  apiDeleteRestaurantMessage
}