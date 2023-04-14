const socket = new WebSocket('ws://localhost:3000/cable')

socket.onopen((_event) => {  
  const subscribedMsg = { 
    command:"subscribe", 
    identifier: { channel:'ChatMessage' }
  }

  socket.send(JSON.stringify(subscribedMsg))
})

