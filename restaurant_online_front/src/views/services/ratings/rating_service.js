import axios from 'axios';
import { errorshandler, isSuccessful, setHeadersIfSuccessful } from '../../services/common_methods';
import tokensService from '../../services/tokensService';

const apiPostRating = async (orderId, rating) => {
  let createUrl = `${import.meta.env.VITE_BACK_HOST}/orders/${orderId}/post_rating`
  let data = rating

  let response = await axios.post(
    createUrl,
    data,
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)
  
  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiDestroyRating = async (orderId) => {
  let destroyUrl = `${import.meta.env.VITE_BACK_HOST}/orders/${orderId}/destroy_rating`

  let response = await axios.delete(
    destroyUrl,
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)
  
  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

export default {
  apiPostRating,
  apiDestroyRating
}
