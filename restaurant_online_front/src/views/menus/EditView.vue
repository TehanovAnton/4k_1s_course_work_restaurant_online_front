<script setup>
  import { computed } from '@vue/reactivity';
  import MenuForm from '../../components/menus/MenuForm.vue';  
  import service from '../services/menus/menu_service'
  import tokensService from '../services/tokensService';

  const props = defineProps(['menu'])
  const emits = defineEmits(['data-change'])

  const updatedMenu = computed(() => {
    debugger
    return {
      name: props.menu.name
    }
  })

  const updatMenu = async (menu) => {
    debugger
    let { 
      response, 
      isSuccessful
    } = await service.apiUpdateMenu(tokensService.auth_headers(), menu)

    if (isSuccessful) {      
      tokensService.setAuthTokens(response.headers)
      emits('data-change')
    }
  }  
</script>

<template>
  <MenuForm :menu="updatedMenu" action-name="update" @form-submit="updatMenu"/>
</template>