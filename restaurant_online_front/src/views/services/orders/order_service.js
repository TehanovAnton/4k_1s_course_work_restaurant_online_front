import axios from 'axios';
import { errorshandler, isSuccessful, setHeadersIfSuccessful } from '../../services/common_methods';
import tokensService from '../../services/tokensService';
import { BaseApi } from '../api/baseApi'

const apiIndexOrders = async (userId) => {
  let response = await axios.get(`${import.meta.env.VITE_BACK_HOST}/users/${userId}/orders`,
                                 { headers: tokensService.auth_headers() })
                            .catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)
  
  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiIndexCooksOrders = async (restaurantId) => {
  let response = await axios.get(`${import.meta.env.VITE_BACK_HOST}/cooks/restaurants/${restaurantId}/orders`,
                                 { headers: tokensService.auth_headers() })
                            .catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)
  
  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiGetOrder = async (orderId) => {  
  let response = await axios.get(`${import.meta.env.VITE_BACK_HOST}/orders/${orderId}`,
                                 { headers: tokensService.auth_headers() })
                            .catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)
  
  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCreateOrder = async (order, errorsStore, successCallback) => {
  let args = {
    url: `${import.meta.env.VITE_BACK_HOST}/users/${order.user_id}/orders`,
    data: { order: order.attributes },
    requestOptions: {
      headers: tokensService.auth_headers()
    }
  }
  const requester = new BaseApi(args)

  await requester.requestBase(
    'post',
    errorsStore,
    successCallback
  )
}

const apiCreateRating = async (orderId, rating) => {
  let createUrl = `${import.meta.env.VITE_BACK_HOST}/orders/${orderId}/ratings`
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

const apiDestroyRating = async (rating) => {
  let destroyUrl = `${import.meta.env.VITE_BACK_HOST}//ratings/${rating.id}`

  let response = await axios.delete(
    destroyUrl,
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)
  
  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiUpdateOrderState = async (orderStateId, orderState) => {
  let udpateUrl = `${import.meta.env.VITE_BACK_HOST}/cooks/order_states/${orderStateId}/transition`
  let data = orderState

  let response = await axios.put(
    udpateUrl,
    data,
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)
  
  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiUpdateOrder = async (order) => {
  let updateUrl = `${import.meta.env.VITE_BACK_HOST}/orders/${order.id}`
  let data = { order: order.attributes }

  let response = await axios.put(
    updateUrl,
    data,
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)
  
  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiDestroyOrder = async (orderId) => {  
  let response = await axios.delete(`${import.meta.env.VITE_BACK_HOST}/orders/${orderId}`,
                                 { headers: tokensService.auth_headers() })
                            .catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)
  
  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCancelOrder = async (orderId) => {  
  let response = await axios.put(`${import.meta.env.VITE_BACK_HOST}/orders/${orderId}/cancel`,
                                 {},
                                 { headers: tokensService.auth_headers() })
                            .catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)
  
  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCanUpdateOrder = async (order) => {
  let canUpdateUrl = `${import.meta.env.VITE_BACK_HOST}/orders/${order.id}/can_update`
    
  let response = await axios.get(
    canUpdateUrl, 
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCanDestroyOrder = async (order) => {
  let canDeleteUrl = `${import.meta.env.VITE_BACK_HOST}/orders/${order.id}/can_destroy`
    
  let response = await axios.get(
    canDeleteUrl, 
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCanCreateOrder = async (user) => {
  let canCreateUrl = `${import.meta.env.VITE_BACK_HOST}/users/${user.id}/orders/can_create`
    
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
  } else if (['update', 'message'].includes(action)) {
    response = await apiCanUpdateOrder(record)
  } else if (action == 'destroy') {
    response = await apiCanDestroyOrder(record)
  } else if (public_actions.includes(action)) {
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
  apiUpdateOrder,
  apiDestroyOrder,
  apiDestroyRating,
  apiCancelOrder,
  apiCreateRating,
  apiUpdateOrderState,
  apiIndexCooksOrders,
  can
}
