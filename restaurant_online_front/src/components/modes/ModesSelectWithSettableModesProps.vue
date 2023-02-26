<script setup>
  import { ref, computed } from 'vue';
  import ModeSwitchOption from './ModeSwitchOption.vue';

  const props = defineProps([
    'modeStore',
    'selectedModeStore',
    'modes',
    'currentModeStor',
    'withSlot'
  ])
  const emits = defineEmits(['set-mode', 'set-mode-allowability'])

  const currentModeStor = computed(() => props.currentModeStor)
  const modes = computed(() => {
    return props.modes
  })  

  const modeAlowability = (mode) => {
    return currentModeStor.value.modesProperties[mode].allowed
  }
  const modeVisibility = (mode) => currentModeStor.value.modesProperties[mode].visible
</script>

<template>
  <select class="raw"
          v-model="selectedModeStore.selectedMode"
          @change="$emit('set-mode')">
      <ModeSwitchOption v-for="mode in modes" 
                      :mode="mode"
                      :allowed="modeAlowability(mode)"
                      :visible="modeVisibility(mode)"/>
  </select>

  <slot v-if="withSlot" />
</template>