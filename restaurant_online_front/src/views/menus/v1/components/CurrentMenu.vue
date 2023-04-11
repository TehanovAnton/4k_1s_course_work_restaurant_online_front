<script setup>
  import { computed, ref } from 'vue';
  import { useMenusStore } from '../../stores/MenusStore';
  import { useContentsStore } from '../../../restaurants/stores/ContentsStore';
  import EditIconWrap from '../../../restaurants/v1/components/EditIconWrap.vue';
  import EditIcon from '../../../icons/EditIcon.vue';
  import MenuSelect from '../components/MenuSelect.vue'

  const menusStore = useMenusStore()
  const contentsStore = useContentsStore()
  const menus = computed(() => { return menusStore.menus })

  const editMenu = () => contentsStore.setContent('MenuEditView')
  const setMenu = (menu) => {
    menusStore.setMenu(menu)
  }
</script>

<template>
  <div class="card">
      <div class="card-body">
        <h2 class="card-title">Current Menu</h2>
        <div class="sub-card">
          <MenuSelect
            :init-value="menusStore.currentMenu"
            :menus="menusStore.menus"
            @menu-change="setMenu"
          />

          <EditIcon @icon-click="editMenu" />
        </div>
      </div>
    </div>
</template>

<style>
  
</style>
