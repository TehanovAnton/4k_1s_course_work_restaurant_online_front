import axios from 'axios';
import { errorshandler, isSuccessful } from '../common_methods';
import tokensService from '../../services/tokensService';

const apiIndexRestaurants = async (authHeaders) => {
  let response = await axios.get('http://localhost:3000/restaurants',
                                 { headers: authHeaders })
                            .catch(errorshandler)

  let isSuccessful = response && response.status === 200

  return { response: response, isSuccessful: isSuccessful }
}

const apiUpdateRestaurants = async (authHeaders, restaurant) => {
  let updateUrl = `http://localhost:3000/restaurants/${restaurant.id}`
  let data = {
    name: restaurant.name,
    email: restaurant.email,
    address: restaurant.address
  }
  
  let response = await axios.put(
    updateUrl, 
    data,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCanUpdateRestaurant = async (authHeaders, restaurant) => {
  let canUrl = `http://localhost:3000/restaurants/${restaurant.id}/can_update`
  
  let response = await axios.get(
    canUrl, 
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCreateRestaurants = async (authHeaders, restaurant) => {
  let createUrl = `http://localhost:3000/restaurants`
  let data = { restaurant: restaurant }  
  
  let response = await axios.post(
    createUrl, 
    data, 
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCanCreateRestaurants = async (authHeaders) => {
  let canUrl = `http://localhost:3000/restaurants/can_create`
  
  let response = await axios.get(
    canUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiDestroyRestaurants = async (authHeaders, restaurant) => {
  let updateUrl = `http://localhost:3000/restaurants/${restaurant.id}`
  
  let response = await axios.delete(
    updateUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCanDestroyRestaurant = async (authHeaders, restaurant) => {
  let canUrl = `http://localhost:3000/restaurants/${restaurant.id}/can_destroy`
  
  let response = await axios.get(
    canUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
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
  
  if (!!!response) {
    debugger
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
  apiIndexRestaurants,
  apiUpdateRestaurants,
  apiCreateRestaurants,
  apiDestroyRestaurants,
  apiCanCreateRestaurants,
  apiCanUpdateRestaurant,
  apiCanDestroyRestaurant,
  can
}