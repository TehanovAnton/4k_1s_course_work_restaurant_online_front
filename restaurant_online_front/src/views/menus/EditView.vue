<script setup>
  import MenuForm from '../../components/menus/MenuForm.vue';  
  import service from '../services/menus/menu_service'
  import tokensService from '../services/tokensService';

  const props = defineProps(['menu'])
  const emits = defineEmits(['data-change'])

  const updatMenu = async () => {
    let { 
      response, 
      isSuccessful
    } = await service.apiUpdateMenu(tokensService.auth_headers(), props.menu)

    if (isSuccessful) {      
      // props.menu.value = response.data
      tokensService.setAuthTokens(response.headers)
      emits('data-change')
    }
  }
</script>

<template>  
  <MenuForm :menu="menu" action-name="update" @form-submit="updatMenu"/>
</template>