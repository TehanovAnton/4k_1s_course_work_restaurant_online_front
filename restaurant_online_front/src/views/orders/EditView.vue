<script setup>
  import OrderForm from '../../components/orders/OrderForm.vue';
  import service from '../services/orders/order_service'

  const props = defineProps(['order'])
  const emits = defineEmits(['data-change'])

  const updatMenu = async () => {
    let isSuccessful = await service.apiUpdateOrder(props.order)

    if (isSuccessful) {      
      emits('data-change')
    }
  }
</script>

<template>
  <div class="block">
    Edit Order:
    <OrderForm :order="order" action-name="update"
               @form-submit="updatMenu" />
  </div>
  rest:{{ order.restaurant }}
</template>