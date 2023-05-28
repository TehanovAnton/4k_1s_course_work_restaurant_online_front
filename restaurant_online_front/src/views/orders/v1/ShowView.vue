<script setup>
  import { computed, ref } from 'vue';  
  import { useContentsStore } from '../../restaurants/stores/ContentsStore';
  import { useOrdersStore } from '../stores/OrdersStore';
  import moment from 'moment-timezone'
  import order_service from '../../services/orders/order_service';
  import ModelShowWrap from '../../../components/stylecomponents/ModelShowWrap.vue';
  import { OrderBasket } from '../../baskets/OrderBasket'
  import OrderRate from './components/OrderRate.vue';

  const props = defineProps(['order'])

  const orderBasket = new OrderBasket(props.order.dishes)
  const primaryButton = computed(() => {
    if (!['ready', 'finished'].includes(orderState.value.aasm_state)) {
      return {
        enable: true,
        label: 'Edit',
        callBack: editOrderView
      }
    } else {
      return {
        enable: false,
        label: '',
        callBack: () => {}
      }
    }
  })

  const secondaryButton = computed(() => {
    if (!['ready', 'finished'].includes(orderState.value.aasm_state)) {
      return {
        enable: true,
        label: 'Destroy',
        callBack: async () => await deleteOrder()
      }
    } else {
      return {
        enable: false,
        label: '',
        callBack: () => {}
      }
    }
  })

  const contentsStore = useContentsStore()
  const ordersStore = useOrdersStore()

  const reservation = computed(() => {
    return props.order.reservation
  })

  const orderState = computed(() => {
    return props.order.order_state
  })

  const orderRestaurant = computed(() => {
    return props.order.restaurant
  })

  const localeTime = (time) => {
    return moment(time).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm')
  }

  const showRatingForm = ref(false)

  const editOrderView = () => {
    ordersStore.setOrder(props.order)
    contentsStore.setContent('OrderEditView')
  }

  const deleteOrder = async () => {
    let {
      isSuccessful
    } = await order_service.apiDestroyOrder(props.order.id)

    if (isSuccessful) {
      ordersStore.updateOrders()
      contentsStore.setContent('OrdersIndexView')
    }
  }

  const displayRatingForm = () => { 
    showRatingForm.value = true
  }

  const hideRatingForm = () => { 
    showRatingForm.value = false
  }

  const submitRating = async () => {
    let {
      isSuccessful
    } = await order_service.apiCreateRating(props.order.id, {
      rating: {
        order_id: props.order.id,
        evaluation: rating.value,
        text: ratingText.value
      }
    })

    if (isSuccessful) {
      ordersStore.updateOrders()
      hideRatingForm()
    }
  }

  const orderType = (type) => {
    return type === reservation.value.place_type
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

      <OrderRate :order="order" />
    </div>
  </ModelShowWrap>
</template>
