<script setup>

  import { computed, onBeforeMount, ref } from 'vue';
  import { AuthenticationApi } from '../../services/api/authentication/AuthenticationApi'
  import { useResetPasswordFormErrorsStore } from '../reset_password/stores/ResetPasswordFormErrorsStore'
  import tokensService from '../../services/tokensService';
  import router from '../../../router/router';
  import Errors from '../../../components/errors/Errors.vue'
  import FormSettableButtons from '../../../components/forms/FormSettableButtons.vue';
  import FloatLabelInput from '../../../components/forms/FloatLabelInput.vue';
  import { ButtonSetting } from '../../services/buttons/ButtonSetting';

  onBeforeMount(() => {
    const headers = router.currentRoute.value.query
    tokensService.setAuthTokens(headers)
  })

  const resetPasswordFormErrorsStore = useResetPasswordFormErrorsStore()
  const formObject = ref({})

  const primaryButton = computed(() => {
    const button = new ButtonSetting('Submit', true, resetPassword)

    return button
  })

  const secondaryButton = computed(() => {
    const button = new ButtonSetting('', false, () => {})
    return button
  })

  const resetPassword = async () => {
    let args = {
      url: `${import.meta.env.VITE_BACK_HOST}/auth/password`,
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
  <FormSettableButtons
    :primary-button="primaryButton" :secondary-button="secondaryButton" :errors-store="resetPasswordFormErrorsStore"
    @primaryBtnClick="primaryButton.callback" @secondaryBtnClick="secondaryButton.callback"
  >
    <div class="col-lg-6">
      <FloatLabelInput label="New Password" label-id="new-password">
        <input id="new-password" type="text" class="form-control" v-model="formObject.password" />
      </FloatLabelInput>

      <FloatLabelInput label="New Password Confirmation" label-id="new-password-confirmation">
        <input id="new-password-confirmation" type="text" class="form-control" v-model="formObject.password_confirmation" />
      </FloatLabelInput>
    </div>
  </FormSettableButtons>
</template>