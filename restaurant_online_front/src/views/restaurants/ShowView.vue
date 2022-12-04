<script setup>
  import { computed } from '@vue/reactivity';
  import { onBeforeMount, ref } from 'vue';
  import Modes from '../../components/Modes.vue';
  import EditRestaurant from './EditView.vue'
  import tokensService from '../services/tokensService';
  import service from '../services/restaurants/restaurant_service'

  const props = defineProps(['restaurant'])  
  const emits = defineEmits(['data-change'])
// 
  const modes = ref(['show', 'edit', 'delete'])
  const modesProperties = ref({
    show:{ action:'show', allowed:true, visible:true },
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
</script>

<template>
  <div>
    <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
           :current-mode="currentMode"  :record="restaurant"
           @set-mode="setMode"/>

    <div v-if="currentMode == 'show'">
      <div class="centrenize-content-column">
        Name: {{ restaurant.name }}
        <button v-if="modeAlowability('delete')"
                type="button"
                @click="destroyRestaurant()">destroy</button>
      </div>
    </div>

    <div v-if="currentMode == 'edit'">
      <EditRestaurant :restaurant="restaurant" @data-change="showDataChange" />
    </div>  
  </div>
</template>