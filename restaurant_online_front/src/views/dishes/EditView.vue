<script setup>
  import DishForm from '../../components/dishes/DishForm.vue';
  import service from '../services/dishes/dishes_service'

  const props = defineProps(['dish'])
  const emits = defineEmits(['data-change'])

  const updatMenu = async () => {
    let isSuccessful = await service.apiUpdateDish(props.dish)

    if (isSuccessful) {      
      emits('data-change')
    }
  }
</script>

<template>
  <div class="block">
    Edit Dish:
    <DishForm :dish="dish" action-name="update" @form-submit="updatMenu"/>
  </div>  
</template>