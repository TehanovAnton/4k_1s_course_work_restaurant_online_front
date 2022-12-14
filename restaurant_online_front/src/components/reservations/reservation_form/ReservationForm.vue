<script setup>
  import { ref } from 'vue';
  import ReservationTableSelect from './ReservationTableSelect.vue'
  import ReservationDate from './ReservationDate.vue';

  const props = defineProps(['order', 'restaurant'])
  const table = ref({})

  const setDatetime = (reservation, dtValue, dtName) => {
    reservation[dtName] = dtValue
  }
</script>

<template>
  <form>    
    <div >
      <div v-for="reservation in order.reservations">      
      {{ reservation.start_at }}, {{ reservation.end_at }}
      

      <div class="centrenize-content-column">
        <ReservationTableSelect :reservation="reservation" :restaurant_tables="restaurant.tables" />
        
        <ReservationDate :reservation="reservation" dtName="start_at"
                       @datetime-submit="setDatetime"/>
                       
        <ReservationDate :reservation="reservation" dtName="end_at"
                        @datetime-submit="setDatetime"/>
      </div>
    </div>        
    </div>
  </form>
</template>
