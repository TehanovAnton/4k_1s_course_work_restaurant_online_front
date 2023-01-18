<script setup>
  import { onBeforeMount, ref, computed } from 'vue';  
  import { useRouter } from 'vue-router';
  import ShowMenu from './ShowView.vue'
  import service from '../services/menus/menu_service'
  import restaurant_service from '../services/restaurants/restaurant_service';
  import tokensService from '../services/tokensService';
  import auttService from '../services/auth_service'
  import CreateMenu from './CreateView.vue';
  import Modes from '../../components/Modes.vue';

  import { useRoute } from 'vue-router'
  const route = useRoute()

  onBeforeMount(async () => {
    await getRestaurant()
    await getMenus()
    dataReady.value = true
  })  

  const menus = ref([])
  const activeMenu = ref()
  const restaurant = ref({})
  const dataReady = ref(false)

  const createMenuModeArgs = computed(() => {
    return {
      canCreateUrl: `http://localhost:3000/restaurants/${restaurant.value.id}/menus/can_create`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })

  const modes = ref(['index', 'create'])
  const modesProperties = ref({
    index:{ action:'index', allowed:false, visible:true },
    create:{ action:'create', allowed:false, visible:true,
      args: createMenuModeArgs
    }
  })
  const currentMode = ref('index')
  const modesClass = ref("menus-class")
  const setMode = (modeName) => currentMode.value = modeName
  const modeAlowability = (mode) => modesProperties.value[mode].allowed

  const getRestaurant = async () => {
    let restaurantId = route.params['id']
    let {
      response,
      isSuccessful
    } = await restaurant_service.apiGetRestaurant(tokensService.auth_headers(), restaurantId)
    
    if (isSuccessful) {      
      restaurant.value = response.data
      tokensService.setAuthTokens(response.headers)
    }
  }

  const getMenus = async () => {        
    let { response, isSuccessful } = await service.apiIndexMenus(tokensService.auth_headers(), restaurant.value.id, { view:'with_dishes' })

    if (isSuccessful) {      
      menus.value = response.data  
      activeMenu.value = menus.value[0]

      tokensService.setAuthTokens(response.headers)
    }
  }

  const refreshData = async () => {
    await getMenus()
    setMode('index')
  }
</script>

<template>
  <div v-if="dataReady" class="centrenize-content-row">
    <div class="menu block centrenize-content-column">

      <!-- For this view it recives menu, in separate should fetch by id -->
      <div class="centrenize-content-row">
        Menus:

        <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
             :current-mode="currentMode"  :service="service"                  :record="restaurant"
             @set-mode="setMode"/>
      </div>

      <div v-if="currentMode == 'index'" v-for="menu in menus">
        <ShowMenu :menu="menu" @data-change="refreshData"/>
      </div>

      <div v-if="(currentMode == 'create' && modeAlowability('create'))">
        <CreateMenu @data-change="refreshData" :restaurant="restaurant" />
      </div>

    </div>  
    
  </div>

  <footer class="block centrenize-content-row">
    FOOTER
  </footer>
</template>

<style>
  .active-block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
    background-color: black;
    color: white;
  }


  .block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
  }

  .centrenize {
    display: flex;        
    justify-content: space-around;    
  }

  .centrenize-content-column {
    display: flex;        
    justify-content: space-around;

    flex-direction: column;    
  }

  .centrenize-content-row {
    display: flex;
    justify-content: space-around;
    
    flex-direction: row;                
  }

  .menu {
    flex: 1;

    margin: 1.5px;
  }

  .content {
    flex: 1;

    margin: 1.5px;
  }

  .raw {
    display: flex;
  }
</style>
