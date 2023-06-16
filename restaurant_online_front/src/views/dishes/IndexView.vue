<script setup>
  import { onBeforeMount, ref, computed } from 'vue';  
  import { useRouter } from 'vue-router';
  import ShowDish from './ShowView.vue'
  import dishesService from '../services/dishes/DishesService'
  import dishApi from '../services/api/model_api'
  import menu_service from '../services/menus/menu_service';
  import tokensService from '../services/tokensService';
  import auttService from '../services/auth_service'
  import CreateDish from './CreateView.vue';
  import Modes from '../../components/Modes.vue';

  import { useRoute } from 'vue-router'
  const route = useRoute()

  onBeforeMount(async () => {
    await getDishes()
    await getMenu()

    dataReady.value = true
  })

  const dishes = ref([])
  const activeDish = ref()
  const menu = ref({})
  const router = useRouter()
  const dataReady = ref(false)

  const createDishModeArgs = computed(() => {
    return {
      canCreateUrl: `${import.meta.env.VITE_BACK_HOST}/menus/${menu.value.id}/dishes/can_create`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })

  const modes = ref(['index', 'create'])
  const modesProperties = ref({
    index:{ action:'index', allowed:false, visible:true },
    create:{ action:'create', allowed:false, visible:true,
      args: createDishModeArgs
    }
  })
  const currentMode = ref('index')
  const modesClass = ref("dishes-class")
  const setMode = (modeName) => currentMode.value = modeName
  const modeAlowability = (mode) => modesProperties.value[mode].allowed
  const modeVisibility = (mode) => modesProperties.value[mode].visible



  const getDishes = async () => {    
    let menuId = route.params['menuId']
    let url = dishesService.urlOptionsEditor(`${import.meta.env.VITE_BACK_HOST}/menus/${menuId}/dishes?`, 
                                             { view: 'with_menus' })
    let args = { 
      getUrl: url,
      requestOptions: { 
        headers: tokensService.auth_headers()
      }
    }

    let { response, isSuccessful } = await dishApi.apiIndexModels(args)

    if (isSuccessful) {     
      dishes.value = response.data  
      activeDish.value = dishes.value[0]

      if (dishes.value.length > 0)
        menu.value = dishes.value[0].menu
    }
  }

  const getMenu = async () => {
    let menuId = route.params['menuId']
    let { response, isSuccessful } = await menu_service.apiGetMenu(tokensService.auth_headers(), menuId)

    if (isSuccessful) {     
      menu.value = response.data  
    }
  }

  const refreshData = async () => {
    await getDishes()
    setMode('index')
  }
</script>

<template>
  <div v-if="dataReady">
    <div class="menu block centrenize-content-column">    
      <div class="menu centrenize-content-row">
        Menu - {{ menu.name }}
        <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
                :current-mode="currentMode" :service="dishesService"            :record="menu"
                @set-mode="setMode"/>
      </div>

      <div v-if="currentMode == 'index' && dishes.length > 0" class="block">
        Dishes:
        <div v-for="dish in dishes">
          <ShowDish :dish="dish" @data-change="refreshData"/>
        </div>
      </div>   
      
      <div v-if="currentMode == 'create' && modeAlowability('create') && !!menu">
        <CreateDish @data-change="refreshData" :menu="menu" />
      </div>
    </div>      
  </div>

  <div v-if="dataReady && dishes.length == 0">
    No Dishes
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

  .dish {
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
