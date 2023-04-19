export class SessionObject {
  constructor (sessionObjectKey, defaultSessionObject) {
    this.sessionObjectKey = sessionObjectKey;
    this.defaultSessionObject = defaultSessionObject;
  }

  parsedSessionObject(sessionData) {
    return JSON.parse(sessionData)
  }

  sessionOBjectContent() {
    return sessionStorage.getItem(this.sessionObjectKey)
  }  

  initObject() {
    let sessionData = this.sessionOBjectContent()
    if (!!sessionData)
      return this.parsedSessionObject(sessionData)

    return this.defaultSessionObject
  }

  updateSessionObjectContent(modelsStore, callBack) {
    let currentModelExists = modelsStore.currentModelExists()
    if (!currentModelExists)
      return

    callBack()    

    let currentModelJsonData = modelsStore.currentModelJsonData()
    sessionStorage.setItem(this.sessionObjectKey, currentModelJsonData)
  }
}