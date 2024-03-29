import axios from 'axios';
import { errorshandler, isSuccessful, axiosMethods, processableErrors } from '../common_methods';
import tokensService from '../../services/tokensService';

const apiShowUser = async (authHeaders, user_id) => {
  let response = await axios.get(`${import.meta.env.VITE_BACK_HOST}/users/${user_id}`,
                                 { headers: authHeaders })
                            .catch(errorshandler)
  
  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiShowUserByEmail = async (authHeaders, userEmail) => {
  let response = await axios.get(`${import.meta.env.VITE_BACK_HOST}/users/show_by_email`,
                                 { 
                                  headers: authHeaders,
                                  params: { email: userEmail }
                                 })
                            .catch(errorshandler)
  
  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiIndexUsers = async (authHeaders) => {
  let response = await axios.get(`${import.meta.env.VITE_BACK_HOST}/users`,
                                 { headers: authHeaders })
                            .catch(errorshandler)

  let isSuccessful = response && response.status === 200

  return { response: response, isSuccessful: isSuccessful }
}

const apiUpdateUser = async (authHeaders, user) => {
  let updateUrl = `${import.meta.env.VITE_BACK_HOST}/users/${user.id}`
  let data = { user: user }
    
  let response = await axios.put(
    updateUrl, 
    data,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCreateUser = async (authHeaders, user) => {
  let createUrl = `${import.meta.env.VITE_BACK_HOST}/users `
  let data = { user: user }  

  let response = await axios.post(
    createUrl, 
    data, 
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiDestroyUser = async (authHeaders, user) => {
  let destroyUrl = `${import.meta.env.VITE_BACK_HOST}/users/${user.id}`
  
  let response = await axios.delete(
    destroyUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCanUpdateUser = async (authHeaders, user) => {
  let canUrl = `${import.meta.env.VITE_BACK_HOST}/users/${user.id}/can_update`
  
  let response = await axios.get(
    canUrl, 
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCanCreateUser = async (authHeaders) => {
  let canUrl = `${import.meta.env.VITE_BACK_HOST}/users/can_create`
  
  let response = await axios.get(
    canUrl,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiCanDestroyUser = async (authHeaders, user) => {
  let canUrl = `${import.meta.env.VITE_BACK_HOST}/users/${user.id}/can_destroy`
  
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

const requestBase = async (args, requestMethod, errorsStore, successCallback) => {
  let response = await axiosMethods[requestMethod](
    args['url'], 
    args['data'],
    args['requestOptions']
  ).catch((errors) => {
    let errsArr = [ { error: 'Something went wrong'} ],
        response = errors.response
      
    if (processableErrors(response)) {
      errsArr = response.data

      if (response.data.errors)
        errsArr = response.data.errors 
    }
    
    errorsStore.setErrors(errsArr)
  })

  if (!!response)
    successCallback(response)
}

export default {
  requestBase,
  apiShowUser,
  apiIndexUsers,
  apiUpdateUser,
  apiCreateUser,
  apiDestroyUser,
  apiShowUserByEmail,
  can
}
