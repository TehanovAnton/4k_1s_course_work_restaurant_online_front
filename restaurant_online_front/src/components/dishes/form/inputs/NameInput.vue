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
  <label for="d-name">Name</label>
  <input id='d-name' class="text-input" v-model="name.name" @change="setName" />
</template>

<style>
</style>