<script setup>
  import { ref } from 'vue';
  const props = defineProps(['initValue', 'attribute', 'label'])
  const emits = defineEmits(['timeChange'])

  const timeValue = ref({
    time: props.initValue
  })

  const setTime = () => {
    emits('timeChange', props.attribute, 'time', timeValue.value)
  }
</script>

<template>
  <div class="time-input-container">
    <label for="time-input">{{ label }}</label>
    <input id="time-input" type="datetime-local" v-model="timeValue.time" @change="setTime" />
  </div>
</template>

<style lang="scss">
  .time-input-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
</style>
