import axios from 'axios';
import { errorshandler, isSuccessful, setHeadersIfSuccessful, responseHandler } from '../../services/common_methods';
import tokensService from '../../services/tokensService';

const apiGetOrderMessges = async (orderId) => {
  let response = await axios.get(`http://localhost:3000/orders/${orderId}/order_messages`,
    { headers: tokensService.auth_headers() })
  .catch(errorshandler)  

  return responseHandler(response)
}

const apiPostOrderMessges = async (orderId, message) => {
  let data = message  
  let response = await axios.post(`http://localhost:3000/orders/${orderId}/post_message`,
    data,
    { headers: tokensService.auth_headers() })
  .catch(errorshandler)

  return responseHandler(response)
}

const apiDeleteOrderMessge = async (orderId, messageId) => {
  let data = { message_id:messageId }
  let response = await axios.delete(`http://localhost:3000/orders/${orderId}/delete_message`,
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
  apiPostOrderMessges
}