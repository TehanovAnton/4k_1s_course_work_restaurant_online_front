<script setup>
  import { ref } from 'vue';

  const emits = defineEmits(['imgChange'])

  const image = ref({ file:'', src:'' })

  const setImage = (event) => {
    let file = event.target.files[0],
        src = URL.createObjectURL(file)
    image.value = { file: file, src: src }
    
    emits('imgChange', 'image', 'file', image.value)
  }

  // const attache = async () => {
  //   let formData = new FormData()
  //   formData.append('image', imageObject.value.file)

  //   let headers = tokensService.auth_headers()
  //   headers["Content-Type"] = "multipart/form-data"

  //   let args = {
  //     updateUrl: `http://localhost:3000/dishes/${props.dish.id}/attache_image`,
  //     data: formData,
  //     requestOptions: {
  //       headers: headers
  //     }
  //   }

  //   debugger
  //   await dishApi.apiUpdateModel(args)
  // }
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