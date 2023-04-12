<script setup>
import ShowDish from '../../components/dishes/ShowDish.vue';
import router from '../../router/router';
import service from '../services/menus/menu_service'
import tokensService from '../services/tokensService';
import { computed } from '@vue/reactivity';

const props = defineProps(['menu', 'deleteModeAlowability'])
const dishes = computed(() => {
  return props.menu.dishes
})

const destroyMenu = async () => {
  let { 
    response, 
    isSuccessful
  } = await service.apiDestroyMenu(tokensService.auth_headers(), props.menu)

  if (isSuccessful) {      
    tokensService.setAuthTokens(response.headers)
    emits('data-change')
  }
}
</script>

<template>
  <div class="centrenize-content-column">
    <span>Name: {{ menu.name }}</span>

    <div class="block centrenize-content-column">
      Dishes:
      <ShowDish v-for="dish in dishes" :dish="dish" />
    </div>

    <button v-if="deleteModeAlowability"
            type="button"
            @click="destroyMenu()">destroy</button>
  </div>
</template>