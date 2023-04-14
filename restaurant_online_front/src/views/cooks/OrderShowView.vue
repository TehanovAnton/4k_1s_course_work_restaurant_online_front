<script setup>
  import { computed, ref } from 'vue';  
  import { useContentsStore } from '../restaurants/stores/ContentsStore';
  import { useCooksOrdersStore } from './stores/CooksOrdersStore';
  import moment from 'moment-timezone'
  import order_service from '../services/orders/order_service';

  const props = defineProps(['order'])

  const contentsStore = useContentsStore
  const ordersStore = useCooksOrdersStore()

  const rating = ref(null)
  const ratingText = ref(null)
  const statusesTransitions = {
    created: { transition: 'transition_in_progress', name: 'In Progress' },
    in_progress: { transition: 'transition_ready', name: 'Ready' }
  }

  const reservation = computed(() => {
    return props.order.reservation
  })

  const orderState = computed(() => {
    return props.order.order_state
  })

  const nextTransition = computed(() => {
    return statusesTransitions[orderState.value.aasm_state]
  })

  const localeTime = (time) => {
    return moment(time).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm')
  }

  const showRatingForm = ref(false)

  const hideRatingForm = () => { 
    showRatingForm.value = false
  }

  const submitTransition = async () => {
    debugger
    let {
      isSuccessful
    } = await order_service.apiUpdateOrderState(orderState.value.id, { transition: nextTransition.value.transition })
    
    if (isSuccessful) {
      ordersStore.updateOrders()
    }
  }
</script>


<template>
  <div class="order-card">
    <h2>Order #{{ order.id }}</h2>
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
  </div>
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
