<script setup>
  import axios from 'axios';
  import router from '../../router/router'
  import { ref } from 'vue'

  const customer = ref({
    name: 'clone3',
    email: 'clone3@gmail.com',
    password: 'ewqqwe',
    password_confirmation: 'ewqqwe',
    confirm_success_url: '/',
    type: 'Customer'
  })

  const sign_up = async () => {
    let response = await axios.post('http://localhost:3000/auth', customer.value)
    .catch((error) => {
      console.log(error);
    })
    
    debugger
    if (response && response.status === 200) {
      router.push({ name: 'sign_in' })
    } else {
      debugger
      errors = JSON.parse(response.data)
    }
  }
</script>

<template>
  <form>
    <p>
      <input type="text" v-model="customer.name" />
    </p>

    <p>
      <input type="text" v-model="customer.email" />
    </p>

    <p>
      <input type="text" v-model="customer.password" />
    </p>

    <p>
      <input type="text" v-model="customer.password_confirmation" />
    </p>
    
    <button type="button" @click="sign_up">Sign Up</button>
  </form>
</template>