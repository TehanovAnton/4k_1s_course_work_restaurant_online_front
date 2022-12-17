import axios from 'axios';
import { errorshandler, isSuccessful, setHeadersIfSuccessful } from '../../services/common_methods';
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

const responseHandler = (response) => {
  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

export default {
  apiGetOrderMessges,
  apiPostOrderMessges
}