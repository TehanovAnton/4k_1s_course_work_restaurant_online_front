<script setup>
  import { computed } from 'vue';  
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

  const localeTime = (time) => {
    return moment(time).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm')
  }

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
</script>


<template>
  <div class="order-card">
    <h2>Order #{{ order.id }}</h2>
    <div class="order-info">
      <p><strong>Start:</strong> {{ localeTime(reservation.start_at) }}</p>
      <p v-if="order.reservation.place_type === 'inside'"><strong>End:</strong> {{ localeTime(reservation.end_at) }}</p>
    </div>
    <div class="chosen-dishes">
      <h3>Chosen Dishes:</h3>
      <ul>
        <li v-for="dish in order.dishes" :key="dish.id">{{ dish.name }}</li>
      </ul>
    </div>

    <EditIcon @icon-click="editOrder" />
    <DeleteIcon @icon-click="deleteOrder" />
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
