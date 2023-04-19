<script setup>
  import { onBeforeMount, ref } from 'vue';
  import { useRestaurantsStore } from '../../../stores/RestaurantsStore';
  import { useMenusStore } from '../../../../menus/stores/MenusStore';
  import { useRoute } from 'vue-router';

  const restaurantsStore = useRestaurantsStore()

  onBeforeMount(async () => {
    await restaurantsStore.fetchModels((_response) => {
      dataReady.value = true
    })      
  })

  const dataReady = ref(false)
</script>

<template>
  <slot v-if="dataReady" />
</template>