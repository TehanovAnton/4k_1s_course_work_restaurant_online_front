<script setup>
  import { ref } from 'vue';

  const props = defineProps(['initValue', 'label', 'attrName'])
  const emits = defineEmits(['textChange'])

  const text = ref({ text: props.initValue })

  const setName = () => {    
    emits('textChange', props.attrName, 'text', text.value)
  }
</script>

<template>
  <label for="d-name">{{ label }}</label>
  <input id='d-name' class="text-input" v-model="text.text" @change="setName" />
</template>

<style>
</style>