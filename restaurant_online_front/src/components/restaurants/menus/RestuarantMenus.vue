<script setup>
  const props = defineProps(['menus', 'activeMenu'])

  const menuClass = (menu) => {
    if (props.activeMenu && menu.id === props.activeMenu.id) {
      return 'active-block'
    }

    return 'block'
  } 
</script>

<template>
  <div class="menu centrenize-content-column">
    <p v-for="menu in menus" v-bind:class="menuClass(menu)"  @click="$emit('menu-click',  menu)">
      {{ menu.name }}
    </p>
  </div>
</template>
