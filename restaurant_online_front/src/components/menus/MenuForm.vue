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
  <form class="menu-form">
    <div class="menu-attributes">
      <div class="menu-attribute">
        <label for="m-name">Name: </label>
        <input id='m-name' v-model="menu.name"
                          :on-change="inlcudeAttribute('name')" />
      </div>
    </div>

    <div class="menu-form-buttons">
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
  .menu-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 300px;
    justify-content: space-around;
    background-color: #c5bbbb;
    
    .menu-attributes {
      width: 100%;

      .menu-attribute {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        justify-content: space-evenly;
        background-color: #9b7878;
        height: 100px;
        border-radius: 15px;
      }
    }

    .menu-form-buttons {
      display: flex;
      width: 100%;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
    }
  }
</style>
