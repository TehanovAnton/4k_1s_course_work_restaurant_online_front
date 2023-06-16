<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import ModesSelect from '../modes/ModesSelect.vue';
import EditRestaurant from '../../views/restaurants/EditView.vue';
import restaurantService from '../../views/services/restaurants/restaurant_service'
import tokensService from '../../views/services/tokensService';
import CreateView from '../../views/restaurants/CreateView.vue';
import MenusIndexWithBar from '../../views/menus/IndexWithBar.vue';

onBeforeMount(async () => {
  await getRestaurants()
  dataReady.value = true
})

const getRestaurants = async () => {
  let { response, isSuccessful } = await restaurantService.apiIndexRestaurants(tokensService.auth_headers())

  if (isSuccessful) {      
    restaurants.value = response.data
    currentRestaurant.value = restaurants.value[0]

    tokensService.setAuthTokens(response.headers)
  }
}

const refreshData = async () => {
  await getRestaurants()
  setRestaturantMode('index')
}

const showRestaurantChange = async (restaurant) => {
  await refreshData()
  currentRestaurant.value = restaurant
}

const dataReady = ref(false)

const createRestaurantModeArgs = computed(() => {
  return {
    canCreateUrl: `${import.meta.env.VITE_BACK_HOST}/restaurants/can_create`,
    requestOptions: {
      headers: tokensService.auth_headers()
    }
  }
})
const editRestaurantModeArgs = computed(() => {
    return {
      canUpdateUrl: `${import.meta.env.VITE_BACK_HOST}/restaurants/can_create`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })
const restaurantsModes = ref(['index', 'create', 'edit'])
const restaurantsModesProperties = ref({
  index:{ action:'index', allowed:false, visible:true },
  create:{ action:'create', allowed:false, visible:true,
    args: createRestaurantModeArgs.value
  },
  edit:{ action:'update', allowed:false, visible:true,
    args: editRestaurantModeArgs.value
  },
})
const currentRestaturantMode = ref('index')
const setRestaturantMode = (modeName) => {
  currentRestaturantMode.value = modeName
}
const restaurants = ref([])
const currentRestaurant = ref({})
const restaurantActivityStyle = (restaurant) => {
  let commonStyle = 'restaurant-pd border'
  // debugger
  if (restaurant.id == currentRestaurant.value.id) {
    // debugger
    return `current-restaurant-bg ${commonStyle}`
  }

  return `restaurant-bg ${commonStyle}`
}
const setCurrentRestaurant = (restaurant) => {
  currentRestaurant.value = restaurant
}
const menus = computed(() => {
  return currentRestaurant.value.menus
})
const setMenus = (fetchedMenus) => {
  currentRestaurant.value.menus = fetchedMenus
}

</script>

<template>
  <div class="restaurants-list-content-container" v-if="dataReady">
    <div class="restaurants-list-container">      
      <ModesSelect :modes="restaurantsModes"
                  :current-mode="currentRestaturantMode"
                  :modes-properties="restaurantsModesProperties"
                  :record="currentRestaurant"
                  :with-slot="false"
                  @set-mode="setRestaturantMode" />

      <div class="restaurants-list">
        <div v-for="restaurant in restaurants"
             v-bind:class="restaurantActivityStyle(restaurant)"
             @click="setCurrentRestaurant(restaurant)">
            <p>Name: {{ restaurant.name }}</p>
            <p>Address: {{ restaurant.address }}</p>
            <p>Email: {{ restaurant.email }}</p>
        </div>
      </div>
    </div>
    
    <div class="restaurant-content" v-if="currentRestaturantMode == 'index'">
      <MenusIndexWithBar :menus="menus"
                         :restaurant="currentRestaurant"
                         @refresh-menus="setMenus" />
    </div>

    <div class="restaurant-content"
         v-if="currentRestaturantMode == 'create'">
      <CreateView class="menu-dishes-container" @data-change="refreshData"/>
    </div>

    <div class="restaurant-content" 
         v-if="currentRestaturantMode == 'edit'">
      <EditRestaurant class="menu-dishes-container"
                      :restaurant="currentRestaurant"
                      @data-change="showRestaurantChange(currentRestaurant)" />
    </div>

  </div>
</template>

<style>
  .restaurants-list-content-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .restaurants-list-container {
    display: flex;
    flex-direction: column;
  }

  .restaurants-list {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .restaurant-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 6;
  }

  .menus-bar {
    display: flex;
    flex-direction: row;
    flex: 1;
  }  

  .mb-element-flex {
    flex: 1;

    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    flex-wrap: nowrap;
    align-items: center;
  }

  .menu-dishes-container {
    flex: 10;
    background-color: antiquewhite;

    display: flex;
    flex-direction: column;
  }

  .md-background {
    background-color: rgb(221, 160, 183);
    flex: 1;
  }

  .md-padding {
    padding: 1px;
  }

  .current-menu-bg {
    background-color:blueviolet;
  }

  .menu-bg {
    background-color: rgb(191, 160, 221);
  }

  .menu-padding {
    padding: 3px;
  }

  .block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
  }

  .current-restaurant-bg {
    background-color:blueviolet;
  }

  .restaurant-bg {
    background-color: rgb(191, 160, 221);
  }

  .restaurant-pd {
    padding: 5px;
  }

  .border {
    border: 1px solid black;
  }
</style>