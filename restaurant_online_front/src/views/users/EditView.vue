<script setup>
  import { onBeforeMount, ref } from 'vue';
  import UserForm from '../../components/users/UserForm.vue';  
  import service from '../services/users/user_service'
  import tokensService from '../services/tokensService';

  const props = defineProps(['user'])
  const emits = defineEmits(['data-change', 'cancle'])

  const updatUser = async (formUser) => {
    let { 
      response, 
      isSuccessful
    } = await service.apiUpdateUser(tokensService.auth_headers(), formUser)

    if (isSuccessful) {      
      tokensService.setAuthTokens(response.headers)
      emits('data-change', response.data)
    }
  }
</script>

<template>
  <UserForm :user="user" action-name="update" label="Edit User"
            @form-submit="updatUser" @cancle="$emit('cancle')"/>
</template>  