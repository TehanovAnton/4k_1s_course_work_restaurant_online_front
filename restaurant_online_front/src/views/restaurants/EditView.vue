<script setup>
  const props = defineProps(['restaurant'])
</script>

<template>  
  <form class="block">
    <div class="centrenize-content-column">
      <input v-model="restaurant.name"/>
      <input v-model="restaurant.email"/>
      <input v-model="restaurant.address"/>
    </div>

    <button type="button">cancel</button>
  </form>

</template>