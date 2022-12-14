<script setup>
  import { ref } from 'vue';
  import ReservationTableSelect from './ReservationTableSelect.vue'

  const props = defineProps(['order', 'restaurant'])
  const table = ref({})
</script>

<template>
  <form>
    <p>{{ restaurant.tables }}</p>#####
    <p>{{ order.reservations }}</p>
    
    <ReservationTableSelect v-for="reservation in order.reservations" 
                            :reservation="reservation" :restaurant_tables="restaurant.tables" />
  </form>
</template>
