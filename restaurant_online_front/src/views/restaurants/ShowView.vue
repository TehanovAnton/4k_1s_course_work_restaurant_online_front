<script setup>
  import { ref } from 'vue';
  import EditRestaurant from './EditView.vue'

  const props = defineProps(['restaurant'])
  const mode = ref('show')

  const setMode = (modeName) => {
    if (mode.value !== modeName) {
      mode.value = modeName
    } else {
      mode.value = modeName
    }
  }
</script>

<template>
  <label for="showModeSwitch">Show: </label>
  <input id="showModeSwitch" name="modeSwith" type="radio" @click="setMode('show')" />

  <label for="editModeSwitch">Edit: </label>
  <input id="editModeSwitch" name="modeSwith" type="radio" @click="setMode('edit')" />

  <div v-if="mode == 'show'">
    Name: {{ restaurant.name }}
  </div>

  <div v-if="mode == 'edit'">
    <EditRestaurant :restaurant="restaurant" />
  </div>
</template>