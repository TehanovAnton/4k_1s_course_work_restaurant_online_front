import { processableErrors } from "../common_methods"

const createModel = async (modelApi, args, errorsStore, successfulCallback) => {
  let { response, isSuccessful } = await modelApi.apiCreateModel(args)

  if (isSuccessful) {
    successfulCallback(response)
  } else {
    let errsArr = [ {error: 'Something went wrong'} ]

    if (processableErrors(response)) {
      errsArr = response.data
    }
    
    errorsStore.setErrors(errsArr)
  }
}

export default {
  createModel
}