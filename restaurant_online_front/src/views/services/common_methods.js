import router from '../../router/router';
import auth_service from '../services/auth_service'

const isSuccessful = (response) => {
  return response && response.status === 200
}

const errorshandler = (error) => {            
  console.log(error);

  if (error.response.status == 401) {
    sessionStorage.clear()
    router.push({ name:'sign_in' })
  }  
}

export {
  isSuccessful,
  errorshandler
}
