<script setup>
  const props = defineProps(['restaurant'])
</script>

<template>  
  <form class="block">
    <p>
      <input v-model="restaurant.name"/>
    </p>

    <button type="button">save</button>
    <button type="button">cancel</button>
  </form>

</template>