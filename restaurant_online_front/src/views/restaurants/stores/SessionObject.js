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
    callBack() 

    let jsonData = currentModelJsonData()

    if (!!jsonData)
      sessionStorage.setItem(this.sessionObjectKey, jsonData)
    else {      
      sessionStorage.setItem(this.sessionObjectKey, this.initObject())
    }
  }
}