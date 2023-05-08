<script setup>
  import { ref } from 'vue';

  const props = defineProps(['initValue'])
  const emits = defineEmits(['priceChange'])

  const price = ref({ price:props.initValue })

  const setPrice = () => {    
    emits('priceChange', 'price_cents', 'price', price.value)
  }
</script>

<template>
  <div class="form-floating mb-3">
    <input v-model="price.price" @change="setPrice" type="text" class="form-control" id="dish-price" placeholder="0.00" />
    <label for="dish-price">Price $</label> 
  </div>
</template>