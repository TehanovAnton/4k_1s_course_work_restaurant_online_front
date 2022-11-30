<script setup>
  import { computed } from '@vue/reactivity';

  const props = defineProps(['mode', 'modesClass']) 
  const emits = defineEmits(['switchMode'])

  const modeId = computed(() => {
    return `${props.mode}ModeSwitch`
  })
</script>

<template>
  <label v-bind:for="modeId">{{ mode }}: </label>
  <input v-bind:id="modeId" v-bind:name="modesClass" type="radio" @click="$emit('switchMode', mode)" />
</template>