<script setup>
  import { computed, ref } from 'vue';  
  import { useContentsStore } from '../../restaurants/stores/ContentsStore';
  import { useOrdersStore } from '../stores/OrdersStore';
  import moment from 'moment-timezone'
  import order_service from '../../services/orders/order_service';
  import DeleteIcon from '../../icons/DeleteIcon.vue';
  import EditIcon from '../../icons/EditIcon.vue';

  const props = defineProps(['order'])

  const contentsStore = useContentsStore()
  const ordersStore = useOrdersStore()

  const reservation = computed(() => {
    return props.order.reservation
  })

  const orderState = computed(() => {
    return props.order.order_state
  })

  const localeTime = (time) => {
    return moment(time).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm')
  }

  const showRatingForm = ref(false)

  const editOrder = () => {
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

  const rating = ref(null)
  const ratingText = ref(null)

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

    <div v-if="orderState.aasm_state === 'finished' && !!!order.rating ">
      <button v-if="!showRatingForm" @click="displayRatingForm">Add rating</button>
      <form v-if="showRatingForm" @submit.prevent="submitRating">
        <label for="rating">Rating (1-10):</label>
        <input type="number" id="rating" name="rating" min="1" max="10" v-model.number="rating" required>
        <br>
        <label for="rating-text">Rating text:</label>
        <textarea id="rating-text" name="rating-text" v-model="ratingText" required></textarea>
        <br>
        <button type="submit">Submit</button>
        <button type="button" @click="hideRatingForm">Cancel</button>
      </form>
    </div>
    <div>
      <EditIcon @icon-click="editOrder" />
      <DeleteIcon @icon-click="deleteOrder" />
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
