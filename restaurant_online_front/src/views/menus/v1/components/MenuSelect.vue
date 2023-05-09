<script setup>
  import { ref, computed, watch } from 'vue';

  const props = defineProps(['initValue', 'menus'])
  const emits = defineEmits(['menuChange'])
  const initValue = computed(() => props.initValue)

  const choosenMenu = ref(props.initValue)
  watch(initValue, (newInit, _) => {
    choosenMenu.value = props.menus.find(m => m.id === newInit.id)
  })

  const setMenu = () => {
    emits('menuChange', choosenMenu.value)
  }
</script>

<template>
  <select id="menu-slect" class="form-select form-select-lg mb-3" v-model="choosenMenu" @change="setMenu">
    <option v-for="menu in menus" v-bind:value="menu">
      {{ menu.name }}
    </option>
  </select>
</template>

<style>
  .menu-select {
    border-width: thin;
    border-right: none;
    border-left: none;
    border-top: none;
    margin: 10px;
    outline: none;
    background: none;
  }
</style>