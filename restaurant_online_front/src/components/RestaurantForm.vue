<script setup>
  import { ref } from 'vue';
  import RegularFormStyle from './stylecomponents/RegularFormStyle.vue';
  const props = defineProps(['restaurant', 'actionName', 'label'])
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
  <RegularFormStyle>
    <div class="form">
      <label for="r-name">{{ label }}</label>
      <div class="form__content">
        <label for="r-name">Name</label>
        <input id='r-name' v-model="restaurant.name" class="text-input" @change="inlcudeAttribute('name')" />

        <label for="r-email">Email</label>
        <input id='r-email' v-model="restaurant.email" class="text-input" @change="inlcudeAttribute('email')" />
        
        <label for="r-address">Address</label>
          <input id='r-address' v-model="restaurant.address" class="text-input" @change="inlcudeAttribute('address')" />
      </div>

      <div class="form__actions">
        <button type="button" @click="$emit('formSubmit', modefiedRestaurant)">
          {{ actionName }}
        </button>

        <button type="button" @click="$emit('cancel')">back</button>
      </div>
    </div>
  </RegularFormStyle>
</template>
