import axios from 'axios';
import { errorshandler, isSuccessful } from '../common_methods';

const apiShowUser = async (authHeaders, user_id) => {
  let response = await axios.get(`http://localhost:3000/users/${user_id}`,
                                 { headers: authHeaders })
                            .catch(errorshandler)
  
  return { response: response, isSuccessful: isSuccessful(response) }
}

export default {
  apiShowUser
}
