import { errorshandler, isSuccessful, setHeadersIfSuccessful } from '../common_methods';
import axios from 'axios';

const apiIndexModels = async (args) => {
  let response = await axios.get(args['getUrl'],
                                 args['requestOptions']
  ).catch(errorshandler)  
                            
  return apiResponseHandelr(response)
}

const apiCreateModel = async (args) => {      
  let response = await axios.post(args['postUrl'],
                                  args['data'],
                                  args['requestOptions']
  ).catch(errorshandler)
  
  return apiResponseHandelr(response)
}

const apiUpdateModel = async (args) => {    
  let response = await axios.put(args['updateUrl'], 
                                 args['data'],
                                 args['requestOptions']
  ).catch(errorshandler)

  return apiResponseHandelr(response)
}

const apiDeletModel = async (args) => {
  let response = await axios.delete(args['deleteUrl'], 
                                    args['requestOptions']
  ).catch(errorshandler)
  return apiResponseHandelr(response)
}

const apiCanCreateModel = async (args) => {
  return await apiCanRequest('Create', args)
}

const apiCanUpdateModel = async (args) => {
  return await apiCanRequest('Update', args)
}

const apiCanDestroModel = async (args) => {
  return await apiCanRequest('Destroy', args)
}

const can = async (action, public_actions, args) => {
  let response  

  if (action == 'create') {
    response = await apiCanCreateModel(args)
  } else if (action == 'update') {
    response = await apiCanUpdateModel(args)
  } else if (action == 'destroy') {
    response = await apiCanDestroModel(args)
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

const apiCanRequest = async (action, args) => {
  let response = await axios.get(args[`can${action}Url`],
                                 args['requestOptions']    
  ).catch(errorshandler)  

  return apiResponseHandelr(response)
}

const apiResponseHandelr = (response) => {
  let isSuccessfulReq = isSuccessful(response)
  let headers = response.headers

  setHeadersIfSuccessful(headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const urlOptionsEditor = (url, options) => {
  if (!!options['view'])
    url += `view=${options['view']}`

  return url
}

export default {
  apiIndexModels,
  apiCreateModel,
  apiUpdateModel,
  apiDeletModel,
  can,
  urlOptionsEditor
}