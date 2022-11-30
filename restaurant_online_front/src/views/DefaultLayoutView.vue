<script setup>
  import axios from 'axios';
  import { onBeforeMount, ref } from 'vue';
  import { useTokensStore } from '../stores/tokens'
  import { useRouter } from 'vue-router';
  import RestuarantMenus from '../components/restaurants/menus/RestuarantMenus.vue'
  import Restaurants from '../components/restaurants/Restaurants.vue'

  const restaurants = ref([])
  const activeRestaurant = ref()
  const tokens = useTokensStore()
  const router = useRouter()

  onBeforeMount(async () => {
    await getRestaurants()
  })

  const getRestaurants = async () => {      
    let response = await axios.get('http://localhost:3000/restaurants',
                                   { headers: tokens.auth_headers })
    .catch(errorshandler)

    if (response && response.status === 200) {      
      restaurants.value = response.data
      activeRestaurant.value = restaurants.value[0]

      tokens.setAuthTokens(response.headers)
    }
  }

  const errorshandler = (error) => {            
    console.log(error);
  }

  const setActiveRestaurant = (restaurant) => {
    activeRestaurant.value = restaurant
  }

  const restaurantMenusView = () => {
    let view = { 
      name:'restaurant_menus', 
      params: { id: activeRestaurant.value.id }
    }

    router.push(view)
  }
</script>

<template>
  <header class="block centrenize-content-row">
    HEADER
  </header>

  <div class="centrenize-content-row">

    <div class="menu centrenize-content-column">
      <Restaurants :restaurants="restaurants"
                   :active-restaurant="activeRestaurant" 
                   @change-active-restaurant="setActiveRestaurant" />
    </div>

    <div v-if="activeRestaurant" class="content block centrenize-content-row">
      <RestuarantMenus :menus="activeRestaurant.menus"
                       @menu-click="restaurantMenusView" />
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
