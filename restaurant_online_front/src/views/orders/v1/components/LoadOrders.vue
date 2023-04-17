<script setup>
  import { ref, onBeforeMount } from 'vue';
  import { useOrdersStore } from '../../stores/OrdersStore';
  import { SocketService } from '../../../services/sockets/SocketService';

  const ordersStore = useOrdersStore()

  onBeforeMount(async () => {
    await ordersStore.fetchOders((_response) => dataReady.value = true)

    const socketService = new SocketService(
      ordersStore,
      'ws://localhost:3000/cable',
      "CustomersOrdersChannel",
      "customers_orders_channel",
      'order'
    )

  socketService.bindSocket()
  })

  const dataReady = ref(false)
</script>

<template>
  <slot v-if="dataReady" />
</template>