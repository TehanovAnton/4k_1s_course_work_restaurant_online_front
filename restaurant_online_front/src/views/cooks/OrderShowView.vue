<script setup>
  import { computed, ref } from 'vue';  
  import { useContentsStore } from '../restaurants/stores/ContentsStore';
  import { useCooksOrdersStore } from './stores/CooksOrdersStore';
  import moment from 'moment-timezone'
  import order_service from '../services/orders/order_service';
  import { useCooksOrdersSocketStore } from './sockets/CooksOrdersSocketStore';
  import ModelShowWrap from '../../components/stylecomponents/ModelShowWrap.vue';
  import { OrderBasket } from '../baskets/OrderBasket';

  const props = defineProps(['order'])

  const orderBasket = new OrderBasket(props.order.dishes)
  const primaryButton = computed(() => {
    return {
      enable: true,
      label: nextTransition.value.name,
      callBack: submitTransition
    }
  })

  const secondaryButton = ref({
    enable: false,
    label: 'Destroy',
    callBack: () => {}
  })

  const contentsStore = useContentsStore()
  const ordersSocketStore = useCooksOrdersSocketStore()

  const order = computed(() => {
    return props.order
  })

  const statusesTransitions = {
    created: { transition: 'transition_in_progress', name: 'In Progress' },
    in_progress: { transition: 'transition_ready', name: 'Ready' }
  }

  const reservation = computed(() => {
    return order.value.reservation
  })

  const orderState = computed(() => {
    return order.value.order_state
  })

  const orderRestaurant = computed(() => {
    return props.order.restaurant
  })

  const nextTransition = computed(() => {
    return statusesTransitions[orderState.value.aasm_state]
  })

  const orderType = (type) => {
    return type === reservation.value.place_type
  }

  const localeTime = (time) => {
    return moment(time).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm')
  }

  const submitTransition = async () => {
    let transition = { transition: nextTransition.value.transition }
    await ordersSocketStore.udpateTransition(orderState.value.id, transition)
  }
</script>


<template>
  <ModelShowWrap
    :primary-button="primaryButton" :secondary-button="secondaryButton" :label="`Order ${order.id}`"
    @primaryBtnClick="primaryButton.callBack" @secondaryBtnClick="secondaryButton.callBack"
  >
    <div class="row bg-transparent">
      <div class="col" v-if="orderType('outside')">
        <h5 class="card-title d-flex justify-content-around">{{ orderRestaurant.name }} - {{ orderRestaurant.address }}</h5>
        <h5 class="card-title d-flex justify-content-around">Start - {{ localeTime(reservation.start_at) }}</h5>      
        <h5 class="card-title d-flex justify-content-around">{{ orderState.aasm_state }}</h5>
        <h5 class="card-title d-flex justify-content-around">{{ orderBasket.basketDishesPrice() }}$</h5>
      </div>

      <div class="col" v-if="orderType('inside')">
        <h5 class="card-title d-flex justify-content-around">{{ orderRestaurant.name }} - {{ orderRestaurant.address }}</h5>
        <h5 class="card-title d-flex justify-content-around">Start - {{ localeTime(reservation.start_at) }}</h5>
        <h5 class="card-title d-flex justify-content-around">End - {{ localeTime(reservation.end_at) }}</h5>
        <h5 class="card-title d-flex justify-content-around">Table - {{ reservation.table.number }}</h5>
        <h5 class="card-title d-flex justify-content-around">{{ orderState.aasm_state }}</h5>
      </div>
      
      <div class="col d-flex justify-content-around">
        <div class="list-group">
          <a
            v-for="dish in order.dishes"
            class="list-group-item list-group-item-action"
          >
            {{ dish.name }} x{{ orderBasket.basketDishCount(dish) }}
          </a>
        </div>
      </div>
    </div>
  </ModelShowWrap>

  <!-- <div class="order-card">
    <h2>Or #{{ order.id }}</h2>
    <div class="order-info">
      <p><strong>Start:</strong> {{ localeTime(reservation.start_at) }}</p>
      <p v-if="order.reservation.place_type === 'inside'"><strong>End:</strong> {{ localeTime(reservation.end_at) }}</p>
      <p><strong>State:</strong> {{ orderState.aasm_state }}</p>
      <p v-if="!!order.rating">
        <strong>Rating:</strong>
        <p>{{ order.rating.evaluation }}</p>
        <p>{{ order.rating.text }}</p>
      </p>
    </div>
    <div class="chosen-dishes">
address
email
phone
      <h3>Chosen Dishes:</h3>
      <ul>
        <li v-for="dish in order.dishes" :key="dish.id">{{ dish.name }}</li>
      </ul>
    </div>

    <div>
      <form v-if="nextTransition" @submit.prevent="submitTransition">
        <label for="rating">Transition</label>
        <button type="submit">{{ nextTransition.name }}</button>
      </form>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
  .order-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f2f2f2;
    }

    .order-info {
      margin-bottom: 10px;
    }

    .chosen-dishes {
      margin-top: 10px;

      ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          margin-bottom: 5px;
        }
      }
    }
  }
</style>
