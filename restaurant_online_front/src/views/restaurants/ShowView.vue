<script setup>
  import Modes from '../../components/Modes.vue';
  import EditRestaurant from './EditView.vue'
  import tokensService from '../services/tokensService';
  import service from '../services/restaurants/restaurant_service'
  import { ref } from 'vue';
  import router from '../../router/router';
  import IndexMessages from '../meessages/RestaurantMessagesIndexView.vue'

  const props = defineProps(['restaurant'])  
  const emits = defineEmits(['data-change'])
// 
  const modes = ref(['show', 'edit', 'delete', 'message'])
  const modesProperties = ref({
    show:{ action:'show', allowed:true, visible:true },
    message:{ action:'message', allowed:true, visible:true },
    edit:{ action:'update', allowed:false, visible:true },
    delete:{ action:'destroy', allowed:false, visible:false } 
  })
  const currentMode = ref('show')
  const modesClass = ref('restaurant-class')
  const setMode = (modeName) => currentMode.value = modeName  
  const modeAlowability = (mode) => modesProperties.value[mode].allowed
// 
  const showDataChange = () => {    
    setMode('show')
    emits('data-change')
  }

  const destroyRestaurant = async () => {
    let { 
      response, 
      isSuccessful
    } = await service.apiDestroyRestaurants(tokensService.auth_headers(), props.restaurant)

    if (isSuccessful) {      
      tokensService.setAuthTokens(response.headers)
      emits('data-change')
    }
  }  

  const restaurantMenus = () => router.push({ name:'restaurant_menus', params:{ id: props.restaurant.id } })
</script>

<template>
  <div>
    <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
           :current-mode="currentMode"  :record="restaurant"                :service="service"
           @set-mode="setMode"/>

    <div v-if="currentMode == 'show'">
      <div class="centrenize-content-column">
        
        <div class="centrenize-content-row">
          Name: {{ restaurant.name }}
          <button type="button" @click="restaurantMenus">menus</button>
        </div>

        <button v-if="modeAlowability('delete')"
                type="button"
                @click="destroyRestaurant()">destroy</button>
      </div>
    </div>

    <div v-if="currentMode == 'edit'">
      <EditRestaurant :restaurant="restaurant" @data-change="showDataChange" />
    </div>  

    <div v-if="currentMode == 'message'">
      <IndexMessages :restaurant="restaurant" />
    </div>
  </div>
</template>