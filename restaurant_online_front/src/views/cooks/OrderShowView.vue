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
    if (orderState.value.aasm_state === 'ready') {
      return {
        enable: false,
        label: '',
        callBack: () => {}
      }
    }

    return {
      enable: true,
      label: nextTransition.value ? nextTransition.value.name : "",
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
    in_progress: { transition: 'transition_ready', name: 'Ready' },
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
            v-for="dish in orderBasket.baskeDishes()"
            class="list-group-item list-group-item-action"
          >
            {{ dish.name }} x{{ orderBasket.basketDishCount(dish) }}
          </a>
        </div>
      </div>
    </div>
  </ModelShowWrap>
</template>
