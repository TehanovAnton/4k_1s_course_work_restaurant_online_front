<script setup>
  import { onBeforeMount, ref } from 'vue';

  onBeforeMount(() => {
    debugger
    datetime.value = "2022-12-15T13:14"
  })

  const props = defineProps(['reservationDate'])
  const datetime = ref({})
</script>

<template>  
  {{ datetime }}
  <input type="datetime-local" v-model="datetime" />
  {{ reservationDate }}
</template>