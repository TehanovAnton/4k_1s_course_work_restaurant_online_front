<script setup>
import ShowDish from '../../components/dishes/ShowDish.vue';
import router from '../../router/router';
import service from '../services/menus/menu_service'
import tokensService from '../services/tokensService';

const props = defineProps(['dishes','menu', 'deleteModeAlowability'])

const menuDishesView = () => router.push({ name:'menu_dishes', params:{ menuId:props.menu.id } })
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
    <span>Name: <a href="#" @click="menuDishesView">{{ menu.name }}</a></span>

    <div class="block centrenize-content-column">
      Dishes:
      <ShowDish v-for="dish in dishes" :dish="dish" />
    </div>

    <button v-if="deleteModeAlowability"
            type="button"
            @click="destroyMenu()">destroy</button>
  </div>
</template>