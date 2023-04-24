import tokensService from "../../services/tokensService";

export class ModelsStoreHelper {
  constructor () {
  }
  
  currentModelJsonData(currentModel) {
    return JSON.stringify(currentModel)
  }

  currentModelExists(currentModel) {
    return !!currentModel
  }

  modelsFilter(models, filterCallBack) {
    return models.filter(filterCallBack)
  }

  async fetchModels(fetchMethod, responseCallback) {
    let { response, isSuccessful } = await fetchMethod()

    if (isSuccessful) {
      tokensService.setAuthTokens(response.headers)

      responseCallback(response)
    }
  }

  findModel(modelCollection, model) {
    let foundModel = modelCollection.find(r => r.id === model.id)

    if (!!!foundModel)
      foundModel = modelCollection[0]

    return foundModel
  }
}