<script setup>
  import { computed } from '@vue/reactivity';
  import MenuForm from '../../components/menus/MenuForm.vue';  
  import service from '../services/menus/menu_service'
  import tokensService from '../services/tokensService';

  const props = defineProps(['menu'])
  const emits = defineEmits(['data-change'])

  const fieldsForUpdate = ['name']
  const updatedMenu = computed(() => {
    let menuProto = { id: 1, name: 'breakfast' }
    // fieldsForUpdate.forEach(field => menuProto[field] = props.menu[field])

    return menuProto
  })

  const updatMenu = async (menu) => {
    let { 
      response, 
      isSuccessful
    } = await service.apiUpdateMenu(tokensService.auth_headers(), menu)

    if (isSuccessful) {   
      tokensService.setAuthTokens(response.headers)
      setUpdatedFields(menu)
      emits('data-change')
    }
  }  

  const setUpdatedFields = (menu) => {
    let exceptFields = ['id']
    Object.keys(menu)
    .filter(field => !exceptFields.includes(field))
    .forEach(field => { props.menu[field] = menu[field] })
  }
</script>

<template>
  <MenuForm :menu="updatedMenu" action-name="update" @form-submit="updatMenu"/>
</template>