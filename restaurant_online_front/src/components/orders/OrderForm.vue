<script setup>
  import { onBeforeMount, ref } from 'vue';
  import service from '../../views/services/orders/order_service';
  import restaurant_service from '../../views/services/restaurants/restaurant_service';
  import menu_service from '../../views/services/menus/menu_service';
  import dishes_service from '../../views/services/dishes/dishes_service';
  import tokensService from '../../views/services/tokensService';

  onBeforeMount(async () => {
    await getRestaurants()

    dataReady.value = true
  })

  const props = defineProps(['order', 'actionName'])
  const emits = defineEmits(['formSubmit'])

  const dataReady = ref(false)
  const menusReady = ref(false)
  const dishesReady = ref(false)

  const restaurants = ref([])
  const menus = ref([])
  const dishes = ref([])
  const activeRestaurant = ref({})
  const activeMenu = ref({})
  const activeDishes = ref([])

  const getRestaurants = async () => {
    let { response, isSuccessful } = await restaurant_service.apiIndexRestaurants(tokensService.auth_headers())

    if (isSuccessful) {      
      restaurants.value = response.data
      tokensService.setAuthTokens(response.headers)
    }
  }

  const getMenus = async () => {
    let restaurantId = props.order.restaurant_id
    let { response, isSuccessful } = await menu_service.apiIndexMenus(tokensService.auth_headers(), restaurantId)    
    
    if (isSuccessful) {      
      tokensService.setAuthTokens(response.headers)      

      menus.value = response.data  
      menusReady.value = true      
    }
  }

  const getDishes = async () => {    
    let menuId = activeMenu.value.id
    let { response, isSuccessful } = await dishes_service.apiIndexDishes(menuId)

    if (isSuccessful) {      
      dishes.value = response.data
      dishesReady.value = true
    }
  }

  const orderDish = (dish) => {
    return { dish_id:dish.id }
  }
</script>

<template>
  <form v-if="dataReady">  
    <div class="centrenize-content-column">

      <label for="restaurant-select">Chose restaurant</label>
      <select name="restaurant-select" v-model="order.restaurant_id"
              @change="getMenus">
        <option v-for="restaurant in restaurants" :value="restaurant.id">{{ restaurant.name }}</option>
      </select>

      <label for="menu-select">Chose menu</label>
      <select v-if="order.restaurant_id && menusReady" v-model="activeMenu"
              @change="getDishes">
        <option v-for="menu in menus" :value="menu">{{ menu.name }}</option>
      </select>

      <label for="dishes-select">Chose dishes</label>
      <select v-if="activeMenu && dishesReady" v-model="order.orders_dishes_attributes" multiple>
        <option v-for="dish in dishes" :value="orderDish(dish)">{{ dish.name }}</option>
      </select>

      {{ order }}
    </div>

    <button type="button" @click="$emit('formSubmit')">{{ actionName }}</button>
  </form>
</template>