<script setup>
  import { ref } from 'vue';
  import ModeSwitch from '../../components/ModeSwitch.vue';
  import EditRestaurant from './EditView.vue'

  const props = defineProps(['restaurant'])  
  const emits = defineEmits(['data-change'])

  const modes = ref(['show', 'edit'])
  const currentMode = ref('show')
  const modesClass = ref('restaurant-class')

  const showDataChange = () => {
    debugger
    setMode('show')
    emits('data-change')
  }

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
    <div class="centrenize-content-column">
      Name: {{ restaurant.name }}
      <button type="button" @click="() => {}">destroy</button>
    </div>
  </div>

  <div v-if="currentMode == 'edit'">
    <EditRestaurant :restaurant="restaurant" @data-change="showDataChange" />
  </div>  
</template>