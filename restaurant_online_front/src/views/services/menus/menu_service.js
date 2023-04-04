import axios from 'axios';
import { errorshandler, isSuccessful } from '../common_methods';
import tokensService from '../../services/tokensService';

const apiIndexMenus = async (authHeaders, restaurantId, options) => {
  let getUrl = `http://localhost:3000/restaurants/${restaurantId}/menus?`

  if (!!options['view'])
    getUrl += `view=${options['view']}`
  
  let response = await axios.get(getUrl,
                                 { headers: authHeaders })
                            .catch(errorshandler)

  let isSuccessful = response && response.status === 200

  return { response: response, isSuccessful: isSuccessful }
}

const apiGetMenu = async (authHeaders, menuId) => {
  let response = await axios.get(`http://localhost:3000/menus/${menuId}`,
                                 { headers: authHeaders })
                            .catch(errorshandler)
  
  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiShowMenu = async (authHeaders, menu) => {
  let response = await axios.get(`http://localhost:3000/menus/${menu.id}`,
                                 { headers: authHeaders })
                            .catch(errorshandler)
  
  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiUpdateMenu = async (authHeaders, menu) => {
  let updateUrl = `http://localhost:3000/menus/${menu.id}`
  let data = menu.attributes
    
  let response = await axios.put(
    updateUrl, 
    data,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCreateMenu = async (authHeaders, menu) => {
  let createUrl = `http://localhost:3000/restaurants/${menu.restaurant_id}/menus`
  let data = { menu: menu }  

  let response = await axios.post(
    createUrl, 
    data, 
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiDestroyMenu = async (authHeaders, menu) => {
  let destroyUrl = `http://localhost:3000/menus/${menu.id}`
  
  let response = await axios.delete(
    destroyUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCanUpdateMenu = async (authHeaders, menu) => {
  let canUrl = `http://localhost:3000/menus/${menu.id}/can_update`
  
  let response = await axios.get(
    canUrl, 
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCanCreateMenu = async (authHeaders, restaurant) => {
  let canUrl = `http://localhost:3000/restaurants/${restaurant.id}/menus/can_create`
  
  let response = await axios.get(
    canUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCanDestroyMenu = async (authHeaders, menu) => {
  let canUrl = `http://localhost:3000/menus/${menu.id}/can_destroy`
  
  let response = await axios.get(
    canUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const can = async (action, public_actions, record) => {
  let response  

  if (action == 'create') {
    response = await apiCanCreateMenu(tokensService.auth_headers(), record)
  } else if (action == 'update') {
    response = await apiCanUpdateMenu(tokensService.auth_headers(), record)
  } else if (action == 'destroy') {
    response = await apiCanDestroyMenu(tokensService.auth_headers(), record)
  }
   else if (public_actions.includes(action)) {
    return true
  }
  
  if (response.response.status == 401) {
    router.push({ name: 'sign_in' })
    return
  }

  tokensService.setAuthTokens(response.response.headers)
  
  if (response.isSuccessful) {
    return !!response.response.data
  }

  return false
}

export default {
  apiIndexMenus,
  apiShowMenu,
  apiGetMenu,
  apiUpdateMenu,
  apiCreateMenu,
  apiDestroyMenu,
  can
}
