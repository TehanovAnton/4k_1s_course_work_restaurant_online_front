<script setup>
  import LoadOrders from './components/LoadOrders.vue';
  import ShowView from './ShowView.vue';
  import { useOrdersStore } from '../stores/OrdersStore'
  import { useRestaurantsStore } from '../../restaurants/stores/RestaurantsStore';
  import { computed } from 'vue';
  import LoadRestaurants from '../../restaurants/v1/components/datacomponents.vue/LoadRestaurants.vue';

  const ordersStore = useOrdersStore()
  const restaurantsStore = useRestaurantsStore()
  const restaurants = computed(() => restaurantsStore.restaurants)

  const restaurantOrders = (restaurant) => {
    return ordersStore.restaurantOrders(restaurant)
  }
</script>

<template>
  <LoadRestaurants>
    <LoadOrders>
      <div v-for="restaurant in restaurants">
        <h1 v-if="restaurantOrders(restaurant).length !== 0">{{ restaurant.name }}</h1>
        <ShowView v-for="order in restaurantOrders(restaurant)"
                  :order="order" />
      </div>
    </LoadOrders>
  </LoadRestaurants>
</template>