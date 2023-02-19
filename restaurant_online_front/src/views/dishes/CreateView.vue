<script setup>
  import { ref } from 'vue';
  import DishForm from '../../components/dishes/DishForm.vue';
  import dish_service from '../services/dishes/DishesService';
  import dishApi from '../services/api/model_api'
  import tokensService from '../services/tokensService';

  const props = defineProps(['menu'])
  const dish = ref({ name:'', menu_id: props.menu.id })
  const emits = defineEmits(['data-change'])

  const createDish = async () => {
    let args = {
      postUrl: `http://localhost:3000/menus/${dish.value.menu_id}/dishes`,
      data: dish.value,
      requestOptions: { 
        headers: tokensService.auth_headers()
      }
    }

    let isSuccessful = await dishApi.apiCreateModel(args)

    if (isSuccessful) {      
      emits('data-change')
    }
  }

</script>

<template>
  <div class="block">
    Add Dish:
    <DishForm action-name="create" :dish="dish"
            @form-submit="createDish" />
  </div>

  <slot />
</template>