<script setup>
  import { computed, ref } from 'vue'
  import router from '../../../router/router';
  import { AuthenticationApi } from '../../../views/services/api/authentication/AuthenticationApi';
  import { useResetPasswordInstructionsFormErrorsStore } from './stores/ResetPasswordInstructionsFormErrorsStore'
  import FormSettableButtons from '../../../components/forms/FormSettableButtons.vue';
  import { ButtonSetting } from '../../services/buttons/ButtonSetting';
  import FloatLabelInput from '../../../components/forms/FloatLabelInput.vue';

  const errorsStore = useResetPasswordInstructionsFormErrorsStore()

  const primaryButton = computed(() => {
    const button = new ButtonSetting('Send Instructions', true,  async () => await sendResetPasswordInstructions())
    return button
  })

  const secondaryButton = computed(() => {
    const button = new ButtonSetting('Sign In', true, signIn)
    
    return button
  })


  const customer = ref({
      email: 'anton@gmail.com'
  })
  
  const signIn = () => {
    router.push({name: 'sign_in'})
  }

  const sendResetPasswordInstructions = async () => {
    let args = {
      url: `${import.meta.env.VITE_BACK_HOST}/users/send_reset_password`,
      requestOptions: {
        params: { reset_password: { email: customer.value.email } }
      }
    }
    const requester = new AuthenticationApi(args)

    await requester.requestBase('get', errorsStore, signIn)
  }
  
</script>

<template>
  <FormSettableButtons
    :primary-button="primaryButton" :secondary-button="secondaryButton" :errors-store="errorsStore"
    @primaryBtnClick="primaryButton.callback" @secondaryBtnClick="secondaryButton.callback"
  >
    <div class="col-lg-6">
      <FloatLabelInput label="Emait" label-id="customer-email">
        <input type="text" id="customer-email" class="form-control" v-model="customer.email" />
      </FloatLabelInput>
    </div>
  </FormSettableButtons>
</template>
