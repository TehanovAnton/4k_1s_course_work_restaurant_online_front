import axios from "axios"
import { processableErrors, axiosMethods } from "../common_methods"
import auth_service from '../auth_service'


export class BaseApi {
  constructor(args) {
    this.args = args
  }

  async requestBase(requestMethod, errorsStore, successCallback) {    
    let response = undefined
    let requestErrorHandler = (errors) => {
      let errsArr = [ { error: 'Something went wrong'} ],
          response = errors.response

      if (processableErrors(response)) {
        errsArr = response.data

        if (response.data.errors)
          errsArr = response.data.errors 
      } else if (response.status === 401 && response.data.errors[0] === "You need to sign in or sign up before continuing.") {
        return auth_service.destroySession()
      }
      
      errorsStore.setErrors(errsArr)
    }

    if (requestMethod === 'get') {
      response = await axiosMethods[requestMethod](
        this.args['url'],
        this.args['requestOptions']
      ).catch(requestErrorHandler)
    } else {
      response = await axiosMethods[requestMethod](
        this.args['url'],
        this.args['data'],
        this.args['requestOptions']
      ).catch(requestErrorHandler)
    }

    if (!!response)
      await successCallback(response)
  }
}