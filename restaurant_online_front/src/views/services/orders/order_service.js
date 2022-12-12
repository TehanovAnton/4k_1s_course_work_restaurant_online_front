import axios from 'axios';
import { errorshandler, isSuccessful, setHeadersIfSuccessful } from '../../services/common_methods';
import tokensService from '../../services/tokensService';

const apiIndexOrders = async (userId) => {
  let response = await axios.get(`http://localhost:3000/users/${userId}/orders`,
                                 { headers: tokensService.auth_headers() })
                            .catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)
  
  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiGetOrder = async (orderId) => {  
  let response = await axios.get(`http://localhost:3000/orders/${orderId}`,
                                 { headers: tokensService.auth_headers() })
                            .catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)
  
  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCreateOrder = async (order) => {
  let createUrl = `http://localhost:3000/users/${order.user_id}/orders`
  let data = order
    
  let response = await axios.post(
    createUrl,
    data,
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)
  
  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCanUpdateOrder = async (order) => {
  let canUpdateUrl = `http://localhost:3000/orders/${order.id}/can_update`
    
  let response = await axios.get(
    canUpdateUrl, 
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCanDestroyOrder = async (order) => {
  let canDeleteUrl = `http://localhost:3000/orders/${order.id}/can_destroy`
    
  let response = await axios.get(
    canDeleteUrl, 
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCanCreateOrder = async (user) => {
  let canCreateUrl = `http://localhost:3000/users/${user.id}/orders/can_create`
    
  let response = await axios.get(
    canCreateUrl, 
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}


const can = async (action, public_actions, record) => {
  let response
  
  if (action == 'create') {
    response = await apiCanCreateOrder(record)
  } else if (action == 'update') {
    response = await apiCanUpdateOrder(record)
  } else if (action == 'destroy') {
    response = await apiCanDestroyOrder(record)
  }
   else if (public_actions.includes(action)) {
    return true
  }
  
  if (response.response.status == 401) {
    router.push({ name: 'sign_in' })
    return
  }  
  
  if (response.isSuccessful) {
    return !!response.response.data
  }

  return false
}

export default {
  apiGetOrder,
  apiIndexOrders,
  apiCreateOrder,
  can
}
