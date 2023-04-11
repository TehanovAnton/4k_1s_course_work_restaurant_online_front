<script setup>
  import { ref } from 'vue';

  const props = defineProps(['initValue', 'menus'])
  const emits = defineEmits(['menuChange'])

  const choosenMenu = ref(props.initValue)

  const setMenu = () => {
    emits('menuChange', 'menu_id', 'id', choosenMenu.value)
  }
</script>

<template>
  <label for="menu-slect">Menu</label>
  <select id="menu-slect" class="text-input menu-select" v-model="choosenMenu" @change="setMenu">
    <option v-for="menu in menus" v-bind:value="menu">
      {{ menu.name }}
    </option>
  </select>
</template>

<style>
  .menu-select {
    background: none;
  }
</style>