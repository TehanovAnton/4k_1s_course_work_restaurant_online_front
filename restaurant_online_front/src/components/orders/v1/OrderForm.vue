<script setup>
  import { computed, ref } from '@vue/reactivity';
  import { useBasketsStore } from '../../../views/baskets/stores/BasketsStore';
  import { useCurrentUserStore } from '../../../stores/users/currentUser';
  import { useRestaurantsStore } from '../../../views/restaurants/stores/RestaurantsStore';
  import moment from 'moment-timezone';

  const props = defineProps(['pOrder', 'actionName'])
  const emits = defineEmits(['formSubmit', 'cancle'])

  const currentUserStore = useCurrentUserStore()
  const restaurantsStore = useRestaurantsStore()
  const basketsStore = useBasketsStore();  

  const chosenDishes = computed(() => {
    return props.pOrder.dishes
  });

  const initOrder = () => {
    let iOrder = {
      id: props.pOrder.id,
      user_id: props.pOrder.user_id,
      attributes: {
        restaurant_id: props.pOrder.restaurant_id,
        user_id: props.pOrder.user_id,
        // orders_dishes_attributes: props.pOrder.order_dishes_attributes,
        reservation_attributes: { 
          id: props.pOrder.reservation.id,
          place_type: props.pOrder.reservation.place_type
        }
      }
    }

    return iOrder
  }

  const order = ref(initOrder())

  const initInsideOrder = () => {
    if (!!props.pOrder.reservation)
      return props.pOrder.reservation.place_type === 'inside'

    return false
  }
  const insideOrder = ref(initInsideOrder());
  const placeType = ref({ type: 'outside' })

  const formatDate = (time) => {
    return moment(time).tz(moment.tz.guess()).format('YYYY-MM-DDTHH:mm')
  }

  const formatDateWithTimeZone = (time) => {
    return moment(time).tz(moment.tz.guess()).format()
  }

  const reservationTimes = ref({
    start_at: formatDate(props.pOrder.reservation.start_at),
    end_at: formatDate(props.pOrder.reservation.end_at)
  })

  const tables = computed(() => {
    return restaurantsStore.currentRestaurant.tables
  })

  const setPlaceType  = () => {
    placeType.value.type = insideOrder.value ? 'inside' : 'outside'
    return placeType.value.type
  }

  const inlcudeAttribute = (attr, sourceObjectAttr = attr, sourceObject = props.pOrder) => {
    let sourceObjectAttrValue = sourceObject[sourceObjectAttr]

    if (attr === 'place_type')
      sourceObjectAttrValue = setPlaceType()

    if (['start_at', 'end_at'].includes(attr))
      sourceObjectAttrValue = formatDateWithTimeZone(sourceObjectAttrValue)

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
        <input type="datetime-local" id="start-date" v-model="reservationTimes.start_at" @change="inlcudeAttribute('start_at', 'start_at', reservationTimes)" />
      </div>

      <div class="input-group">
        <label for="inside-order">Inside Order:</label>
        <input type="checkbox" id="inside-order" v-model="insideOrder" @change="inlcudeAttribute('place_type', 'type', placeType)" />
      </div>

      <div v-if="insideOrder" class="input-group">
        <label for="end-date">End Date:</label>
        <input type="datetime-local" id="end-date" v-model="reservationTimes.end_at" @change="inlcudeAttribute('end_at', 'end_at', reservationTimes)" />
      </div>

      <div v-if="insideOrder" class="input-group">
        <label for="menu-slect">Table</label>
        <select id="menu-slect" class="text-input menu-select" v-model="pOrder.reservation.table_id" @change="inlcudeAttribute('table_id', 'table_id', pOrder.reservation)">
          <option v-for="table in tables" v-bind:value="table.id">
            {{ table.number }}
          </option>
        </select>
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
