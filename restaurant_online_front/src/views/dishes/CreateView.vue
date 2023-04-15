<script setup>
  import { computed, ref } from 'vue';
  import DishForm from '../../components/dishes/form/DishForm.vue';
  import Errors from '../../components/errors/Errors.vue';
  import dishApi from '../services/api/model_api'
  import tokensService from '../services/tokensService';
  import dishCreateService from '../services/modelCreateServices/modelCreateService'
  import { useMenusStore } from '../menus/stores/MenusStore';
  import { useContentsStore } from '../restaurants/stores/ContentsStore';
  import { useDishFormErrorsStore } from './stores/dishFormErrorsStore';

  const props = defineProps(['menu'])
  const emits = defineEmits(['data-change'])

  const menusStore = useMenusStore()
  const currentMenu = computed(() => menusStore.currentMenu)
  const contentsStore = useContentsStore()
  const dishFormErrorsStore = useDishFormErrorsStore()
  const dish = ref({ name:'', menu_id: currentMenu.value.id })

  const createDish = async (modefiedDish) => {
    let args = {
      postUrl: `http://localhost:3000/menus/${currentMenu.value.id}/dishes`,
      data:'',
      requestOptions: { 
        headers:''
      }
    }
    args = args = dishApi.formDataArgs(args, modefiedDish.attributes, tokensService.auth_headers())

    await dishCreateService.createModel(dishApi, args, dishFormErrorsStore, (_response) => {
      menusStore.updateAndSetCurrent(currentMenu.value, { view:'with_dishes' })
      contentsStore.setContent('RestaurantShowView')
    })
  }

  const showRestaurant = () => {
    dishFormErrorsStore.clearErrors()
    contentsStore.setContent('RestaurantShowView')
  }

</script>

<template>
  <Errors :errors-store="dishFormErrorsStore" />

  <div class="create-container">response
    <DishForm action-name="create" :dish="dish"
              @form-submit="createDish"
              @cancel="showRestaurant" />
  </div>
</template>

<style lang="scss">
  .create-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px;
  }
</style>