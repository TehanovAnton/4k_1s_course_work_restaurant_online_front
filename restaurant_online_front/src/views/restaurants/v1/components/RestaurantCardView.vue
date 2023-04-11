<script setup>
  const props = defineProps(['restaurant'])
</script>


<template>
  <div class="restaurant-card">
    <h2>{{ restaurant.name }}</h2>
    <div class="restaurant-info">
      <p><strong>Email:</strong> {{ restaurant.email }}</p>
      <p><strong>Address:</strong> {{ restaurant.address }}</p>
      <p><strong>Phone:</strong> {{ restaurant.phone }}</p>
    </div>
    <div class="menu-list">
      <h3>Menus:</h3>
      <ul>
        <li v-for="menu in restaurant.menus" :key="menu.id">{{ menu.name }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .restaurant-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
  }

  .restaurant-info {
    margin-bottom: 10px;
  }

  .menu-list {
    margin-top: 10px;
  }

  .menu-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
