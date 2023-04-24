import { errorshandler, isSuccessful, setHeadersIfSuccessful, processableErrors } from '../common_methods';
import axios from 'axios';
import router from '../../../router/router';

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

const apiUpdateModel = async (args, errorsStore, successCallback) => {    
  let response = await axios.put(args['updateUrl'], 
                                 args['data'],
                                 args['requestOptions']
  ).catch((errors) => {
    let errsArr = [ {error: 'Something went wrong'} ],
        response = errors.response

    if (processableErrors(response)) {
      errsArr = response.data
    }
    
    errorsStore.setErrors(errsArr)
  })

  if (!!response)
    successCallback(response)
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

const urlOptionsEditor = (url, options) => {
  if (!!options['view'])
    url += `view=${options['view']}`

  return url
}

const formDataArgs = (args, attributes, headers) => {
  let formData = new FormData()

  Object.keys(attributes).forEach((attribute) => {
    let attributeValue = attributes[attribute],
        formAttribute = `dish[${attribute}]`
    formData.append(formAttribute, attributeValue)  
  })

  headers["Content-Type"] = "multipart/form-data"

  args.requestOptions['headers'] = headers
  args.data = formData
  return args
}

export default {
  apiIndexModels,
  apiCreateModel,
  apiUpdateModel,
  apiDeletModel,
  can,
  urlOptionsEditor,
  formDataArgs
}