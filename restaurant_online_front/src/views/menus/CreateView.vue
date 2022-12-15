<script setup>
  import { onBeforeMount, ref } from 'vue';
  import MenuForm from '../../components/menus/MenuForm.vue';
  import menu_service from '../services/menus/menu_service';
  import tokensService from '../services/tokensService';

  onBeforeMount(() => {
    menu.value.restaurant_id = props.restaurant.id
  })

  const props = defineProps(['restaurant'])
  const menu = ref({ name:'', restaurant_id: '' })
  const emits = defineEmits(['data-change'])

  const createMenu = async () => {    
    let { 
      response, 
      isSuccessful
    } = await menu_service.apiCreateMenu(tokensService.auth_headers(), menu.value)

    if (isSuccessful) {      
      tokensService.setAuthTokens(response.headers)
      emits('data-change')
    }
  }

</script>

<template>
  <MenuForm action-name="create" :menu="menu"
            @form-submit="createMenu" />
</template>