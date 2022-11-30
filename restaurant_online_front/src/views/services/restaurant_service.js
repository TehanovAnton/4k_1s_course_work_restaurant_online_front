import axios from 'axios';

const apiRestaurants = async (authHeaders) => {
  let response = await axios.get('http://localhost:3000/restaurants',
                                 { headers: authHeaders })
                            .catch(errorshandler)

  let isSuccessful = response && response.status === 200

  return { response: response, isSuccessful: isSuccessful }
}

const errorshandler = (error) => {            
  console.log(error);
}

export default { apiRestaurants }