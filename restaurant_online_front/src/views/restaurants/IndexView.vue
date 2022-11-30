<script setup>
  import axios from 'axios';
  import { onBeforeMount, ref } from 'vue';
  import { useTokensStore } from '../../stores/tokens'
  import { useRouter } from 'vue-router';
  import ShowRestaurant from './ShowView.vue'
  import service from '../services/restaurant_service'
  import ModeSwitch from '../../components/ModeSwitch.vue';
  import CreateRestaurant from './CreateView.vue';

  const emits = defineEmits(['restaurantsMode'])

  const restaurants = ref([])
  const activeRestaurant = ref()
  const tokens = useTokensStore()
  const router = useRouter()
  const modes = ref(['index', 'create'])
  const currentMode = ref('index')
  const modesClass = ref("restaurans-class")

  onBeforeMount(async () => {
    await getRestaurants()
  })

  const getRestaurants = async () => {      
    let { response, isSuccessful } = await service.apiRestaurants(tokens.auth_headers)

    if (isSuccessful) {      
      restaurants.value = response.data
      activeRestaurant.value = restaurants.value[0]

      tokens.setAuthTokens(response.headers)
    }
  }

  const setMode = (modeName) => {
    if (currentMode.value !== modeName) {
      currentMode.value = modeName
    } else {
      currentMode.value = modeName
    }
  }
</script>

<template>
  <header class="block centrenize-content-row">
    HEADER
  </header>

  <div class="centrenize-content-row">

    <div class="menu block centrenize-content-column">
      <div >
        <ModeSwitch v-for="mode in modes" :mode="mode" :modes-class="modesClass" @switch-mode="setMode" />
      </div>

      <!-- For this view it recives restaurant, in separate should fetch by id -->
      <div v-if="currentMode == 'index'" v-for="restaurant in restaurants">
        <ShowRestaurant :restaurant="restaurant" />
      </div>

      <div v-if="currentMode == 'create'">
        <CreateRestaurant />
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
</style>
