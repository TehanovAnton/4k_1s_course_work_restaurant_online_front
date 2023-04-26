import axios from "axios"
import { processableErrors, axiosMethods } from "../common_methods"

export class AuthenticationApi {
  constructor(args) {
    this.args = args
  }

  async postResetPassword(errorsStore, successCallback) {
    let response = await axios.put(
      this.args['url'], 
      this.args['data'],
      this.args['requestOptions']
    ).catch((errors) => {
      let errsArr = [ { error: 'Something went wrong'} ],
          response = errors.response

      if (processableErrors(response)) {
        errsArr = response.data
      }
      
      errorsStore.setErrors(errsArr)
    })

    if (!!response)
      successCallback(response)
  }
  
  async postCreateUser(errorsStore, successCallback) {
    let response = await axios.post(
      this.args['url'], 
      this.args['data'],
      this.args['requestOptions']
    ).catch((errors) => {
      let errsArr = [ { error: 'Something went wrong'} ],
          response = errors.response

      if (processableErrors(response)) {
        errsArr = response.data.errors
      }
      
      errorsStore.setErrors(errsArr)
    })

    if (!!response)
      successCallback(response)
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
        errsArr = response.data.errors
      }
      
      errorsStore.setErrors(errsArr)
    })

    if (!!response)
      successCallback(response)
  }
}