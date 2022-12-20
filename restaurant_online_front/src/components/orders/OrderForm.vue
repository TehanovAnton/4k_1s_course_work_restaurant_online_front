<script setup>
  import { onBeforeMount, ref } from 'vue';
  import service from '../../views/services/orders/order_service';
  import restaurant_service from '../../views/services/restaurants/restaurant_service';
  import ReservationForm from '../reservations/reservation_form/ReservationForm.vue'
  import menu_service from '../../views/services/menus/menu_service';
  import dishes_service from '../../views/services/dishes/dishes_service';
  import tokensService from '../../views/services/tokensService';

  onBeforeMount(async () => {
    await getRestaurants()

    props.order.reservations_attributes = []

    if (props.actionName == 'update') {
      await getMenus()
      activeMenus.value = props.order.menus      
      await getDishes()
      
      props.order.orders_dishes_attributes = []
      props.order.orders_dishes.forEach(order_dish => {
        props.order.orders_dishes_attributes.push(orderDish(order_dish.dish))
      })

      props.order.reservations.forEach(r => { 
        props.order.reservations_attributes.push(r)
      })
    }
  
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
  const activeMenus = ref([])
  const activeDishes = ref([])    

  const getRestaurants = async () => {
    menusReady.value = false
    let { response, isSuccessful } = await restaurant_service.apiIndexRestaurants(tokensService.auth_headers())

    if (isSuccessful) {      
      restaurants.value = response.data
      activeRestaurant.value = restaurants.value[0]
      props.order.restaurant = activeRestaurant.value
      tokensService.setAuthTokens(response.headers)
    }
  }

  const getMenus = async () => {
    dishes.value = []
    let restaurantId = props.order.restaurant_id
    let { response, isSuccessful } = await menu_service.apiIndexMenus(tokensService.auth_headers(), restaurantId, { view:false })
    
    if (isSuccessful) {      
      tokensService.setAuthTokens(response.headers)      

      menus.value = response.data  
      menusReady.value = true
    }
  }

  const getDishes = async () => {
    dishes.value = []

    activeMenus.value.forEach(async (menu) => {
      await getMenuDishes(menu.id)
    })

    dishesReady.value = true
  }

  const getMenuDishes = async (menuId) => {
    let { response, isSuccessful } = await dishes_service.apiIndexDishes(menuId, { view:false })

    if (isSuccessful) {            
      response.data.forEach(dish => {        
        dishes.value.push(dish)
      });      
    }
  }

  const orderDish = (dish) => {
    if (!!dish)
      return { dish_id:dish.id }
  }

  const selectedRestaurant = (restaurant) => {
    if (restaurant.id == props.order.restaurant.id)
      return true

    return false
  }
</script>

<template>
  <form v-if="dataReady">  
    <div class="centrenize-content-row">
      <label for="restaurant-select">Chose restaurant</label>
      <select name="restaurant-select" v-model="order.restaurant_id"
              @change="getMenus">        
        <option v-for="restaurant in restaurants"
                v-bind:value="restaurant.id">
                {{ restaurant.name }}
        </option>
      </select>

      <label for="menu-select">Chose menu</label>
      <select v-if="order.restaurant_id && menusReady" v-model="activeMenus"
              @change="getDishes" @select="getDishes" multiple>
        <option v-for="menu in menus" v-bind:value="menu">{{ menu.name }}</option>
      </select>

      <label for="dishes-select">Chose dishes</label>
      <select v-if="activeMenus && dishesReady" v-model="order.orders_dishes_attributes" multiple>
        <option v-for="dish in dishes" :value="orderDish(dish)">{{ dish.name }}</option>
      </select>
      
      <ReservationForm v-if="!!order.restaurant"
                       :restaurant="order.restaurant" :order="order" :action-name="actionName"/>
    </div>

    <button type="button" @click="$emit('formSubmit')">{{ actionName }}</button>
  </form>
</template>