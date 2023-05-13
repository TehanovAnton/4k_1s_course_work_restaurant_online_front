<script setup>
  import ErrorsVue from '../../components/errors/Errors.vue';
  import axios from 'axios';
  import router from '../../router/router'
  import { ref } from 'vue'
  import DefaultForm from '../../components/forms/DefaultForm.vue';
  import TextInput from '../../components/forms/FloatLabelInput.vue';
  import { BaseApi } from '../services/api/baseApi';
  import { useSignUpFormErrorStore } from './stores/SignUpFormErrorStore'

  const signUpFormErrorStore = useSignUpFormErrorStore()

  const customer = ref({
      name: 'clone3',
      email: 'clone3@gmail.com',
      password: 'ewqqwe',
      password_confirmation: 'ewqqwe',
      confirm_success_url: '/',
      type: 'Customer'
  })
  const errors = ref([])

  const sign_up = async () => {
    let args = {
      url: 'http://localhost:3000/auth',
      data: customer.value,
      requestOptions: {}
    }
    let requester = new BaseApi(args)

    await requester.requestBase(
      'post',
      signUpFormErrorStore,
      (_response) => {
        router.push({ name: 'sign_in' })
      }
    )
  }

  const sign_in = () => {
    router.push({ name:'sign_in' })
  }
</script>   

<template>
    <DefaultForm
      form-label="Registration" primary-button="Sign up" secondary-button="Sign in"
      :errors-store="signUpFormErrorStore"
      @primaryBtnClick="sign_up" @secondaryBtnClick="sign_in"
    >
      <div class="col-lg-6">
        <TextInput label-id="customer-name" label="Name">
          <input type="text" id="customer-name" class="form-control" v-model="customer.name" />
        </TextInput>

        <TextInput label-id="customer-email" label="Email">
          <input type="text" id="customer-email" class="form-control" v-model="customer.email" />
        </TextInput>

        <TextInput label-id="customer-password" label="Password">
          <input type="text" id="customer-password" class="form-control" v-model="customer.password" />
        </TextInput>

        <TextInput label-id="customer-password_confirmation" label="Password Confirmation">
          <input type="text" id="customer-password_confirmation" class="form-control" v-model="customer.password" />
        </TextInput>
      </div>
    </DefaultForm>    
</template>
