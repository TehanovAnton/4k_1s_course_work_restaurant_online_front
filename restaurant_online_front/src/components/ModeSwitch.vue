<script setup>
  import { computed } from '@vue/reactivity';

  const props = defineProps(['mode', 'modesClass', 'currentMode', 'allowed']) 
  const emits = defineEmits(['switchMode'])


  const modeId = computed(() => {         
    return `${props.mode}ModeSwitch`
  })

  const modeActivity = computed(() => props.mode == props.currentMode)
</script>

<template>
  <div v-if="allowed">
    <label v-bind:for="modeId">{{ mode }}: </label>
    <input v-bind:id="modeId" v-bind:name="modesClass" type="radio" :checked="modeActivity"
          @click="$emit('switchMode', mode)" />
  </div>
</template>