<script setup>
import { computed, ref } from '@vue/reactivity';
import { onBeforeMount } from 'vue';
import ModeSwitch from './ModeSwitch.vue';

  onBeforeMount(async () => {
    await getModesAllowabilities()
    dataReady.value = true
  })

  const props= defineProps([
    'modes',
    'modesProperties',
    'currentMode',
    'modesClass',
    'record',
    'service'
  ])

  const emits = defineEmits(['set-mode'])

  const dataReady = ref(false)
  const modeClassName = computed(() => {
    if (props.record) {
      return `${props.record.name}-${props.modesClass}`
    } else {
      return `${props.modesClass}`
    }
  })

  const getModesAllowabilities = async () => {
    props.modes.forEach(async mode => {       
      await setModeAlowability(mode)
    })
  }

  const setModeAlowability = async (mode) => {
    let modeProperties = props.modesProperties[mode]    
    props.modesProperties[mode].allowed = await props.service.can(modeProperties.action, ['index', 'show'], props.record)
  }
  
  const modeAlowability = (mode) => props.modesProperties[mode].allowed
  const modeVisibility = (mode) => props.modesProperties[mode].visible
</script>

<template>
  <div class="raw" v-if="dataReady">
    <ModeSwitch v-for="mode in modes" 
                :mode="mode"                      :modes-class="modeClassName" :current-mode="currentMode"
                :allowed="modeAlowability(mode)"  :visible="modeVisibility(mode)"
                @switch-mode="$emit('set-mode', mode)" />
  </div>
</template>