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

  const props = defineProps(['restaurant'])
  const emits = defineEmits(['data-change'])

  const contentsStore = useContentsStore()
  const restaurantsStore = useRestaurantsStore()
  const menusStore = useMenusStore()
  const menuFormErrorsStore = useMenuFormErrorsStore()

  const currentRestaurant = computed(() => restaurantsStore.currentRestaurant)
  const menu = ref({ restaurant_id: currentRestaurant.value.id })
  const errors = ref([])

  const createMenu = async (modefiedMenu) => {
    let args = {
      postUrl: `http://localhost:3000/restaurants/${currentRestaurant.value.id}/menus`,
      data: modefiedMenu.attributes,
      requestOptions: {     
        headers: tokensService.auth_headers()
      }
    }

    await menuCreateService.createModel(menuApi, args, menuFormErrorsStore, (response) => {
      menusStore.updateAndSetCurrent(response.data, { view: 'with_dishes' })
      menuFormErrorsStore.clearErrors()
      contentsStore.setContent('RestaurantShowView')
    })
  }

  const restaurantShow = () => {
    contentsStore.setContent('RestaurantShowView')
  }

</script>

<template>
  <p v-for="error in errors">
    {{ error }}
  </p>

  <div class="create-menu-container">
    <MenuForm action-name="create" :menu="menu" from-label="New Menu"
              @form-submit="createMenu" @cancel="restaurantShow" />
  </div>
</template>

<style lang="scss">
  .create-menu-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px;
  }
</style>