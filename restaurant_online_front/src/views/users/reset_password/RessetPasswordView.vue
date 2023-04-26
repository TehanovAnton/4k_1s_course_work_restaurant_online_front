<script setup>

  import { onBeforeMount, ref } from 'vue';
  import { AuthenticationApi } from '../../services/authentication/AuthenticationApi'
  import { useResetPasswordFormErrorsStore } from '../reset_password/stores/ResetPasswordFormErrorsStore'
  import tokensService from '../../services/tokensService';
  import router from '../../../router/router';
  import Errors from '../../../components/errors/Errors.vue'

  onBeforeMount(() => {
    const headers = router.currentRoute.value.query
    tokensService.setAuthTokens(headers)
  })

  const resetPasswordFormErrorsStore = useResetPasswordFormErrorsStore()
  const formObject = ref({})

  const resetPassword = async () => {
    let args = {
      url: 'http://localhost:3000/auth/password',
      data: { 
        password: formObject.value.password,
        password_confirmation: formObject.value.password_confirmation,
      },
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
    const requester = new AuthenticationApi(args)

    await requester.requestBase(
      'put',
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