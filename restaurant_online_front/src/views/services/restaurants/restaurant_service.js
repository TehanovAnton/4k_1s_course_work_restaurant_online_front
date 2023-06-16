import axios from 'axios';
import { errorshandler, isSuccessful, setHeadersIfSuccessful, processableErrors } from '../common_methods';
import tokensService from '../../services/tokensService';
import { BaseApi } from '../api/baseApi';

const apiRestaurantTeam = async (restaurantId, errorsStore, successCallback) => {
  let args = {
    url: `${import.meta.env.VITE_BACK_HOST}/restaurants_teams/restaurants/${restaurantId}/team`,
    requestOptions: {
      headers: tokensService.auth_headers()
    }
  }
  const requester = new BaseApi(args)
  
  await requester.requestBase('get', errorsStore, successCallback)
} 

const apiIndexRestaurants = async (authHeaders) => {
  console.log(import.meta.env.MODE)
  let response = await axios.get(`${import.meta.env.VITE_BACK_HOST}/restaurants?resataurant_view=normal`,
                                 { headers: authHeaders })
                            .catch(errorshandler)

  let isSuccessful = response && response.status === 200

  return { response: response, isSuccessful: isSuccessful }
}

const apiGetRestaurant = async (authHeaders, restaurantId) => {  
  let response = await axios.get(`${import.meta.env.VITE_BACK_HOST}/restaurants/${restaurantId}`,
                                 { headers: authHeaders })
                            .catch(errorshandler)

  let isSuccessful = response && response.status === 200

  return { response: response, isSuccessful: isSuccessful }
}

const apiUpdateRestaurants = async (authHeaders, restaurant, errorsStore, successCallback) => {
  let updateUrl = `${import.meta.env.VITE_BACK_HOST}/restaurants/${restaurant.id}`
  let data = restaurant.updateAttributes
  
  let response = await axios.put(
    updateUrl, 
    data,
    { headers: authHeaders }
  ).catch((errors) => {
    let errsArr = [ {error: 'Something went wrong'} ],
        response = errors.response

    if (processableErrors(response)) {
      errsArr = response.data
    }
    
    errorsStore.setErrors(errsArr)
  })

  if (!!response)
    await successCallback({ response: response, isSuccessful: isSuccessful(response) })
}

const apiCanUpdateRestaurant = async (authHeaders, restaurant) => {
  let canUrl = `${import.meta.env.VITE_BACK_HOST}/restaurants/${restaurant.id}/can_update`
  
  let response = await axios.get(
    canUrl, 
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCreateRestaurants = async (authHeaders, restaurant, errorsStore, successCallback) => {
  let createUrl = `${import.meta.env.VITE_BACK_HOST}/restaurants`
  let data = { restaurant: restaurant }  
  
  let response = await axios.post(
    createUrl, 
    data, 
    { headers: authHeaders }
  ).catch((errors) => {
    let errsArr = [ {error: 'Something went wrong'} ],
        response = errors.response

    if (processableErrors(response)) {
      errsArr = response.data
    }
    
    errorsStore.setErrors(errsArr)
  })

  if (!!response)
    successCallback({ response: response, isSuccessful: isSuccessful(response) })
}

const apiCanCreateRestaurants = async (authHeaders) => {
  let canUrl = `${import.meta.env.VITE_BACK_HOST}/restaurants/can_create`
  
  let response = await axios.get(
    canUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiDestroyRestaurants = async (authHeaders, restaurant) => {
  let updateUrl = `${import.meta.env.VITE_BACK_HOST}/restaurants/${restaurant.id}`
  
  let response = await axios.delete(
    updateUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCanDestroyRestaurant = async (authHeaders, restaurant) => {
  let canUrl = `${import.meta.env.VITE_BACK_HOST}/restaurants/${restaurant.id}/can_destroy`
  
  let response = await axios.get(
    canUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiRestaurantSearch = async (matchExpression) => {
  let searchUrl = `${import.meta.env.VITE_BACK_HOST}/restaurants/search`  
  let data = { match_expression: matchExpression }

  let response = await axios.get(
    searchUrl, 
    { headers: tokensService.auth_headers(), params: data }
  ).catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const can = async (action, public_actions, record) => {
  let response

  if (action == 'create') {
    response = await apiCanCreateRestaurants(tokensService.auth_headers())
  } else if (action == 'update') {
    response = await apiCanUpdateRestaurant(tokensService.auth_headers(), record)
  } else if (action == 'destroy') {
    response = await apiCanDestroyRestaurant(tokensService.auth_headers(), record)
  }
   else if (public_actions.includes(action)) {
    return true
  }

  if (response.response.status == 401) {
    router.push({ name: 'sign_in' })
  }

  tokensService.setAuthTokens(response.response.headers)
  
  if (response.isSuccessful) {
    return !!response.response.data
  }

  return false
}

export default {
  apiRestaurantTeam,
  apiIndexRestaurants,
  apiGetRestaurant,
  apiUpdateRestaurants,
  apiCreateRestaurants,
  apiDestroyRestaurants,
  apiCanCreateRestaurants,
  apiCanUpdateRestaurant,
  apiCanDestroyRestaurant,
  apiRestaurantSearch,
  can
}