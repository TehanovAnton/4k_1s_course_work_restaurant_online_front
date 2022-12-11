import axios from 'axios';
import router from '../../router/router';
import tokensService from './tokensService';
import { errorshandler, isSuccessful } from './common_methods';

const apiSignOut = async () => {
  let signOutUrl = 'http://localhost:3000/auth/sign_out'
  
  let response = await axios.delete(
    signOutUrl,
    { headers: tokensService.auth_headers() }
  ).catch(errorshandler)

  if (isSuccessful(response)) {
    sessionStorage.clear()
    router.push({ name:'sign_in' })
  } else {
    router.back()
  }
}

export default {
  apiSignOut
}
