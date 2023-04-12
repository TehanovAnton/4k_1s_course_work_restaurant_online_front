<script setup>
  import { computed, ref } from '@vue/reactivity';
  import { useBasketsStore } from '../../../views/baskets/stores/BasketsStore';
  import { useCurrentUserStore } from '../../../stores/users/currentUser';
  import { useRestaurantsStore } from '../../../views/restaurants/stores/RestaurantsStore';

  const props = defineProps(['pOrder', 'actionName'])
  const emits = defineEmits(['formSubmit', 'cancle'])

  const currentUserStore = useCurrentUserStore()
  const restaurantsStore = useRestaurantsStore()
  const basketsStore = useBasketsStore();

  const chosenDishes = computed(() => {
    return basketsStore.dishes
  });

  const initOrder = () => {
    let iOrder = {
      user_id: currentUserStore.user.id,
      attributes: {
        restaurant_id: restaurantsStore.currentRestaurant.id,
        user_id: currentUserStore.user.id,
        orders_dishes_attributes: basketsStore.currentBasket.dishes,
        reservation_attributes: { place_type: 'outside' }
      }
    }

    return iOrder
  }

  const order = ref(initOrder())

  const insideOrder = ref(false);
  const placeType = ref({ type: 'outside' })

  const setPlaceType  = () => {
    placeType.value.type = insideOrder.value ? 'inside' : 'outside'
    return placeType.value.type
  }

  const inlcudeAttribute = (attr, sourceObjectAttr = attr, sourceObject = props.pOrder) => {
    let sourceObjectAttrValue = sourceObject[sourceObjectAttr]

    if (attr === 'place_type')
      sourceObjectAttrValue = setPlaceType()

    order.value.attributes.reservation_attributes[attr] = sourceObjectAttrValue
  }

  const onFormSubmit = () => {
    emits('formSubmit', order.value)
  };

  const onCancel = () => {
    emits('cancle')
  };
</script>

<template>
  <div class="order-form">
    <h2>Order Form</h2>
    {{ order }}
    <div class="chosen-dishes">
      <h3>Chosen Dishes:</h3>
      <ul>
        <li v-for="dish in chosenDishes" :key="dish.id">{{ dish.name }}</li>
      </ul>
    </div>
    <div class="order-details">
      <h3>Order Details:</h3>

      <div class="input-group">
        <label for="start-date">Start Date:</label>
        <input type="datetime-local" id="start-date" v-model="pOrder.start_at" @change="inlcudeAttribute('start_at')" />
      </div>

      <div class="input-group">
        <label for="inside-order">Inside Order:</label>
        <input type="checkbox" id="inside-order" v-model="insideOrder" @change="inlcudeAttribute('place_type', 'type', placeType)" />
      </div>

      <div v-if="insideOrder" class="input-group">
        <label for="end-date">End Date:</label>
        <input type="datetime-local" id="end-date" v-model="pOrder.end_at" @change="inlcudeAttribute('end_at')" />
      </div>
    </div>
    <div class="dish-form__actions">
      <button class="btn btn-primary" @click="onFormSubmit">
        {{ props.actionName }}
      </button>
      <button class="btn btn-secondary" @click="onCancel">
        Cancel
      </button>
    </div>
  </div>
</template>

<style scoped>
.order-form {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}

.chosen-dishes {
  margin-bottom: 10px;
}

.chosen-dishes ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.order-details {
  display: flex;
  flex-direction: column;
}

.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.input-group label {
  margin-right: 10px;
}

.dish-form__actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  cursor: pointer;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: #fff;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.btn-secondary {
  background-color: #6c757d;
  margin-left: 10px;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
