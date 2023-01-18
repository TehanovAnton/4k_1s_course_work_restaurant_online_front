<script setup>
  import DishForm from '../../components/dishes/DishForm.vue';
  import dishApi from '../services/api/model_api'
  import tokensService from '../services/tokensService';

  const props = defineProps(['dish'])
  const emits = defineEmits(['data-change'])

  const updatMenu = async () => {
    let args = {
      updateUrl: `http://localhost:3000/dishes/${props.dish.id}`,
      data: props.dish,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }

    let isSuccessful = await dishApi.apiUpdateModel(args)

    if (isSuccessful) {      
      emits('data-change')
    }
  }
</script>

<template>
  <div class="block">
    Edit Dish:
    <DishForm :dish="dish" action-name="update" @form-submit="updatMenu"/>
  </div>  
</template>