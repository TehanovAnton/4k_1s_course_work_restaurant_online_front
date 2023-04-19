import tokensService from "../../services/tokensService";

export class ModelsStoreHelper {
  constructor (models, currentModel) {
    this.models = models;
    this.currentModel = currentModel;
  }
  
  currentModelJsonData() {
    return JSON.stringify(this.currentModel.value)
  }

  currentModelExists() {
    return !!this.currentModel.value
  }

  modelsFilter(filterCallBack) {
    return this.models.value.filter(filterCallBack)
  }

  async fetchModels(fetchMethod, responseCallback) {
    let { response, isSuccessful } = await fetchMethod()

    if (isSuccessful) {
      tokensService.setAuthTokens(response.headers)
      this.models.value = response.data

      responseCallback(response)
    }
  }

  findModel(modelCollection, restaurant) {
    let foundModel = modelCollection.find(r => r.id === restaurant.id)

    if (!!!foundModel)
      foundModel = modelCollection[0]

    return foundModel
  }

  setModel(sessionObject, model) {
    sessionObject.updateSessionObjectContent(
      this,
      () => {
        let findedModel = this.models.value.find((m) => m.id === model.id)
        this.currentModel.value = findedModel
      }
    )
  }
}