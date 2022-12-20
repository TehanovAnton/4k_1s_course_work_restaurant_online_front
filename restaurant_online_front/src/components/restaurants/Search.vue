<script setup>
  import { onBeforeMount, ref } from 'vue';
  import restaurant_service from '../../views/services/restaurants/restaurant_service';
  
  const emits = defineEmits(['search-result'])

  const matchExpression = ref('')

  const searchRestaurants = async (e) => {
    if (e.key == 'Enter') {
      e.preventDefault()

      let {
        response,
        isSuccessful
      } = await restaurant_service.apiRestaurantSearch(matchExpression.value)

      if (isSuccessful) {
        emits('search-result', response.data)
      }
    }
  }
</script>

<template>
  <div>
    <form>
      Search restaurants:
      <input type="text" v-model="matchExpression"
            @keypress="searchRestaurants"/>
    </form>
  </div>
</template>