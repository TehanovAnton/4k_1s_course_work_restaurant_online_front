<script setup>
  import ErrorsVue from '../../components/errors/Errors.vue';
  import axios from 'axios';
  import { ref } from 'vue'
  import router from '../../router/router'
  import tokensService from '../services/tokensService';
  import userService from '../services/users/user_service'

  import { useCurrentUserStore } from '../../stores/users/currentUser';
  const currentUserStore = useCurrentUserStore()

  const customer = ref({
      email: 'anton@gmail.com',
      password: 'ewqqwe',
  })
  const errors = ref([])

  const sign_in = async () => {
    let response = await axios.post('http://localhost:3000/auth/sign_in', customer.value)
    .catch((error) => {        
      errors.value = error.response.data.errors;
    })
        
    if (response && response.status === 200) {          
      tokensService.setAuthTokens(response.headers)

      let userRepsonse = await userService.apiShowUser(tokensService.auth_headers(), response.data.data.id)      
      currentUserStore.setCurrentUser(userRepsonse.response.data)
            
      tokensService.setAuthTokens(userRepsonse.response.headers)

      router.push({ name: 'home' })
    }
  }

  const sign_up = () => {
    router.push({ name:'sign_up' })
  }
</script>

<template>
    <ErrorsVue :errors="errors"/>
    
    <form class="sign-in-form centrenize-content-row">
        <div class="form-elements centrenize-content-column">
            <input type="text" class="form-element" v-model="customer.email" />

            <input type="text" class="form-element"  v-model="customer.password" />
            
            <div>
                <button type="button" class="form-element" @click="sign_in">Sign In</button>
                <button type="button" class="form-element" @click="sign_up">Sign Up</button>    
            </div>
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