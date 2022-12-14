<script setup>
  import { ref } from 'vue';
  import ReservationTableSelect from './ReservationTableSelect.vue'
  import ReservationDate from './ReservationDate.vue';

  const props = defineProps(['order', 'restaurant'])
  const table = ref({})
</script>

<template>
  <form>
    <p>{{ restaurant.tables }}</p>#####
    <!-- <p>{{ order.reservations }}</p> -->
    
    <div>
      <div v-for="reservation in order.reservations">
      <ReservationTableSelect :reservation="reservation" :restaurant_tables="restaurant.tables" />
      
      <ReservationDate :reservationDate="reservation.start_at" />
    </div>        
    </div>
  </form>
</template>
