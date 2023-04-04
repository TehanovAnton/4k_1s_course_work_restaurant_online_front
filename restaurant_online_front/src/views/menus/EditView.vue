<script setup>
  import { computed } from '@vue/reactivity';
  import MenuForm from '../../components/menus/MenuForm.vue';
  import CurrentMenu from './v1/components/CurrentMenu.vue';
  import service from '../services/menus/menu_service'
  import tokensService from '../services/tokensService';
  import { useMenusStore } from './stores/MenusStore';
  import { useContentsStore } from '../restaurants/stores/ContentsStore';

  const emits = defineEmits(['data-change'])

  const menusStore = useMenusStore()
  const contentsStore = useContentsStore()
  const currentMenu = computed(() => menusStore.currentMenu)
  const showRestaurant = () => contentsStore.setContent('RestaurantShowView')

  const updatMenu = async (menu) => {
    let { 
      response, 
      isSuccessful
    } = await service.apiUpdateMenu(tokensService.auth_headers(), menu)

    if (isSuccessful) {   
      tokensService.setAuthTokens(response.headers)

      menusStore.updateAndSetCurrent(response.data, { view: 'with_dishes' })
      contentsStore.setContent('RestaurantShowView')
    }
  }
</script>

<template>
  <CurrentMenu />
  <MenuForm :menu="currentMenu" action-name="update"
            @form-submit="updatMenu" @cancel="showRestaurant"/>
</template>