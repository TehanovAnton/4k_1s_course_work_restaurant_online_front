import axios from 'axios';
import { errorshandler, isSuccessful, setHeadersIfSuccessful } from '../common_methods';
import tokensService from '../tokensService';

const urlOptionsEditor = (url, options) => {
  if (!!options['view'])
    url += `view=${options['view']}`

  return url
}

const apiShowDish = async (dish) => {
  let response = await axios.get(`http://localhost:3000/dishes/${dish.id}`,
                                 { headers: tokensService.auth_headers() })
                            .catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)
  
  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCanUpdateDish = async (dish) => {
  let canUpdateUrl = `http://localhost:3000/dishes/${dish.id}/can_update`
    
  let response = await axios.get(
    canUpdateUrl, 
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)

  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const apiCanDestroyDish = async (dish) => {
  let canDeleteUrl = `http://localhost:3000/dishes/${dish.id}/can_destroy`
    
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
  urlOptionsEditor,
  can
}