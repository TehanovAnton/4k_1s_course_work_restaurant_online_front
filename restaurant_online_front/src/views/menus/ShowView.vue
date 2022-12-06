<script setup>
  import Modes from '../../components/Modes.vue';
  import EditMenu from './EditView.vue'
  import tokensService from '../services/tokensService';
  import service from '../services/menus/menu_service'
  import { onBeforeMount, ref } from 'vue';

  import { useRoute } from 'vue-router';
  const route = useRoute()

  onBeforeMount(async () => {
    await getMenu()
    dataReady.value = true
  })
  
  const emits = defineEmits(['data-change'])

  const dataReady = ref(false)
  const menu = ref({})
  const restaurant = ref({})
// 
  const modes = ref(['show', 'edit', 'delete'])
  const modesProperties = ref({
    show:{ action:'show', allowed:true, visible:true },
    edit:{ action:'update', allowed:false, visible:true },
    delete:{ action:'destroy', allowed:false, visible:false } 
  })
  const currentMode = ref('show')
  const modesClass = ref('menu-class')
  const setMode = (modeName) => currentMode.value = modeName  
  const modeAlowability = (mode) => modesProperties.value[mode].allowed
// 

  const getMenu = async () => {
    let menuId = route.params['id']
    let restaurantId = route.params['restaurant_id']
    let { response, isSuccessful } = await service.apiGetMenu(tokensService.auth_headers(), restaurantId, menuId)

    if (isSuccessful) {      
      menu.value = response.data      
      restaurant.value = response.data['restaurant']      
      tokensService.setAuthTokens(response.headers)
    }
  }

  const refreshData = async () => {
    await getMenu()
    setMode('show')
  }

  const destroyMenu = async () => {
    let { 
      response, 
      isSuccessful
    } = await service.apiDestroyMenus(tokensService.auth_headers(), props.menu)

    if (isSuccessful) {      
      tokensService.setAuthTokens(response.headers)
      emits('data-change')
    }
  }
</script>

<template>
  <div v-if="dataReady">
    <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
           :current-mode="currentMode"  :record="menu"                      :service="service"
           @set-mode="setMode"/>

    <div v-if="currentMode == 'show'">
      <div class="centrenize-content-column">
        Name: {{ menu.name }}
        <button v-if="modeAlowability('delete')"
                type="button"
                @click="destroyMenu()">destroy</button>
      </div>
    </div>

    <div v-if="currentMode == 'edit'">
      <EditMenu :menu="menu" @data-change="refreshData" />
    </div>  
  </div>
</template>