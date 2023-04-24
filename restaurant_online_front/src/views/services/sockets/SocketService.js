export class SocketService {
  constructor(modelsStore, socketUrl, channel, room, messageModleKey) {
    this.modelsStore = modelsStore 
    this.socketUrl = socketUrl
    this.room = room
    this.channel = channel
    this.messageModleKey = messageModleKey
  }

  bindSocket() {
    this.socket = new WebSocket(this.socketUrl)

    this.socket.onopen = (_event) => {
      const identifier = { 
        channel: this.channel, 
        room: this.room,
      }
  
      const subscribedMsg = { 
        command:"subscribe", 
        identifier: JSON.stringify(identifier)
      }
      
      this.socket.send(JSON.stringify(subscribedMsg))
    }

    this.socket.onmessage = (_event) => {
      let data = JSON.parse(event.data)    

      if (data.type == 'ping') {
        return
      }

      if (data.message) {
        let model = JSON.parse(data.message[this.messageModleKey])
        this.modelsStore.updateModel(model)
      }
    }
  }
}
