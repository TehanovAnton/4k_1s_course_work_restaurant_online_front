<script setup>
  import { computed, ref } from 'vue';
  import MenuForm from '../../components/menus/MenuForm.vue';
  import menuCreateService from '../services/modelCreateServices/modelCreateService'
  import menuApi from '../services/api/model_api'
  import tokensService from '../services/tokensService';
  import { useContentsStore } from '../restaurants/stores/ContentsStore';
  import { useRestaurantsStore } from '../restaurants/stores/RestaurantsStore';
  import { useMenusStore } from './stores/MenusStore';
  import { useMenuFormErrorsStore } from './stores/MenuFormErrorsStore';
  import { BaseApi } from '../services/api/baseApi';
  import { CacncelToRestaurant } from '../services/cancele/CancelToRestaurant';

  const props = defineProps(['restaurant'])
  const emits = defineEmits(['data-change'])

  const contentsStore = useContentsStore()
  const restaurantsStore = useRestaurantsStore()
  const menusStore = useMenusStore()
  const menuFormErrorsStore = useMenuFormErrorsStore()

  const currentRestaurant = computed(() => restaurantsStore.currentRestaurant)
  const menu = ref({ restaurant_id: currentRestaurant.value.id })

  const createMenu = async (modefiedMenu) => {
    let args = {
      url: `${import.meta.env.VITE_BACK_HOST}/restaurants/${currentRestaurant.value.id}/menus`,
      data: modefiedMenu.attributes,
      requestOptions: {     
        headers: tokensService.auth_headers()
      }
    }
    let requester = new BaseApi(args)
    
    await requester.requestBase(
      'post',
      menuFormErrorsStore,
      (response) => {
        menusStore.updateAndSetCurrent(response.data, { view: 'with_dishes' })
        menuFormErrorsStore.clearErrors()
        contentsStore.setContent('RestaurantShowView')
      }
    )
  }

  const restaurantShow = () => {
    new CacncelToRestaurant().cancel()
  }

</script>

<template>
  <MenuForm
    action-name="create" :menu="menu" from-label="New Menu"
    @form-submit="createMenu" @cancel="restaurantShow"
  />
</template>
