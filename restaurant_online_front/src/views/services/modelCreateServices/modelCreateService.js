
const createModel = async (modelApi, args, errors, successfulCallback) => {
  let { response, isSuccessful } = await modelApi.apiCreateModel(args)

  if (isSuccessful) {
    successfulCallback()
  } else {
    Object.keys(response.data).forEach((attribute) => {
      let attributeErrosMessages = response.data[attribute]      
      errors.value.push(attributeErrosMessages[0])
    })
  }
}

export default {
  createModel
}