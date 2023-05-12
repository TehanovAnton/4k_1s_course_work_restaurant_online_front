<script setup>
  import { computed, ref } from '@vue/reactivity';
  import { useBasketsStore } from '../../../views/baskets/stores/BasketsStore';
  import { useCurrentUserStore } from '../../../stores/users/currentUser';
  import { useRestaurantsStore } from '../../../views/restaurants/stores/RestaurantsStore';
  import moment from 'moment-timezone';
  import DefaultForm from '../../forms/DefaultForm.vue';
import { useOrderFormErrorsStore } from './stores/OrderFormErrorsStore';

  const props = defineProps(['pOrder', 'actionName'])
  const emits = defineEmits(['formSubmit', 'cancle'])

  const currentUserStore = useCurrentUserStore()
  const restaurantsStore = useRestaurantsStore()
  const orderFormErrosStore = useOrderFormErrorsStore()
  const basketsStore = useBasketsStore();  

  const order = ref({
    id: props.pOrder.id,
    user_id: props.pOrder.user_id,
    attributes: {
      restaurant_id: props.pOrder.restaurant_id,
      user_id: props.pOrder.user_id,
      orders_dishes_attributes: props.pOrder.order_dishes_attributes,
      reservation_attributes: {
        id: props.pOrder.reservation.id,
        place_type: props.pOrder.reservation.place_type
      }
    }
  })

  const isOrderType = (type) => {
    return order.value.attributes.reservation_attributes.place_type == type
  }

  const formatDate = (time) => {
    return moment(time).tz(moment.tz.guess()).format('YYYY-MM-DDTHH:mm')
  }

  const formatDateWithTimeZone = (time) => {
    return moment(time).tz(moment.tz.guess()).format()
  }

  const initReservationTimes = () => {
    return {
      start_at: formatDate(props.pOrder.reservation.start_at),
      end_at: formatDate(props.pOrder.reservation.end_at)
    }
  }
  const reservationTimes = ref(initReservationTimes())

  const tables = computed(() => {
    return restaurantsStore.currentRestaurant.tables
  })

  const orderPrice = computed(() => {
    return basketsStore.basketDishesPrice
  })

  const inlcudeAttribute = (attr, sourceObjectAttr = attr, sourceObject = props.pOrder) => {
    let sourceObjectAttrValue = sourceObject[sourceObjectAttr]

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
  <DefaultForm
    form-label="Order" :primary-button="actionName" secondary-button="Cancel" :errors-store="orderFormErrosStore"
    @primaryBtnClick="onFormSubmit" @secondaryBtnClick="onCancel"
  >
    <div class="col-lg-6">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="dish-name" placeholder="name@example.com" :value="orderPrice" readonly/>
        <label for="dish-name">Price</label>
      </div>

      <div class="mb-3">
        <label for="order-start-at">Start at</label>
        <input v-model="reservationTimes.start_at" @change="inlcudeAttribute('start_at', 'start_at', reservationTimes)" class="form-control" type="datetime-local" id="order-start-at">
      </div>

      <div v-if="isOrderType('inside')" class="mb-3">
        <label for="order-start-at">End at</label>
        <input v-model="reservationTimes.start_at" @change="inlcudeAttribute('start_at', 'start_at', reservationTimes)" class="form-control" type="datetime-local" id="order-start-at">
      </div>

      <div v-if="isOrderType('inside')" class="mb-3">
        <label for="order-table">Table</label>
        <select v-model="pOrder.reservation.table_id" @change="inlcudeAttribute('table_id', 'table_id', pOrder.reservation)" id="order-table" class="form-select">
          <option v-for="table in tables" v-bind:value="table.id">{{ table.number }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="order-place">Place</label>
        <select v-model="pOrder.reservation.place_type" @change="inlcudeAttribute('place_type', 'place_type', pOrder.reservation)" id="order-place" class="form-select">
          <option value="outside">Outside</option>
          <option value="inside">Inside</option>
        </select>
      </div>
    </div>
  </DefaultForm>
</template>
