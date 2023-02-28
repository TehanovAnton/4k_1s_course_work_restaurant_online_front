<script setup>
  import { ref } from 'vue';
  import DishForm from '../../components/dishes/DishForm.vue';
  import dishApi from '../services/api/model_api'
  import tokensService from '../services/tokensService';
  import dishCreateService from '../services/modelCreateServices/modelCreateService'

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
    let successfullCallback = () => emits('data-change')
    dishCreateService.createModel(dishApi, args, successfullCallback, errors)
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