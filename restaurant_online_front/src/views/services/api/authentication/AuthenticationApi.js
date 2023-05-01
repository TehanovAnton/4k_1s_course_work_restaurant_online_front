import axios from "axios"
import { processableErrors, axiosMethods } from "../../common_methods"
import { BaseApi } from "../baseApi"

export class AuthenticationApi extends BaseApi {
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
}