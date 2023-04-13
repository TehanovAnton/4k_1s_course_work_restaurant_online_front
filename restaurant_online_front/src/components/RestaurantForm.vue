<script setup>
  import { ref } from 'vue';
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
  <div class="card">
    <h1>{{ label }}</h1>
    <form id="rest_form">
      <div class="card-content">
        <div class="form-field">
          <label for="r-name">Name: </label>
          <input id='r-name' v-model="restaurant.name" v-on:change="inlcudeAttribute('name')" />
        </div>

        <div class="form-field">
          <label for="r-email">Email: </label>
          <input id='r-email' v-model="restaurant.email" v-on:change="inlcudeAttribute('email')" />
        </div>
        
        <div class="form-field">
          <label for="r-address">Address: </label>
          <input id='r-address' v-model="restaurant.address" v-on:change="inlcudeAttribute('address')" />
        </div>
      </div>

      <div class="card-actions">
        <button type="button" @click="$emit('formSubmit', modefiedRestaurant)">
          {{ actionName }}
        </button>

        <button type="button" @click="$emit('cancel')">back</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 70%;
}

.form-field {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

label {
  margin-right: 8px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.card-actions {
  display: flex;
  justify-content: space-around;
  width: 80%;
  height: 30%;
  margin-top: 16px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007aff;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #0059b3;
}
</style>
