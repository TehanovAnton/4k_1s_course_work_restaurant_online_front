<script setup>
  import { onBeforeMount, ref } from 'vue';
  import { computed } from '@vue/reactivity';
  import moment from 'moment-timezone'

  onBeforeMount(() => {
    let date = new Date(props.reservation[props.dtName]).toISOString()
    datetime.value = moment(date).tz(moment.tz.guess()).utcOffset(0).format('YYYY-MM-DDTHH:mm')
  })

  const props = defineProps(['reservation', 'dtName'])
  const emits = defineEmits(['datetime-submit'])
  const datetime = ref({})

  const dtInputName = computed(() => {
    return `${props.dtName}-datetime-input`
  })
</script>

<template>
  <label :for="dtInputName">{{ dtName }}:</label>
  <input type="datetime-local" v-model="datetime"
         :name="dtInputName"
         @change="$emit('datetime-submit', reservation, datetime, dtName)" />  
</template>