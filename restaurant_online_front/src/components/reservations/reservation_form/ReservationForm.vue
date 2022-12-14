<script setup>
  import { ref } from 'vue';
  import ReservationTableSelect from './ReservationTableSelect.vue'
  import ReservationDate from './ReservationDate.vue';
  import ReservationTypeSelect from './ReservationTypeSelect.vue'

  const props = defineProps(['order', 'restaurant'])
  const table = ref({})

  const setDatetime = (reservation, dtValue, dtName) => {
    reservation[dtName] = dtValue
  }

  const setReservationType = (reservation, type) => {
    reservation.place_type = type
  }
</script>

<template>
  <form>
    <div>
      <div v-for="reservation in order.reservations">
        <ReservationTypeSelect :reservation="reservation"
                               @reservation-type-submit="setReservationType"/>

        <div v-if="reservation.place_type == 'inside'" class="centrenize-content-column">
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
