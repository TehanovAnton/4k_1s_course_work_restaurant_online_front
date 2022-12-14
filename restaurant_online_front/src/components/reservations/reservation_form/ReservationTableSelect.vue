<script setup>
  const props = defineProps(['reservation', 'restaurant_tables'])
</script>

<template>
  <label for="dishes-select">Chose table</label>
  <select v-model="reservation.table">
    <option v-for="table in restaurant_tables" :value="table">{{ table.number }}</option>
  </select>
</template>
