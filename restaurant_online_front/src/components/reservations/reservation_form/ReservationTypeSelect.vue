<script setup>
  import { onBeforeMount, ref } from 'vue';

  onBeforeMount(() => {
    type.value = props.reservation.place_type
  })

  const props = defineProps(['reservation'])
  const emits = defineEmits(['reservation-type-submit'])
  
  const reservationTypes = ref(['inside', 'outside'])
  const type = ref('')
</script>

<template>
  <select v-model="type" @change="$emit('reservation-type-submit', reservation, type)">
    <option v-for="reservationType in reservationTypes" :value="reservationType">{{ reservationType }}</option>
  </select>
</template>