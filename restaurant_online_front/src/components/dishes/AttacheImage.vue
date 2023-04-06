<script setup>
  import { ref } from 'vue';
  import dishApi from '../../views/services/api/model_api';
  import tokensService from '../../views/services/tokensService';

  const props = defineProps(['dish'])

  const imageObject = ref({ file:'', src:'' })
  const form = ref({})

  const setImage = (event) => {
    // let reader = new FileReader();
    let file = event.target.files[0]
    imageObject.value['file'] = file;
    imageObject.value['src'] = URL.createObjectURL(file)

    // reader.onload = () => {
    //   imageObject.value['image'] = event.target.result;
    // };
    // reader.readAsDataURL(file);
    // debugger
  }

  const attache = async () => {
    let formData = new FormData()
    formData.append('image', imageObject.value.file)

    let headers = tokensService.auth_headers()
    headers["Content-Type"] = "multipart/form-data"

    let args = {
      updateUrl: `http://localhost:3000/dishes/${props.dish.id}/attache_image`,
      data: formData,
      requestOptions: {
        headers: headers
      }
    }

    debugger
    await dishApi.apiUpdateModel(args)
  }
</script>

<template>
  
  <form v-bind="form">
    <!-- <input type="file" accept="image/*" @change="setImage" /> -->

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
           :src="imageObject.src"/>
    </p>

    <button type="button" @click="attache">attache</button>
  </form>
</template>

<style>
  .image-input {
    display: none;
  }
  
  .image-input-label {
    cursor: pointer;
  }
</style>