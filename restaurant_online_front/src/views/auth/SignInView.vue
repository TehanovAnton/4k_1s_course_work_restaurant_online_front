<script setup>
  import ErrorsVue from '../../components/errors/Errors.vue';
  import axios from 'axios';
  import { ref } from 'vue'
  import router from '../../router/router'
  import tokensService from '../services/tokensService';
  import userService from '../services/users/user_service'

  import { useCurrentUserStore } from '../../stores/users/currentUser';
  import DefaultForm from '../../components/forms/DefaultForm.vue';
  const currentUserStore = useCurrentUserStore()

  const customer = ref({
      email: 'anton_company@gmail.com',
      password: 'ewqqwe',
  })
  const errors = ref([])

  const sign_in = async () => {
    let response = await axios.post(
      `${import.meta.env.VITE_BACK_HOST}/auth/sign_in`,
      customer.value
    ).catch((error) => {        
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

  const resetPassword = () => {
    router.push({ name:'reset_password_instructions' })
  }
</script>

<template>
    <ErrorsVue :errors="errors"/>

    <DefaultForm
      form-label="Sign in" primary-button="Sign in" secondary-button="Sign up"
      @primaryBtnClick="sign_in" @secondaryBtnClick="sign_up"
    >
      <div class="col-lg-6">
        <div class="form-floating mb-3">
          <input v-model="customer.email" type="email" class="form-control" id="customer-email" placeholder="name@example.com" />
          <label for="customer-email">Email</label>
        </div>

        <div class="form-floating mb-3">
          <input v-model="customer.password" type="text" class="form-control" id="customer-password" />
          <label for="customer-password">Password</label>
        </div>

        <a href="#" @click="resetPassword">Forget password</a>
      </div>
    </DefaultForm>
</template>
