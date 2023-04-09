<script setup>
  import { ref, onBeforeMount } from 'vue';
  import { useOrdersStore } from '../../stores/OrdersStore';

  const ordersStore = useOrdersStore()

  onBeforeMount(async () => {
    await ordersStore.fetchOders((_response) => dataReady.value = true)
  })

  const dataReady = ref(false)
</script>

<template>
  <slot v-if="dataReady" />
</template>