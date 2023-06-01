<script setup>
  import { ref } from 'vue';

  const props = defineProps(['initValue'])
  const emits = defineEmits(['imgChange'])

  const image = ref({ file:'', src: props.initValue })

  const setImage = (event) => {
    let file = event.target.files[0],
        src = URL.createObjectURL(file)
    image.value = { file: file, src: src }
    
    emits('imgChange', 'image', 'file', image.value)
  }
</script>

<template>
  <div class="img-container" v-if="image.src">
    <img id="output"
          width="300"
          height="200"
          :src="image.src"/>
  </div>

  <div class="mb-3">
    <label for="dish-image" climage.srcass="form-label">
      Image
    </label>
    <input @change="setImage" class="form-control" type="file" id="dish-image">
  </div>
</template>

<style>
  .image-input {
    display: none;
  }

  .img-container {
  }
  
  .image-input-label {
    cursor: pointer;
  }
</style>