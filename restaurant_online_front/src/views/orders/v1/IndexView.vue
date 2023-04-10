<script setup>
  import LoadOrders from './components/LoadOrders.vue';
  import ShowView from './ShowView.vue';
  import { useOrdersStore } from '../stores/OrdersStore'

  const ordersStore = useOrdersStore()
</script>

<template>
  <LoadOrders>
    <ShowView v-for="order in ordersStore.currentRestaurantOrders"
              :order="order"  />
  </LoadOrders>
</template>