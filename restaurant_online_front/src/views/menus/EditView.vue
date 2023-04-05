<script setup>
  import { computed, ref } from '@vue/reactivity';
  import MenuForm from '../../components/menus/MenuForm.vue';
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
  const errorsPresent = computed(() => menuFormErrorsStore.errorsPresent)
  const showRestaurant = () => {
    menuFormErrorsStore.clearErrors()
    contentsStore.setContent('RestaurantShowView')
  }

  const currentMenuCopy = ref(Object.assign({}, menusStore.currentMenu))

  const updatMenu = async (menu) => {
    let { 
      response, 
      isSuccessful
    } = await service.apiUpdateMenu(tokensService.auth_headers(), menu)

    if (isSuccessful) {
      tokensService.setAuthTokens(response.headers)

      menusStore.updateAndSetCurrent(response.data, { view: 'with_dishes' })
      menuFormErrorsStore.clearErrors()
      contentsStore.setContent('RestaurantShowView')
    } else {
      menuFormErrorsStore.setErrors(response.data)
    }
  }
</script>

<template>
  <CurrentMenu>
    <div class="menu-form-errors" v-if="errorsPresent">
      <ul>
        <li v-for="error in menuFormErrorsStore.errors.value">
          {{ error }}
        </li>
      </ul>
    </div>
  </CurrentMenu>
  <MenuForm :menu="currentMenuCopy" action-name="update"
            @form-submit="updatMenu" @cancel="showRestaurant"/>
</template>