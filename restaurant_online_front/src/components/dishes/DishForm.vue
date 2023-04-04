<script setup>
  import { ref } from 'vue';

  const props = defineProps(['dish', 'actionName'])
  const emits = defineEmits(['formSubmit'])

  const modefiedDish = ref({ 
    id: props.dish.id,
    updateAttributes: {}
  })

  const inlcudeAttribute = (attr) => {
    modefiedDish.value.updateAttributes[attr] = props.dish[attr]
  }
</script>

<template>
  <form>
    <div class="centrenize-content-column">
      <label for="d-name">Name: </label>
      <input id='d-name' v-model="dish.name"
                         :on-change="inlcudeAttribute('name')" />
    </div>

    <button type="button" @click="$emit('formSubmit', modefiedDish)">{{ actionName }}</button>
  </form>
</template>