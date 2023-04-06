
const createModel = async (modelApi, args, errorsStore, successfulCallback) => {
  let { response, isSuccessful } = await modelApi.apiCreateModel(args)

  if (isSuccessful) {
    successfulCallback()
  } else {
    errorsStore.setErrors(response.data)
  }
}

export default {
  createModel
}