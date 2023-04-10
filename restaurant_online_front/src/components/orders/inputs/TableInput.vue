<script setup>
  import { ref } from 'vue';
  const props = defineProps(['initValue', 'attribute', 'label'])
  const emits = defineEmits(['tableChange'])

  const tableValue = ref({
    table: props.initValue
  })

  const setTable = () => {
    emits('tableChange', props.attribute, 'table', tableValue.value)
  }
</script>

<template>
  <label for="menu-slect">Choose Table Number</label>
  <select id="menu-slect" v-model="choosenMenu" @change="setMenu">
    <option v-for="menu in menus" v-bind:value="menu">
      {{ menu.name }}
    </option>
  </select>
</template>

<style lang="scss">
  .table-input-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
</style>
