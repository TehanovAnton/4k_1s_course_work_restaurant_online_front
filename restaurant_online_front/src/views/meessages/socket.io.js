import io from 'vue-3-socket.io'

const useSocketIO = () => {
  const socket = new WebSocket('ws://localhost:3000/cable')

  return {
    socket
  }
}

export default {
  useSocketIO
}