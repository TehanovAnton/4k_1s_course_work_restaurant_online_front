<script setup>
  import { computed, ref } from 'vue';
  import DishForm from '../../components/dishes/form/DishForm.vue';
  import dishApi from '../services/api/model_api'
  import tokensService from '../services/tokensService';
  import dishCreateService from '../services/modelCreateServices/modelCreateService'
  import { useMenusStore } from '../menus/stores/MenusStore';
  import { useContentsStore } from '../restaurants/stores/ContentsStore';

  const props = defineProps(['menu'])
  const emits = defineEmits(['data-change'])

  const menusStore = useMenusStore()
  const currentMenu = computed(() => menusStore.currentMenu)
  const contentsStore = useContentsStore()
  const dish = ref({ name:'', menu_id: currentMenu.value.id })
  const errors = ref([])

  const createDish = async (modefiedDish) => {
    let args = {
      postUrl: `http://localhost:3000/menus/${currentMenu.value.id}/dishes`,
      data: modefiedDish.attributes,
      requestOptions: { 
        headers: tokensService.auth_headers()
      }
    }
    await dishCreateService.createModel(dishApi, args, errors, () => {
      menusStore.updateAndSetCurrent(currentMenu.value, { view:'with_dishes' })
      contentsStore.setContent('RestaurantShowView')
    })
  }

</script>

<template>
  <p v-for="error in errors">
    {{ error }}
  </p>

  <div class="block">
    Add Dish:
    <DishForm action-name="create" :dish="dish"
              @form-submit="createDish" />
  </div>

  <slot />
</template>