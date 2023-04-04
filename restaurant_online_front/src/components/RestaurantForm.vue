<script setup>
  import { ref } from 'vue';
  const props = defineProps(['restaurant', 'actionName'])
  const emits = defineEmits(['formSubmit', 'cancel'])

  const modefiedRestaurant = ref({ 
    id: props.restaurant.id,
    updateAttributes: {}
  })

  const inlcudeAttribute = (attr) => {
    modefiedRestaurant.value.updateAttributes[attr] = props.restaurant[attr]
  }
</script>

<template>
  <form>
    <div class="centrenize-content-column">
      <label for="r-name">Name: </label>
      <input id='r-name' v-model="restaurant.name"
                         v-on:change="inlcudeAttribute('name')" />

      <label for="r-email">Email: </label>
      <input id='r-email' v-model="restaurant.email"
                          v-on:change="inlcudeAttribute('email')" />
      
      <label for="r-address">Address: </label>
      <input id='r-address' v-model="restaurant.address"
                            v-on:change="inlcudeAttribute('address')" />
    </div>

    <button type="button" @click="$emit('formSubmit', modefiedRestaurant)">
      {{ actionName }}
    </button>

    <button type="button" @click="$emit('cancel')">back</button>
  </form>
</template>