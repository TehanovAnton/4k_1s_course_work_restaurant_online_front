<script setup>
  import { computed } from 'vue';
  import OrderShowView from './OrderShowView.vue';
  import LoadCooksOrders from './LoadCooksOrders.vue';
  import { useCooksOrdersStore } from './stores/CooksOrdersStore';

  const cooksOrdersStore = useCooksOrdersStore()
  const orders = computed(() => {
    return cooksOrdersStore.orders
  })

  const filterByState = (state) => {
    return orders.value.filter((order) => {
      if (order.order_state.aasm_state === state)
        return order
    })
  }

  const readyOrders = computed(() => {    
    return filterByState('ready')
  })

  const inProgresOrders = computed(() => {
    return filterByState('in_progress')
  })

  const createdReadyorders = computed(() => {
    return filterByState('created')
  })
</script>

<template>
  <LoadCooksOrders>
    <h1>Orders</h1>
    <OrderShowView v-for="order in createdReadyorders" :order="order" />

    <h1>In progress orders</h1>
    <OrderShowView v-for="order in inProgresOrders" :order="order" />

    <h1>Ready orders</h1>
    <OrderShowView v-for="order in readyOrders" :order="order" />
  </LoadCooksOrders>  
</template>
