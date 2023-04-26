<script setup>

  // import router from '../../router/router'
  import { ref } from 'vue'
  import Errors from '../../errors/Errors.vue'
  import { AuthenticationApi } from '../../../views/services/authentication/AuthenticationApi';
  import user_service from '../../../views/services/users/user_service';
  import { useCreateCookAccountFormErrorsStore } from './CreateCookAccountFormErrorsStore'
import tokensService from '../../../views/services/tokensService';
import { useCurrentUserStore } from '../../../stores/users/currentUser';

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

  <form class="sign-up-form centrenize-content-row">
    <div class="form-elements centrenize-content-column">
      <input type="text" class="form-element" v-model="formUser.name" />

      <input type="text" class="form-element" v-model="formUser.email" />

      <input type="text" class="form-element" v-model="bindingUser.email" />

      <input type="text" class="form-element" v-model="formUser.password" />

      <input type="text" class="form-element" v-model="formUser.password_confirmation" />
      
      <div>
        <button type="button" class="form-element" @click="sign_up">Create Cook</button>
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

  .sign-up-form {
    height: 35em;
  }
</style>
