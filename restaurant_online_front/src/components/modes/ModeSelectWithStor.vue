<script setup>
  import { ref } from '@vue/reactivity';
  import { onBeforeMount } from 'vue';
  import ModeSwitchOption from './ModeSwitchOption.vue';
  import modelApi from '../../views/services/api/model_api';


  onBeforeMount(async () => {    
    await getModesAllowabilities()
    
    dataReady.value = true
  })

  const props = defineProps([
    'modeStore',
    'selectedModeStore',
    'modes',
    'modesProperties',
    'withSlot'
  ])

  const emits = defineEmits(['set-mode'])
  const dataReady = ref(false)

  const getModesAllowabilities = async () => {
    props.modes.forEach(async mode => {       
      await setModeAlowability(mode)
    })
  }

  const setModeAlowability = async (mode) => {
    let modeProperties = props.modesProperties[mode]
    props.modesProperties[mode].allowed = await modelApi.can(
      modeProperties.action, 
      ['index', 'show', 'create_rating', 'message'], 
      modeProperties.args
    )
  }

  const modeAlowability = (mode) => props.modesProperties[mode].allowed          
  const modeVisibility = (mode) => props.modesProperties[mode].visible
</script>

<template>
  <select class="raw"
          v-if="dataReady"
          v-model="selectedModeStore.selectedMode"
          @change="$emit('set-mode')">
    <ModeSwitchOption v-for="mode in modes" 
                      :mode="mode"
                      :allowed="modeAlowability(mode)"
                      :visible="modeVisibility(mode)"/>
  </select>

  <slot v-if="withSlot" />
</template>