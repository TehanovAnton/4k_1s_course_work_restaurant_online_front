<script setup>
  import { ref } from 'vue';
  import DishForm from '../../components/dishes/form/DishForm.vue';
  import Errors from '../../components/errors/Errors.vue';
  import dishApi from '../services/api/model_api'
  import tokensService from '../services/tokensService';
  import { useDishesStore } from './stores/DishesStore';
  import { useContentsStore } from '../restaurants/stores/ContentsStore';
  import { useDishFormErrorsStore } from './stores/dishFormErrorsStore';
  import CurrentMenu from '../menus/v1/components/CurrentMenu.vue';

  const emits = defineEmits(['data-change'])

  const dishesStore = useDishesStore()
  const contentsStore = useContentsStore()
  const dishFormErrorsStore = useDishFormErrorsStore()
 
  const showRestaurant = () => {
    dishFormErrorsStore.clearErrors()
    contentsStore.setContent('RestaurantShowView')
  }

  const currentDishCopy = ref(Object.assign({}, dishesStore.currentDish))

  const updateDish = async (modefiedDish) => {
    let formData = new FormData()

    Object.keys(modefiedDish.attributes).forEach((attribute) => {
      let attributeValue = modefiedDish.attributes[attribute],
          formAttribute = `dish[${attribute}]`
      formData.append(formAttribute, attributeValue)  
    })

    let headers = tokensService.auth_headers()
    headers["Content-Type"] = "multipart/form-data"

    let args = {
      updateUrl: `http://localhost:3000/dishes/${modefiedDish.id}`,
      data: formData,
      requestOptions: {
        headers: headers
      }
    }
    let { isSuccessful, response } = await dishApi.apiUpdateModel(args)

    if (isSuccessful) {
      contentsStore.setContent('RestaurantShowView')
    } else {
      dishFormErrorsStore.setErrors(response.data)
    }
  }
</script>

<template>
  <CurrentMenu>
    <Errors :errors-store="dishFormErrorsStore" />
  </CurrentMenu>

  <div class="block">
      Edit Dish:
      <DishForm :dish="currentDishCopy" action-name="update"
                @form-submit="updateDish" @cancel="showRestaurant"/>
    </div>
</template>