<script setup>
  import axios from 'axios';
  import { ref } from 'vue'
  import router from '../../router/router'
  import { useTokensStore } from '../../stores/tokens';

  const customer = ref({
    email: 'tehanovanton@gmail.com',
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
      router.push({ name: 'home' })
    } else {
      errors = JSON.parse(response.data)
    }
  }
</script>

<template>
    <form class="sign-in-form centrenize-content-row">
        <div class="form-elements centrenize-content-column">
            <input type="text" class="form-element" v-model="customer.email" />

            <input type="text" class="form-element"  v-model="customer.password" />
            
            <button type="button" class="form-element" @click="sign_in">Sign Up</button>
        </div>        
    </form>
</template>

<style>
    .block {
        border: 3px solid black;
        padding: 3px;
    }

    .centrenize-content-column {
        display: flex;
        justify-content: space-around;        
        flex-direction: column;
    }

    .centrenize-content-row {
        display: flex;
        justify-content: space-around;
        flex-direction: row;        
    }

    .form-elements {
        width: 20%;
        height: 100%;        
    }

    .form-element {
        margin: 7% 10% 7% 10%;
        flex: 1;
        font-size: 25px;
    }

    .sign-in-form {
        height: 20em;
    }
</style>