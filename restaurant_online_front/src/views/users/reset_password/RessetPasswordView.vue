<script setup>

  import { ref } from 'vue';
  import { AuthenticationApi } from '../../services/authentication/AuthenticationApi'
  import { useResetPasswordFormErrorsStore } from '../reset_password/stores/ResetPasswordFormErrorsStore'
  import tokensService from '../../services/tokensService';
  import router from '../../../router/router';
  import Errors from '../../../components/errors/Errors.vue'

  const resetPasswordFormErrorsStore = useResetPasswordFormErrorsStore()
  const formObject = ref({})

  const resetPassword = async () => {
    const requester = new AuthenticationApi({
      url: 'http://localhost:3000/users/reset_password',
      data: { 
        reset_password: {
          email: formObject.value.email,
          passwords: {
            password: formObject.value.password,
            password_confirmation: formObject.value.password_confirmation,
          }
        } 
      }
    })

    await requester.postResetPassword(
      resetPasswordFormErrorsStore,
      (_response) => {
        sessionStorage.clear()
        router.push({ name: 'sign_in' })
      }
    )
  }
</script>

<template>
  <p>
    <Errors :errors-store="resetPasswordFormErrorsStore" />
  </p>

  <form>
    <p>
      <label for="email">Email</label>
    <input id="email" type="email" v-model="formObject.email">
    </p>

    <p>
      <label for="new-password">New password</label>
      <input id="new-password" type="text" v-model="formObject.password">
    </p>

    <p>
      <label for="new-password-confirmation">New password confirmation</label>
      <input id="new-password-confirmation" type="text" v-model="formObject.password_confirmation">
    </p>

    <button type="button" @click="resetPassword">Update</button>
  </form>
</template>