<script setup>
  import { ref } from 'vue';
  import UserForm from '../../components/users/UserForm.vue';
  import user_service from '../services/users/user_service';
  import tokensService from '../services/tokensService';
  
  const emits = defineEmits(['data-change'])
  const newUser = ref({ name:'', email:'', password:'ewqqwe', password_confirmation:'ewqqwe', type:'Customer'})

  const createUser = async () => {
    let {
      response,
      isSuccessful
    } = await user_service.apiCreateUser(tokensService.auth_headers(), newUser.value)

    if (isSuccessful) {      
      tokensService.setAuthTokens(response.headers)
      emits('data-change')
    }
  }
</script>

<template>  
  <UserForm :user="newUser" action-name="create" @form-submit="createUser"/>
</template>