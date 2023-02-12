<script setup>
</script>

<template>
  <div class="menus-bar">
    <div v-for="menu in menus" 
          v-bind:class="menuActivityStyle(menu)"
          @click="setCurrentMenu(menu)">
      {{ menu.name }}
    </div>        
  </div>

  <slot />
</template>