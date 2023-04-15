<script setup>
  import { computed, ref } from '@vue/reactivity';
  import MenuForm from '../../components/menus/MenuForm.vue';
  import Errors from '../../components/errors/Errors.vue';
  import CurrentMenu from './v1/components/CurrentMenu.vue';
  import service from '../services/menus/menu_service'
  import tokensService from '../services/tokensService';
  import { useMenusStore } from './stores/MenusStore';
  import { useContentsStore } from '../restaurants/stores/ContentsStore';
  import { useMenuFormErrorsStore } from './stores/MenuFormErrorsStore'

  const emits = defineEmits(['data-change'])

  const menusStore = useMenusStore()
  const contentsStore = useContentsStore()
  const menuFormErrorsStore = useMenuFormErrorsStore()
  const showRestaurant = () => {
    menuFormErrorsStore.clearErrors()
    contentsStore.setContent('RestaurantShowView')
  }

  const currentMenuCopy = ref(Object.assign({}, menusStore.currentMenu))

  const updatMenu = async (menu) => {
    await service.apiUpdateMenu(tokensService.auth_headers(), menu, menuFormErrorsStore, (reqResponse) => {
      let { response } = reqResponse

      tokensService.setAuthTokens(response.headers)

      menusStore.updateAndSetCurrent(response.data, { view: 'with_dishes' })
      menuFormErrorsStore.clearErrors()
      contentsStore.setContent('RestaurantShowView')
    })
  }
</script>

<template>
  <Errors :errors-store="menuFormErrorsStore" />

  <div class="edit-menu-container">
    <MenuForm :menu="currentMenuCopy" action-name="update" :from-label="'Edit Menu'"
            @form-submit="updatMenu" @cancel="showRestaurant"/>
  </div>
</template>

<style lang="scss">
  .edit-menu-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px;
  }
</style>