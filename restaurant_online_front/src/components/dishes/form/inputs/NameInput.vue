<script setup>
  import { ref } from 'vue';

  const props = defineProps(['initValue'])
  const emits = defineEmits(['nameChange'])

  const name = ref({ name:props.initValue })

  const setName = () => {    
    emits('nameChange', 'name', 'name', name.value)
  }
</script>

<template>
  <div class="form-floating mb-3">
    <input v-model="name.name" @change="setName" type="text" class="form-control" id="dish-name" placeholder="name@example.com" />
    <label for="dish-name">Name</label>
  </div>
</template>

<style>
</style>