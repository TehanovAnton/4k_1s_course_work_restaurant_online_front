<script setup>
  import { ref } from 'vue';
  import DishForm from '../../components/dishes/DishForm.vue';
  import dishApi from '../services/api/model_api'
  import tokensService from '../services/tokensService';

  const props = defineProps(['menu'])
  const emits = defineEmits(['data-change'])

  const dish = ref({ name:'', menu_id: props.menu.id })
  const errors = ref([])

  const createDish = async () => {
    let args = {
      postUrl: `http://localhost:3000/menus/${dish.value.menu_id}/dishes`,
      data: dish.value,
      requestOptions: { 
        headers: tokensService.auth_headers()
      }
    }  
  
    let { response, isSuccessful } = await dishApi.apiCreateModel(args)


    if (isSuccessful) {
      emits('data-change')
    } else {
      Object.keys(response.data).forEach((attribute) => {
        let attributeErrosMessages = response.data[attribute]      
        errors.value.push(attributeErrosMessages[0])
      })
    }
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