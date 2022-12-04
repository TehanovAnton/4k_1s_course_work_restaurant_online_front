<script setup>
  import { computed } from '@vue/reactivity';
  import { onBeforeMount, ref } from 'vue';
  import ModeSwitch from '../../components/ModeSwitch.vue';
  import EditRestaurant from './EditView.vue'
  import tokensService from '../services/tokensService';
  import service from '../services/restaurants/restaurant_service'

  onBeforeMount(async () => {
    await getModesAllowabilities()    
    dataReady.value = true
  })

  const props = defineProps(['restaurant'])  
  const emits = defineEmits(['data-change'])
  const dataReady = ref('false')
// 
  const modes = ref(['show', 'edit', 'delete'])
  const modesProperties = ref({
    show:{ action:'show', allowed:true, visible:true },
    edit:{ action:'update', allowed:false, visible:true },
    delete:{ action:'destroy', allowed:false, visible:false } 
  })
  const currentMode = ref('show')
  const modesClass = ref('restaurant-class')
  const modeClassName = computed(() => `${props.restaurant.name}-${modesClass}`)

  const setMode = (modeName) => {
    if (currentMode.value !== modeName) {
      currentMode.value = modeName
    } else {
      currentMode.value = modeName
    }
  }

  const getModesAllowabilities = async () => {
    modes.value.forEach(async mode => { 
      await setModeAlowability(mode)
    })
  }

  const setModeAlowability = async (mode) => {
    let modeProperties = modesProperties.value[mode]    
    modesProperties.value[mode].allowed = await service.can(modeProperties.action, ['index', 'show'], props.restaurant)
  }
  
  const modeAlowability = (mode) => modesProperties.value[mode].allowed
  const modeVisibility = (mode) => modesProperties.value[mode].visible
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
  <div v-if="dataReady">
    <div class="raw">
      <ModeSwitch v-for="mode in modes" 
                  :mode="mode"                      :modes-class="modeClassName" :current-mode="currentMode"
                  :allowed="modeAlowability(mode)"  :visible="modeVisibility(mode)"
                  @switch-mode="setMode" />
    </div>

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