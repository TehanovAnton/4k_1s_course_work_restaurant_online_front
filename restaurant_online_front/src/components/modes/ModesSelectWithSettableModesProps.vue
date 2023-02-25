<script setup>
  import { onBeforeMount, ref, computed } from 'vue';
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
    'currentModeStor',
    'withSlot'
  ])
  const emits = defineEmits(['set-mode', 'set-mode-allowability'])
  
  const dataReady = ref(false)

  const currentModeStor = computed(() => props.currentModeStor)
  const modes = computed(() => {
    return props.modes
  })

  const getModesAllowabilities = async () => {
    props.modes.forEach(async mode => {       
      await setModeAlowability(mode)
    })
  }

  const setModeAlowability = async (mode) => {
    let modeProperties = currentModeStor.value.modesProperties[mode]
    let modeAlloability = await modelApi.can(modeProperties.action, 
                                             ['index', 'show', 'create_rating', 'message'], 
                                             modeProperties.args
                                            )

    emits('set-mode-allowability', mode, modeAlloability)
  }

  const modeAlowability = (mode) => {
    return currentModeStor.value.modesProperties[mode].allowed
  }
  const modeVisibility = (mode) => currentModeStor.value.modesProperties[mode].visible
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