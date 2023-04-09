<script setup>
  import LoadOrders from './components/LoadOrders.vue';
  import ShowView from './ShowView.vue';
  import { useOrdersStore } from '../stores/OrdersStore'

  const ordersStore = useOrdersStore()
</script>

<template>
  <LoadOrders>
    <ShowView 
              :order="ordersStore.orders[0]"  />
  </LoadOrders>
</template>