<script setup>
  import { onBeforeMount, ref } from 'vue';
  import ReservationTableSelect from './ReservationTableSelect.vue'
  import ReservationDate from './ReservationDate.vue';
  import ReservationTypeSelect from './ReservationTypeSelect.vue'
  import moment from 'moment-timezone'

  onBeforeMount(() => {
    if (props.actionName == 'create')
      props.order.reservations_attributes.push(newReservation.value)
  })

  const props = defineProps(['order', 'restaurant', 'actionName'])

  const defaultDatetime = ref(moment(new Date()).format('YYYY-MM-DDTHH:mm'))
  const newReservation = ref({ place_type:'inside', table_id:'', start_at:defaultDatetime.value, end_at:defaultDatetime.value })

  const setDatetime = (reservation, dtValue, dtName) => {
    reservation[dtName] = dtValue
  }

  const setReservationType = (reservation, type) => {
    reservation.place_type = type
  }
</script>

<template>
  <form>
    <div v-if="actionName == 'update'" v-for="reservation in order.reservations">
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

    <div v-if="actionName == 'create'">
      <ReservationTypeSelect :reservation="newReservation"
                              @reservation-type-submit="setReservationType"/>

      <div v-if="newReservation.place_type == 'inside'" class="centrenize-content-column">
        {{ order.reservations_attributes }}
        <ReservationTableSelect :reservation="newReservation" :restaurant_tables="restaurant.tables" />

        <ReservationDate :reservation="newReservation" dtName="start_at"
                         @datetime-submit="setDatetime"/>
                      
        <ReservationDate :reservation="newReservation" dtName="end_at"
                         @datetime-submit="setDatetime"/>
      </div>
    </div>
  </form>
</template>
