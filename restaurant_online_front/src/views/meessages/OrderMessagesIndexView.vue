<script setup>
  import { onBeforeMount, ref } from 'vue';
  import message_service from '../services/messages/message_service'
  import { useCurrentUserStore } from '../../stores/users/currentUser';

  onBeforeMount(async () => {
    const socket = new WebSocket('ws://localhost:3000/cable')

    socket.onopen = (_event) => {  
      const identifier = { 
        channel:"ChatChannel", 
        room: "chat_channel", 
      }

      const subscribedMsg = { 
        command:"subscribe", 
        identifier: JSON.stringify(identifier)
      }
      
      socket.send(JSON.stringify(subscribedMsg))
    }

    socket.onmessage = (event) => {
      let data = JSON.parse(event.data)

      if (data.type == 'ping') {
        return
      }

      if (data.message) {
        messages.value = JSON.parse(data.message.order_messages)
      }
    }
    
    await getOrderMessages()

    dataReady.value = true
  })

  const props = defineProps(['order'])  
  const currentUser = useCurrentUserStore()

  const dataReady = ref(false)
  const message = ref({ text:"", restaurant_id: props.order.restaurant.id, user_id: currentUser.user.id })
  // const displayDelete = ref(false)
  const messages = ref({})

  const isMine = (message) => message.user.id == currentUser.user.id

  const messageClass = (message) => {
    if (isMine(message)) {
      return 'message my-message'
    }

    return 'message other-message'
  }

  const getOrderMessages = async () => {
    let {
      response,
      isSuccessful
    } = await message_service.apiGetOrderMessges(props.order.id)

    if (isSuccessful) {
      messages.value = response.data
    }
  }

  const postMessage = async (e) => {
    if (e.key == 'Enter') {
      e.preventDefault()

      let {
        response,
        isSuccessful
      } = await message_service.apiPostOrderMessges(props.order.id, message.value)

      if (isSuccessful) {
        await getOrderMessages()
        message.value.text = ''
      }
    }
  }

  const deleteMessage = async (messageId) => {
    let {
      response,
      isSuccessful
    } = await message_service.apiDeleteOrderMessge(props.order.id, messageId)

    if (isSuccessful) {
      await getOrderMessages()
    }
  }

  const showDelete = (message) => {
      message.displayDelete = true
  }

  const hideDelete = (message) => {
      message.displayDelete = false
  }
</script>

<template>
  "Messages "
  <div v-if="dataReady" class="block chat">
    <div class="messages-box">
      <p v-for="message in messages">
        <span v-if="!isMine(message)" :class="messageClass(message)">
          {{ `${message.user.name}: ${message.text}` }}
        </span>

        <div v-if="isMine(message)"
             :class="messageClass(message)"
             @mouseover="showDelete(message)" @mouseleave="hideDelete(message)">
          <span>{{ `${message.text}` }}</span>

          <button v-if="message.displayDelete"
                  type="button"
                  @click="deleteMessage(message.id)">
            delete
          </button>
        </div>
      </p>
    </div>

    <div class="input-box">
      <form>
        <input class="chat-input" type="text" v-model="message.text"
              @keypress="postMessage"/>
      </form>
        
    </div>
  </div>
</template>

<style>
  .chat {
    display: flex;
    flex-direction: column;

    width: 200px;
    height: 400px;
  }

  .messages-box {
    flex: 2;
    overflow-y: scroll;
  }

  .message {
    display: flex;
    flex-direction: column;
  }

  .other-message {
    align-items: flex-start;
    background-color: rgb(134, 132, 132);
  }

  .my-message {
    align-items: flex-end;
    background-color: rgb(209, 208, 208);
  }

  .input-box {    
    display: flex;
    flex-direction: column;
    flex: 0.1;
  }

  .chat-input {
    display: flex;
    /* flex-direction: column; */
    flex: 2;
  }

  .chat-send_button {
    display: flex;
    flex: 1;
  }    
</style>