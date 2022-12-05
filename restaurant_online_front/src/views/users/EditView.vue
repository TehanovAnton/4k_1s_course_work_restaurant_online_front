<script setup>
  import { ref } from 'vue';
  import UserForm from '../../components/users/UserForm.vue';  
  import service from '../services/users/user_service'
  import tokensService from '../services/tokensService';

  const props = defineProps(['user'])
  const emits = defineEmits(['data-change'])

  const updatUser = async () => {
    let { 
      response, 
      isSuccessful
    } = await service.apiUpdateUser(tokensService.auth_headers(), props.user)

    if (isSuccessful) {      
      tokensService.setAuthTokens(response.headers)
      emits('data-change')
    }
  }
</script>

<template>
  <UserForm :user="user" action-name="update" @form-submit="updatUser"/>
</template>