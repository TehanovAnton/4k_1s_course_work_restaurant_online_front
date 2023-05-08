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
  <div class="form-floating mb-3">
    <textarea v-model="description.description" @change="setDescription" class="form-control" id="dish-description"></textarea>
    <label for="dish-description">Description</label>
  </div>
</template>

<style lang="scss">

  .desc-size {
    height: 70%;
    width: 70%;
  }
</style>
