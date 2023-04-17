export class OwnService {
  constructor() {
    
  }

  isUserType(type, user) {
    return user.type === type
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
    return foundedmodel
  }

  ownModel (model, user, userModels) {
    if (user.type !== 'SuperAdmin')
      return false

    model = this.findModel(userModels, model)
    
    return !!model
  }
}
