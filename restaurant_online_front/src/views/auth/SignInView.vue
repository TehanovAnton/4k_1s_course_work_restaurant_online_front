<script setup>
  import axios from 'axios';
  import { ref } from 'vue'
  import router from '../../router/router'
  import { useTokensStore } from '../../stores/tokens';

  const customer = ref({
    email: 'clone3@gmail.com',
    password: 'ewqqwe',
  })
  const tokens = useTokensStore();
  const user = ref({})

  const testRequest = async () => {
    debugger
    let response = await axios.get('http://localhost:3000/users/10', {
      headers: tokens.auth_headers
    })
    .catch((error) => {
      console.log(error);
    })
    
    if (response && response.status === 200) {
      user.value = response.data
    } else {
      errors = JSON.parse(response.data)
    }
  }

  const sign_in = async () => {
    let response = await axios.post('http://localhost:3000/auth/sign_in', customer.value)
    .catch((error) => {
      console.log(error);
    })
    
    if (response && response.status === 200) {
      tokens.setAuthTokens(response.headers)
      await testRequest()
    } else {
      errors = JSON.parse(response.data)
    }
  }
</script>

<template>
  <p v-if="user">
    {{ user }}
  </p>

  <form>
    <p>
      <input type="text" v-model="customer.email" />
    </p>

    <p>
      <input type="text" v-model="customer.password" />
    </p>
    
    <button type="button" @click="sign_in">Sign Up</button>
  </form>
</template>