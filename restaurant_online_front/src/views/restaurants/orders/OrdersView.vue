<script setup>
  import axios from 'axios';  
  import { onBeforeMount, ref } from 'vue';
  import { useTokensStore } from '../../../stores/tokens';
  import { useRoute } from 'vue-router';

  import UserOrders from "../../../components/users/orders/UserOrders.vue";
  import Restaurants from '../../../components/restaurants/Restaurants.vue'
  import { computed } from '@vue/reactivity';

  const orders = ref({})
  const activeRestaurant = ref({})
  const tokens = useTokensStore()
  const route = useRoute()

  const restaurants = computed(() => {
    let rests = orders.value.map(order => order.restaurant)
    return rests
  })

  onBeforeMount(async () => {
    let respones = await getOrders()

    setRefs(respones)
  })

  const getOrders = async () => {
    let url = `http://localhost:3000/users/${route.params.id}/orders`
    let headers = { headers: tokens.auth_headers }

    let response = await axios.get(url, headers)
                              .catch(errorsHandler)

    return response
  }

  const setRefs = (response) => {
    let successfulResponse = isSuccessfulResponse(response)

    if (successfulResponse) {   
      orders.value = response.data      
      // activeRestaurant.value = restaurants[0]

      tokens.setAuthTokens(response.headers)
    }
  }

  const isSuccessfulResponse = (response) => response && response.status === 200

  let errorsHandler = (error) => {            
    console.log(error);
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
      <Restaurants :restaurants="restaurants"
                   @change-active-restaurant="setActiveRestaurant" />
    </div>

    <div class="menu centrenize-content-column">
      <UserOrders :orders="orders" />
    </div>

  </div>

  <footer class="block centrenize-content-row">
    FOOTER
  </footer>
</template>

<style>
  .block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
  }

  .active-block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
    background-color: black;
    color: white;
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
