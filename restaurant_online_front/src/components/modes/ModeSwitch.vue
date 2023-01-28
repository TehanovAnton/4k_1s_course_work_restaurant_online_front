<script setup>
  import { computed } from '@vue/reactivity';

  const props = defineProps(['mode', 'modesClass', 'currentMode', 'allowed', 'visible']) 
  const emits = defineEmits(['switchMode'])

  const modeActivityClass = computed(() => {
    if (props.mode == props.currentMode) {
      return  'current-mode'
    }

    return  'mode'
  })

</script>

<template>
  <div v-if="(allowed && visible)">
    <input v-bind:class="modeActivityClass" type="button" :value="mode"
          @click="$emit('switchMode', mode)" />    
  </div>
</template>

<style>
  .current-mode {
    background-color: rgb(163, 163, 255);
  }

  .mode {
    background-color: rgb(215, 215, 250);
  }
</style>
