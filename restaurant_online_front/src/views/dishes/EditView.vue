<script setup>
  import DishForm from '../../components/dishes/DishForm.vue';
  import dishApi from '../services/api/model_api'
  import tokensService from '../services/tokensService';
  import { useDishesStore } from './stores/DishesStore';
  import { useContentsStore } from '../restaurants/stores/ContentsStore';

  const emits = defineEmits(['data-change'])

  const dishesStore = useDishesStore()
  const contentsStore = useContentsStore()
 
  const showRestaurant = () => contentsStore.setContent('RestaurantShowView')
  const updateDish = async (modefiedDish) => {
    let args = {
      updateUrl: `http://localhost:3000/dishes/${modefiedDish.id}`,
      data: modefiedDish.updateAttributes,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
    let { isSuccessful } = await dishApi.apiUpdateModel(args)

    if (isSuccessful) {
      contentsStore.setContent('RestaurantShowView')
    }
  }
</script>

<template>
  <div class="block">
    Edit Dish:
    <DishForm :dish="dishesStore.currentDish" action-name="update"
              @form-submit="updateDish" @cancel="showRestaurant"/>
    <slot />
  </div>  
</template>