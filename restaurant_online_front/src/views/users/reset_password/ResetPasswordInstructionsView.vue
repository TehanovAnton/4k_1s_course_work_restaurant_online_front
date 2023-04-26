<script setup>
  import Errors from '../../../components/errors/Errors.vue';
  import { ref } from 'vue'
  import router from '../../../router/router';
  import { AuthenticationApi } from '../../../views/services/authentication/AuthenticationApi';
  import { useResetPasswordInstructionsFormErrorsStore } from './stores/ResetPasswordInstructionsFormErrorsStore'

  const errorsStore = useResetPasswordInstructionsFormErrorsStore()

  const customer = ref({
      email: 'anton@gmail.com'
  })

  const sendResetPasswordInstructions = async () => {
    const requester = new AuthenticationApi({
      url: 'http://localhost:3000/users/send_reset_password',
      data: { 
        params: { reset_password: { email: customer.value.email } }
      },
      options: {}
    })

    await requester.requestBase(
      'get',
      errorsStore,
      () => {
        router.push({name: 'sign_in'})
      }
    )
  }
</script>

<template>
    <Errors :errors-store="errorsStore" />
    
    <form class="sign-in-form centrenize-content-row">
      <div class="form-elements centrenize-content-column">
        <input type="text" class="form-element" v-model="customer.email" />
        
        <div>
            <button type="button" class="form-element" @click="sendResetPasswordInstructions">Send Instructions</button>    
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