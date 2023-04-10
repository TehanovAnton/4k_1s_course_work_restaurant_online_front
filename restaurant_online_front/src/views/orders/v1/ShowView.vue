<script setup>
  import moment from 'moment';
  import DishesList from './components/DishesList.vue';

  const props = defineProps(['order'])

  const dtFormated = (dt, format) => {
    let date = new Date(dt)
    return moment(date).utcOffset(0).format(format)
  }
</script>

<template>
  <div class="order-container">
    <DishesList :order="order" />
    <div class="order-datetime">
      <div>Date: {{ dtFormated(order.reservation.start_at, 'YYYY-MM-DD') }}</div>
      <div>Start Time: {{ dtFormated(order.reservation.start_at, 'HH:mm') }}</div>
    </div>
    
  </div>
</template>

<style lang="scss">
  .order-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: darkgray;
    border-radius: 20px;
    box-shadow: inset 0 0 5px 2px black;
    padding: 15px;

    .order-datetime {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
  }
</style>
