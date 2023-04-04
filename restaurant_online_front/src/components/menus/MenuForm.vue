<script setup>
  import { ref } from 'vue';

  const props = defineProps(['menu', 'actionName'])
  const emits = defineEmits(['formSubmit', 'cancel'])

  const modefiedMenu = ref({ 
    id: props.menu.id,
    attributes: {
      restaurant_id: props.menu.restaurant_id,
    }
  })

  const inlcudeAttribute = (attr) => {
    modefiedMenu.value.attributes[attr] = props.menu[attr]
  }
</script>

<template>
  <form class="block">
    <div class="centrenize-content-column">
      <label for="m-name">Name: </label>
      <input id='m-name' v-model="menu.name"
                         :on-change="inlcudeAttribute('name')" />
    </div>

    <button type="button" @click="$emit('formSubmit', modefiedMenu)">
      {{ actionName }}
    </button>

    <button type="button" @click="$emit('cancel')">
      back
    </button>
  </form>
</template>