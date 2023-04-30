import axios from "axios"
import { processableErrors, axiosMethods } from "../common_methods"

export class AuthenticationApi {
  constructor(args) {
    this.args = args
  }

  async postResetPassword(errorsStore, successCallback) {    
    await this.requestBase(
      'put',
      errorsStore,
      successCallback
    )
  }
  
  async postCreateUser(errorsStore, successCallback) {
    await this.requestBase(
      'post',
      errorsStore,
      successCallback
    )
  }

  async requestBase(requestMethod, errorsStore, successCallback) {
    let response = await axiosMethods[requestMethod](
      this.args['url'], 
      this.args['data'],
      this.args['requestOptions']
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
}