<script setup>
  import { onBeforeMount, ref } from 'vue';  
  import { useRouter } from 'vue-router';
  import ShowRestaurant from './ShowView.vue'
  import Search from '../../components/restaurants/Search.vue';
  import service from '../services/restaurants/restaurant_service'
  import tokensService from '../services/tokensService';
  import Header from '../../components/Header.vue';  
  import CreateRestaurant from './CreateView.vue';
  import Modes from '../../components/Modes.vue';

  onBeforeMount(async () => {
    await getRestaurants()
    dataReady.value = true
  })

  const emits = defineEmits(['restaurantsMode'])

  const restaurants = ref([])
  const activeRestaurant = ref()
  const router = useRouter()
  const dataReady = ref(false)
  


  const modes = ref(['index', 'create'])
  const modesProperties = ref({
    index:{ action:'index', allowed:false, visible:true },
    create:{ action:'create', allowed:false, visible:true }
  })
  const currentMode = ref('index')
  const modesClass = ref("restaurans-class")
  const setMode = (modeName) => currentMode.value = modeName
  const modeAlowability = (mode) => modesProperties.value[mode].allowed
  const modeVisibility = (mode) => modesProperties.value[mode].visible



  const getRestaurants = async () => {
    let { response, isSuccessful } = await service.apiIndexRestaurants(tokensService.auth_headers())

    if (isSuccessful) {      
      restaurants.value = response.data
      activeRestaurant.value = restaurants.value[0]

      tokensService.setAuthTokens(response.headers)
    }
  }

  const refreshData = async () => {
    await getRestaurants()
    setMode('index')
  }

  const setSearchRestaurants = (searchResult) => {    
    restaurants.value = searchResult
  }
</script>

<template>
  <div v-if="dataReady" class="centrenize-content-row">
    <div class="menu block centrenize-content-column">
      <div class="centrenize-content-row">
        Restaurants:
        <Search @search-result="setSearchRestaurants"/>

        <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
              :current-mode="currentMode"  :service="service"
              @set-mode="setMode"/>
      </div>

      <!-- For this view it recives restaurant, in separate should fetch by id -->
      <div v-if="currentMode == 'index'" v-for="restaurant in restaurants">
        <ShowRestaurant :restaurant="restaurant" @data-change="refreshData"/>
      </div>

      <div v-if="(currentMode == 'create' && modeAlowability('create'))">
        <CreateRestaurant @data-change="refreshData" />
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
