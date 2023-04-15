import router from '../../router/router';
import auth_service from '../services/auth_service'
import tokensService from './tokensService';

const isSuccessful = (response) => {
  return response && response.status === 200
}

const errorshandler = (error) => {            
  console.log(error);

  if (!!error.response && error.response.status == 401) {
    sessionStorage.clear()
    router.push({ name:'sign_in' })
  }

  return error.response
}

const setHeadersIfSuccessful = (headers, isSuccessful) => {
  if (isSuccessful) {
    tokensService.setAuthTokens(headers)
  }
}

const responseHandler = (response) => {
  let isSuccessfulReq = isSuccessful(response)
  setHeadersIfSuccessful(response.headers, isSuccessfulReq)

  return { response: response, isSuccessful: isSuccessfulReq }
}

const processableErrors = (response) => {
  return [422, 400].response.status
}



export {
  isSuccessful,
  errorshandler,
  setHeadersIfSuccessful,
  responseHandler,
  processableErrors
}
