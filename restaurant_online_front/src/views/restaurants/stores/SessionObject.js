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

  updateSessionObjectContent(currentModelExists, currentModelJsonData, callBack) {
    if (!currentModelExists)
      return

    callBack()    

    sessionStorage.setItem(this.sessionObjectKey, currentModelJsonData())
  }
}