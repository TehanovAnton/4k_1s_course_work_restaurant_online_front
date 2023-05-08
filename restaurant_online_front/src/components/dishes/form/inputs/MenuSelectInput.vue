<script setup>
  import { watch, computed, ref } from 'vue';

  const props = defineProps(['initValue', 'menus'])
  const emits = defineEmits(['menuChange'])
  const initValue = computed(() => props.initValue)

  const choosenMenu = ref(props.initValue)
  watch(initValue, (newInit, _) => choosenMenu.value = newInit)

  const setMenu = () => {
    emits('menuChange', 'menu_id', 'id', choosenMenu.value)
  }
</script>

<template>
  <select v-model="choosenMenu" @change="setMenu" class="form-select form-select-lg mb-3" aria-label="Default select example">
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