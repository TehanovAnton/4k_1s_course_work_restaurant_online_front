<script setup>
  import { computed, ref } from 'vue';
  import MenuForm from '../../components/menus/MenuForm.vue';
  import menuCreateService from '../services/modelCreateServices/modelCreateService'
  import menuApi from '../services/api/model_api'
  import tokensService from '../services/tokensService';
  import { useContentsStore } from '../restaurants/stores/ContentsStore';
  import { useRestaurantsStore } from '../restaurants/stores/RestaurantsStore';

  const props = defineProps(['restaurant'])
  const emits = defineEmits(['data-change'])

  const contentsStore = useContentsStore()
  const restaurantsStore = useRestaurantsStore()
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

    await menuCreateService.createModel(menuApi, args, errors, () => {
      contentsStore.setContent('RestaurantShowView')
    })
  }

</script>

<template>
  <p v-for="error in errors">
    {{ error }}
  </p>

  <MenuForm action-name="create" :menu="menu"
            @form-submit="createMenu" />
</template>