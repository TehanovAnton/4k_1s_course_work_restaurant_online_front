<script setup>
  import { onBeforeMount, ref } from 'vue';  
  import { useRouter } from 'vue-router';
  import ShowDish from './ShowView.vue'
  import service from '../services/dishes/dishes_service'
  import tokensService from '../services/tokensService';
  import auttService from '../services/auth_service'
  import CreateDish from './CreateView.vue';
  import Modes from '../../components/Modes.vue';

  import { useRoute } from 'vue-router'
  const route = useRoute()

  onBeforeMount(async () => {
    await getDishes()
    dataReady.value = true
  })

  const dishes = ref([])
  const activeDish = ref()
  const menu = ref({})
  const router = useRouter()
  const dataReady = ref(false)
  


  const modes = ref(['index', 'create'])
  const modesProperties = ref({
    index:{ action:'index', allowed:false, visible:true },
    create:{ action:'create', allowed:false, visible:true }
  })
  const currentMode = ref('index')
  const modesClass = ref("dishes-class")
  const setMode = (modeName) => currentMode.value = modeName
  const modeAlowability = (mode) => modesProperties.value[mode].allowed
  const modeVisibility = (mode) => modesProperties.value[mode].visible



  const getDishes = async () => {    
    let dishId = route.params['menuId']
    let { response, isSuccessful } = await service.apiIndexDishes(dishId)    

    if (isSuccessful) {      
      dishes.value = response.data  
      activeDish.value = dishes.value[0]
      menu.value = dishes.value[0].menu
    }
  }

  const refreshData = async () => {
    await getDishes()
    setMode('index')
  }
</script>

<template>
  <header class="block centrenize-content-row">
    <button type="button" @click="auttService.apiSignOut(tokensService.auth_headers())">sign out</button>
  </header>

  <div v-if="dataReady">
    <div class="menu block centrenize-content-column">

      <div class="centrenize-content-row">
        Menu - {{ menu.name }}
        <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
                :current-mode="currentMode"  :service="service"                  :record="menu"
                @set-mode="setMode"/>
      </div>
    
      <div v-if="currentMode == 'index'" class="block">
        Dishes:
        <div v-for="dish in dishes">
          <ShowDish :dish="dish" @data-change="refreshData"/>
        </div>
      </div>

      <div v-if="(currentMode == 'create' && modeAlowability('create'))">
        <CreateDish @data-change="refreshData" :menu="menu" />
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
