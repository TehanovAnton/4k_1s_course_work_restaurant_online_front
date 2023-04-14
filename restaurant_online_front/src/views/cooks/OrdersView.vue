<script setup>
  import { computed } from 'vue';
import OrderShowView from '../orders/v1/ShowView.vue';
  import LoadCooksOrders from './LoadCooksOrders.vue';
  import { useCooksOrdersStore } from './stores/CooksOrdersStore';

  const cooksOrdersStore = useCooksOrdersStore()
  const orders = computed(() => {
    return cooksOrdersStore.orders
  })
</script>

<template>
  <LoadCooksOrders>
    {{ orders }}
    <!-- <OrderShowView v-for="order in orders" :order="order" /> -->
  </LoadCooksOrders>  
</template>

<style>
</style>
