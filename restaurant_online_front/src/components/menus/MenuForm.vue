<script setup>
  import { ref } from 'vue';

  const props = defineProps(['menu', 'actionName', 'fromLabel'])
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
  <form class="menu-form">
    <label for="menu-form">{{ fromLabel }}</label>
      <div class="menu-form__content">
        <label for="m-name">Name</label>
        <input id='m-name' class="text-input" 
                          v-model="menu.name"
                          :on-change="inlcudeAttribute('name')" />
      </div>

      <div class="menu-form__actions">
        <button type="button" @click="$emit('formSubmit', modefiedMenu)">
          {{ actionName }}
        </button>

        <button type="button" @click="$emit('cancel')">
          back
        </button>
      </div>
  </form>
</template>

<style lang="scss">
  .menu-form__content {
    display: flex;
    width: 100%;
    padding: 10px;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .menu-form {
    width: 40%;
    border: 1px solid #ccc;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .text-input {
      border-width: thin;
      border-right: none;
      border-left: none;
      border-top: none;
      margin: 10px;
      outline: none
    }
  }

  .menu-form__actions {
    display: flex;
    width: 70%;
    flex-direction: row;
    justify-content: space-evenly;
  }
</style>
