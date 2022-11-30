<script setup>
  import { ref } from 'vue';
  import ModeSwitch from '../../components/ModeSwitch.vue';
  import EditRestaurant from './EditView.vue'

  const props = defineProps(['restaurant'])
  const modes = ref(['show', 'edit'])
  const currentMode = ref('show')
  const modesClass = ref('modeSwitch')

  const setMode = (modeName) => {
    if (currentMode.value !== modeName) {
      currentMode.value = modeName
    } else {
      currentMode.value = modeName
    }
  }
</script>

<template>
  <div>
    <ModeSwitch v-for="mode in modes" :mode="mode" :modes-class="modesClass" @switch-mode="setMode" />
  </div>

  <div v-if="currentMode == 'show'">
    Name: {{ restaurant.name }}
  </div>

  <div v-if="currentMode == 'edit'">
    <EditRestaurant :restaurant="restaurant" />
  </div>  
</template>