<script setup>
  import { ref } from 'vue';
  import OrderForm from '../../components/orders/OrderForm.vue';
  import order_service from '../services/orders/order_service';
  import { useCurrentUserStore } from '../../stores/users/currentUser';
  const currentUser = useCurrentUserStore()

  const props = defineProps(['menu'])
  const order = ref({
    user_id: currentUser.user.id,
    restaurant_id:'',
    orders_dishes_attributes:[], 
    reservations_attributes:[{ place_type:'outside' }]
  })
  const emits = defineEmits(['data-change'])

  const createOrder = async () => {
    let isSuccessful = await order_service.apiCreateOrder(order.value)

    if (isSuccessful) {      
      emits('data-change')
    }
  }

</script>

<template>
  <div class="block">
    Add Order:
    <OrderForm  action-name="create" :order="order"
                @form-submit="createOrder" />
  </div>
</template>