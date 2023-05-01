<script setup>

  // import router from '../../router/router'
  import { ref } from 'vue'
  import Errors from '../../errors/Errors.vue'
  import { AuthenticationApi } from '../../../views/services/api/authentication/AuthenticationApi'
  import user_service from '../../../views/services/users/user_service';
  import { useCreateCookAccountFormErrorsStore } from './CreateCookAccountFormErrorsStore'
import tokensService from '../../../views/services/tokensService';
import { useCurrentUserStore } from '../../../stores/users/currentUser';
import RegularFormStyle from '../../stylecomponents/RegularFormStyle.vue';

  const createCookAccountFormErrorsStore = useCreateCookAccountFormErrorsStore()
  const currentUserStore = useCurrentUserStore()

  const formUser = ref({
    name: 'clone3',
    email: 'clone3@gmail.com',
    password: 'ewqqwe',
    password_confirmation: 'ewqqwe',
    confirm_success_url: '/',
    type: 'Cook'
  })

  const cookUserBinding = ref({
    cook_user_binding_attributes: {
      user_id: ''
    }
  })
  const bindingUser = ref({ email: '' })

  const sign_up = async () => {

    await user_service.requestBase(
      {
        url: `http://localhost:3000/users/show_by_email`,
        data: {
          headers: tokensService.auth_headers(),
          params: { email: bindingUser.value.email }
        }
      },
      'get',
      createCookAccountFormErrorsStore,
      (response) => {
        bindingUser.value = response.data
      }
    )

    if (!!!bindingUser.value.id)
      return

    cookUserBinding.value.cook_user_binding_attributes.user_id = bindingUser.value.id
    formUser.value.cook_user_binding_attributes = cookUserBinding.value.cook_user_binding_attributes
    
    const requester = new AuthenticationApi({
      url: `http://localhost:3000/users/${currentUserStore.user.id}/create_cook`,
      data: { user: formUser.value },
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    })

    await requester.postCreateUser(
      createCookAccountFormErrorsStore, 
      (response) => {
        createCookAccountFormErrorsStore.errors.value.push('User created')
        formUser.value = {} 
      }
    )
  }
</script>

<template>
  <Errors :errors-store="createCookAccountFormErrorsStore" />

  <RegularFormStyle>
    <form id="cook-form" class="form">
      <label for="cook-form">Create Cook</label>

      <div class="form__content">
        <label for="cook-name">Name</label>
        <input id="cook-name" type="text" class="text-input" v-model="formUser.name" />

        <label for="cook-email">Email</label>
        <input id="cook-name" type="text" class="text-input" v-model="formUser.email" />

        <label for="cook-dind-user-email">Bind User Email</label>
        <input id="cook-dind-user-email" type="text" class="text-input" v-model="bindingUser.email" />

        <label for="cook-password">Password</label>
        <input id="cook-password" type="text" class="text-input" v-model="formUser.password" />

        <label for="cook-password-confirmation">Password Confirmation</label>
        <input id="cook-password-confirmation" type="text" class="text-input" v-model="formUser.password_confirmation" />
      </div>
      
      <div class="form__actions">
        <button type="button" @click="sign_up">Create Cook</button>
      </div>
    </form>
  </RegularFormStyle>
</template>
