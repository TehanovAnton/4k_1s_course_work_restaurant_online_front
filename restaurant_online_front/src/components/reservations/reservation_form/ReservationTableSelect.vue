<script setup>
  const props = defineProps(['reservation', 'restaurant_tables'])
</script>

<template>
  <label for="dishes-select">Chose table</label>
  <select v-model="reservation.table_id">
    <option v-for="table in restaurant_tables" :value="table.id">{{ table.number }}</option>
  </select>
</template>
