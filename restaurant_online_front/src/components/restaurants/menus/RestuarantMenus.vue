<script setup>
  import { computed } from '@vue/reactivity';
  import router from '../../../router/router';

  const props = defineProps(['restaurant'])
  const menus = computed(() => {    
    return props.restaurant.value.menus
  })

  const menuDishesView = (menu) => {
    router.push({ 
      name:'menu_dishes', 
      params: { id: menu.id }
    })
  }
</script>

<template>
  <div class="menu centrenize-content-column">
    <p v-for="menu in menus" class="block"  @click="menuDishesView(menu)">
      {{ menu.name }}
    </p>
  </div>
</template>

<style>
  .block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
  }

  .centrenize-content-column {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .menu {
    flex: 1;

    margin: 1.5px;
  }
</style>