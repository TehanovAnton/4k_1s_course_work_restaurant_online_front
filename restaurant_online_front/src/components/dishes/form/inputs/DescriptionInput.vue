<script setup>
  import { ref } from 'vue';

  const props = defineProps(['initValue'])
  const emits = defineEmits(['descriptionChange'])

  const description = ref({ description:props.initValue })

  const setDescription = () => {    
    emits('descriptionChange', 'description', 'description', description.value)
  }
</script>

<template>
  <label for="d-description">Description: </label>
  <textarea id='d-description' class="text-input desc-size" v-model="description.description" @change="setDescription" />
</template>

<style lang="scss">

  .desc-size {
    height: 70%;
    width: 70%;
  }
</style>
