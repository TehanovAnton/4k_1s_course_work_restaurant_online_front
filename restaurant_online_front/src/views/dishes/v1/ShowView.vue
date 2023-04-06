<script setup>
  import { computed } from '@vue/reactivity';
  import EditIcon from '../../restaurants/v1/components/EditIcon.vue';
  import { useContentsStore } from '../../restaurants/stores/ContentsStore';
  import { useDishesStore } from '../stores/DishesStore';

  const props = defineProps(['dish'])

  const contentsStore = useContentsStore()
  const dishesStore = useDishesStore()
  const dish = computed(() => props.dish)

  const editDish = () => {
    dishesStore.setDish(dish.value)
    contentsStore.setContent('DishEditView')
  }
</script>

<template>
  <div class="dish">
    <div class="dish-content">
      <p>
        {{ dish.name }}
      </p>

      <p>
        <img id="output"
             width="200"
             :src="dish.image"/>
      </p>

      <p>
        {{ dish.price_cents }}
      </p>

      <p>
        {{ dish.description }}
      </p>
    </div>

    <div class="dish-edit-icon">
      <EditIcon @icon-click="editDish" />
    </div>
  </div>
</template>

<style>
.dish {
    display: flex;
    background-color: darkgray;
    border-radius: 15px;
    padding: 15px;
    box-shadow: inset 0 0 5px 2px black;
    margin: 5px 0px 0 0px;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
  }

  .dish-content {
    flex: 20;
  }

  .dish-edit-icon {
    flex: 1;
    height: 152px;
    display: flex;
    justify-content: flex-end;
  }
</style>
