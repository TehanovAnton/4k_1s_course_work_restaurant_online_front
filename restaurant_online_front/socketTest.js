const socket = new WebSocket('ws://localhost:3000/cable')

socket.onopen((event) => {  
  const subscribedMsg = { command:"subscribe", identifier: { channel:'ChatMessage' }}
  socket.send(JSON.stringify(subscribedMsg))
})