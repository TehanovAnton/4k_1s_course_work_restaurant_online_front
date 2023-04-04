<script setup>
  import { computed } from 'vue';
  import { useMenusStore } from '../../stores/MenusStore';
  import { useContentsStore } from '../../../restaurants/stores/ContentsStore';
  import EditIconWrap from '../../../restaurants/v1/components/EditIconWrap.vue';

  const menusStore = useMenusStore()
  const contentsStore = useContentsStore()
  const currentMenu = computed(() => menusStore.currentMenu)

  const indexMenus = () => contentsStore.setContent('MenuIndexView')
</script>

<template>
  <div v-if="true" class="current-menu-container">
    <EditIconWrap @edit-click="contentsStore.setContent('MenuEditView')">
      <h1>{{ currentMenu.name }}</h1>
      <button @click="indexMenus">All Menus</button>
    </EditIconWrap>
  </div>
</template>

<style>
  .current-menu-container {
    display: flex;
    flex: 1;
    justify-content: space-around;
    background-color: #c5bfbf;
    height: 100%;
  }
</style>
