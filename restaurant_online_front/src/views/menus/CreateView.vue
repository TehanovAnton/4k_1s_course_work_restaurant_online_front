<script setup>
  import { onBeforeMount, ref } from 'vue';
  import MenuForm from '../../components/menus/MenuForm.vue';
  import menuCreateService from '../services/modelCreateServices/modelCreateService'
  import menuApi from '../services/api/model_api'
  import tokensService from '../services/tokensService';

  onBeforeMount(() => {
    menu.value.restaurant_id = props.restaurant.id
  })

  const props = defineProps(['restaurant'])
  const emits = defineEmits(['data-change'])

  const menu = ref({ name:'', restaurant_id: '' })
  const errors = ref([])

  const createMenu = async () => {    
    let args = {
      postUrl: `http://localhost:3000/restaurants/${menu.value.restaurant_id}/menus`,
      data: menu.value,
      requestOptions: { 
        headers: tokensService.auth_headers()
      }
    }
    let successfullCallback = () => emits('data-change')
    menuCreateService.createModel(menuApi, args, successfullCallback, errors)
  }

</script>

<template>
  <p v-for="error in errors">
    {{ error }}
  </p>

  <MenuForm action-name="create" :menu="menu"
            @form-submit="createMenu" />
</template>