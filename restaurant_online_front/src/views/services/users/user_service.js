import axios from 'axios';
import { errorshandler, isSuccessful } from '../common_methods';
import tokensService from '../../services/tokensService';

const apiShowUser = async (authHeaders, user_id) => {
  let response = await axios.get(`http://localhost:3000/users/${user_id}`,
                                 { headers: authHeaders })
                            .catch(errorshandler)
  
  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiIndexUsers = async (authHeaders) => {
  let response = await axios.get('http://localhost:3000/users',
                                 { headers: authHeaders })
                            .catch(errorshandler)

  let isSuccessful = response && response.status === 200

  return { response: response, isSuccessful: isSuccessful }
}

const apiUpdateUser = async (authHeaders, user) => {
  let updateUrl = `http://localhost:3000/users/${user.id}`
  let data = {
    name: user.name,
    email: user.email
  }
    
  let response = await axios.put(
    updateUrl, 
    data,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCreateUser = async (authHeaders, user) => {
  let createUrl = `http://localhost:3000/users `
  let data = { user: user }  

  let response = await axios.post(
    createUrl, 
    data, 
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiDestroyUser = async (authHeaders, user) => {
  let destroyUrl = `http://localhost:3000/users/${user.id}`
  
  let response = await axios.delete(
    destroyUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCanUpdateUser = async (authHeaders, user) => {
  let canUrl = `http://localhost:3000/users/${user.id}/can_update`
  
  let response = await axios.get(
    canUrl, 
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCanCreateUser = async (authHeaders) => {
  let canUrl = `http://localhost:3000/users/can_create`
  
  let response = await axios.get(
    canUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCanDestroyUser = async (authHeaders, user) => {
  let canUrl = `http://localhost:3000/users/${user.id}/can_destroy`
  
  let response = await axios.get(
    canUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const can = async (action, public_actions, record) => {
  let response

  if (action == 'create') {
    response = await apiCanCreateUser(tokensService.auth_headers())
  } else if (action == 'update') {
    response = await apiCanUpdateUser(tokensService.auth_headers(), record)
  } else if (action == 'destroy') {
    response = await apiCanDestroyUser(tokensService.auth_headers(), record)
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
  apiShowUser,
  apiIndexUsers,
  apiUpdateUser,
  apiCreateUser,
  apiDestroyUser,
  can
}
