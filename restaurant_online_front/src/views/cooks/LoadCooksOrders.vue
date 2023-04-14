<script setup>
  import { ref, onBeforeMount } from 'vue';
  import { useCooksOrdersStore } from './stores/CooksOrdersStore';

  const ordersStore = useCooksOrdersStore()

  onBeforeMount(async () => {
    debugger
    await ordersStore.fetchOders((_response) => dataReady.value = true)
  })

  const dataReady = ref(false)
</script>

<template>
  <slot v-if="dataReady" />
</template>