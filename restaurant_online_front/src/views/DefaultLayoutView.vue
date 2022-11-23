<script setup>
  import axios from 'axios';
  import { onBeforeMount, ref } from 'vue';
  import { useTokensStore } from '../stores/tokens'

  import MenuVue from '../components/restaurants/menus/Menu.vue'

  const restaurants = ref([])
  const activeRestaurant = ref({})
  const tokens = useTokensStore()

  onBeforeMount(async () => {
    await getRestaurants()
  })

  const getRestaurants = async () => {        
    let response = await axios.get('http://localhost:3000/restaurants', {
      headers: tokens.auth_headers
    })
    .catch((error) => {            
      console.log(error);
    })

    if (response && response.status === 200) {      
      restaurants.value = response.data
      activeRestaurant.value = restaurants.value[0]
      tokens.setAuthTokens(response.headers)
    }
  }

  const restaurantClass = (restaurant) => {
    if (restaurant.id === activeRestaurant.value.id){
      return 'active-block'
    } else {
      return 'block'
    }
  }
  
  const setActiveRestaurant = (restaurant) => {
    activeRestaurant.value = restaurant
  }
</script>

<template>
  <header class="block centrenize-content-row">
    HEADER
  </header>

  <div class="centrenize-content-row">
    <div class="menu centrenize-content-column">
      <div v-for="restaurant in restaurants"
            v-bind:class="restaurantClass(restaurant)"
            @click="setActiveRestaurant(restaurant)"
      >
        {{ restaurant.name }}
      </div>
    </div>

    <div v-if="activeRestaurant" class="content block centrenize-content-row">
      <MenuVue :restaurant="activeRestaurant"/>
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
    flex-direction: column;
    justify-content: space-around;
  }

  .centrenize-content-row {
    display: flex;
    flex-direction: row ;        
    justify-content: space-around;        
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
