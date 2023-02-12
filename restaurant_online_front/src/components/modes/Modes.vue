<script setup>
import { computed, ref } from '@vue/reactivity';
import { onBeforeMount } from 'vue';
import ModeSwitch from './ModeSwitch.vue';
import modelApi from '../../views/services/api/model_api';

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
      let pref = props.record.name ? props.record.name : props.record.id
      return `${pref}-${props.modesClass}`
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
    props.modesProperties[mode].allowed = await modelApi.can(modeProperties.action, 
                                                             ['index', 'show', 'create_rating', 'message'], 
                                                             modeProperties.args
    )
  }
  
  const modeAlowability = (mode) => props.modesProperties[mode].allowed
  const modeVisibility = (mode) => props.modesProperties[mode].visible
</script>

<template>
  <div class="raw" v-if="dataReady">
    <ModeSwitch v-for="mode in modes" 
                :mode="mode"                      :modes-class="modeClassName"    :current-mode="currentMode"
                :allowed="modeAlowability(mode)"  :visible="modeVisibility(mode)"
                @switch-mode="$emit('set-mode', mode)" />
  </div>
</template>