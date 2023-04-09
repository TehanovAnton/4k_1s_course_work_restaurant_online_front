<script setup>
  import LoadOrders from './components/LoadOrders.vue';
  import { useOrdersStore } from '../stores/OrdersStore'

  const ordersStore = useOrdersStore()
</script>

<template>
  <LoadOrders>

  </LoadOrders>
</template>