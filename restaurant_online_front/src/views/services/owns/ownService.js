export class OwnService {
  constructor() {
    
  }

  userModels (user, models) {
    return models.filter(r => {
      return r.models_admins.find(ra => {
        return ra.user_id === user.id
      })
    })
  }

  findModel (modelsCollection, model) {
    let foundedmodel = modelsCollection.find(r => r.id === model.id)

    if (!!!foundedmodel)
      foundedmodel = modelsCollection[0]

    return foundedmodel
  }

  ownModel (model, user, userModels) {
    if (user.type !== 'SuperAdmin')
      return false

    model = this.findModel(userModels, model)
    
    return !!model
  }
}
