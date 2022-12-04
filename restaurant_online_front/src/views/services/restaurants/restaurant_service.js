import axios from 'axios';

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

const apiCanUpdateRestaurants = async (authHeaders, restaurant) => {
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

const apiCanDestroyRestaurants = async (authHeaders, restaurant) => {
  let canUrl = `http://localhost:3000/restaurants/${restaurant.id}/can_destroy`
  
  let response = await axios.get(
    canUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const isSuccessful = (response) => {
  return response && response.status === 200
}

const errorshandler = (error) => {            
  console.log(error);
}

export default {
  apiIndexRestaurants,
  apiUpdateRestaurants,
  apiCreateRestaurants,
  apiDestroyRestaurants,
  apiCanCreateRestaurants,
  apiCanUpdateRestaurants,
  apiCanDestroyRestaurants
}