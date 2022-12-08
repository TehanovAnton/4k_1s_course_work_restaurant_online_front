import axios from 'axios';
import { errorshandler, isSuccessful, setHeadersIfSuccessful } from '../common_methods';
import tokensService from '../../services/tokensService';


const apiIndexDishes = async (menuId) => {  
  let response = await axios.get(`http://localhost:3000/menus/${menuId}/dishes`,
    { headers: tokensService.auth_headers() })
  .catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiShowDish = async (dish) => {
  let response = await axios.get(`http://localhost:3000/dishes/${dish.id}`,
                                 { headers: tokensService.auth_headers() })
                            .catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)
  
  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiUpdateDish = async (dish) => {
  let updateUrl = `http://localhost:3000/dishes/${dish.id}`
  let data = {
    name: dish.name,
  }
    
  let response = await axios.put(
    updateUrl, 
    data,
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCreateDish = async (dish) => {
  let createUrl = `http://localhost:3000/menus/${dish.menu.id}/dishes`
  let data = {
    name: dish.name,
  }
    
  let response = await axios.post(
    createUrl, 
    data,
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiDeletsDish = async (dish) => {
  let deleteUrl = `http://localhost:3000/dishes/${dish.menu.id}`
    
  let response = await axios.delete(
    deleteUrl, 
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCanUpdateDish = async (dish) => {
  let canUpdateUrl = `http://localhost:3000/dishes/${dish.menu.id}/can_update`
    
  let response = await axios.get(
    canUpdateUrl, 
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCanDestroyDish = async (dish) => {
  let canDeleteUrl = `http://localhost:3000/dishes/${dish.menu.id}/can_destroy`
    
  let response = await axios.get(
    canDeleteUrl, 
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCanCreateDish = async (menu) => {
  let canCreateUrl = `http://localhost:3000/menus/${menu.id}/dishes/can_create`
    
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
    response = await apiCanCreateDish(record)
  } else if (action == 'update') {
    response = await apiCanUpdateDish(record)
  } else if (action == 'destroy') {
    response = await apiCanDestroyDish(record)
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
  apiIndexDishes,
  apiCreateDish,
  apiUpdateDish,
  apiDeletsDish,
  can
}