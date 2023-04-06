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
  <p>
    <input type="file"
            accept="image/*"
            name="image"
            id="file"
            class="image-input"
            @change="setImage"
            setImage>
  </p>

  <p>
    <label for="file">
      Upload Image
    </label>
  </p>

  <p>
    <img id="output"
          width="200"
          :src="image.src"/>
  </p>
</template>

<style>
  .image-input {
    display: none;
  }
  
  .image-input-label {
    cursor: pointer;
  }
</style>