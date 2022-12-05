import axios from 'axios';
import { errorshandler, isSuccessful } from '../common_methods';

const apiShowUser = async (authHeaders, user_id) => {
  let response = await axios.get(`http://localhost:3000/users/${user_id}`,
                                 { headers: authHeaders })
                            .catch(errorshandler)
  
  return { response: response, isSuccessful: isSuccessful(response) }
}

const apiIndexUsers = async (authHeaders) => {
  let response = await axios.get('http://localhost:3000/users',
                                 { headers: authHeaders })
                            .catch(errorshandler)

  let isSuccessful = response && response.status === 200

  return { response: response, isSuccessful: isSuccessful }
}

const apiUpdateUser = async (authHeaders, user) => {
  let updateUrl = `http://localhost:3000/users/${user.id}`
  let data = {
    name: user.name,
    email: user.email
  }
  
  let response = await axios.put(
    updateUrl, 
    data,
    { headers: authHeaders }
  ).catch(errorshandler)

  return { response: response, isSuccessful: isSuccessful(response) }
}

export default {
  apiShowUser,
  apiIndexUsers,
  apiUpdateUser
}
