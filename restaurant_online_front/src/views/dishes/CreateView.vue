<script setup>
  import { ref } from 'vue';
  import DishForm from '../../components/dishes/DishForm.vue';
  import dish_service from '../services/dishes/dishes_service';  

  const props = defineProps(['menu'])
  const dish = ref({ name:'', menu_id: props.menu.id })
  const emits = defineEmits(['data-change'])

  const createDish = async () => {
    let isSuccessful = await dish_service.apiCreateDish(dish.value)

    if (isSuccessful) {      
      emits('data-change')
    }
  }

</script>

<template>
  <DishForm action-name="create" :dish="dish"
            @form-submit="createDish" />
</template>