<script setup>
  import { computed, ref } from 'vue';
  import { useMenusStore } from '../../stores/MenusStore';
  import { useContentsStore } from '../../../restaurants/stores/ContentsStore';
  import EditIconWrap from '../../../restaurants/v1/components/EditIconWrap.vue';

  const menusStore = useMenusStore()
  const contentsStore = useContentsStore()
  const menus = computed(() => { return menusStore.menus })

  // const selectedMenu = ref(Object.assign({}, menusStore.currentMenu))

  // const updateCurrentMenu = () => {
  //   menusStore.setMenu(selectedMenu.value);
  // };
</script>

<template>
  <div class="card">
      <div class="card-body">
        <h2 class="card-title">Current Menu</h2>
        <div class="sub-card">
          <select v-model="menusStore.currentMenu" v-on:change="updateCurrentMenu">
            <option v-for="menu in menus" :key="menu.id" :value="menu">{{ menu.name }}</option>
          </select>
        </div>
      </div>
    </div>
</template>

<style>
  
</style>
