<script setup>
  import DishesList from '../../baskets/DishesList.vue';
  import OrderForm from '../../../components/orders/v1/OrderForm.vue';
  import order_service from '../../services/orders/order_service';
  import { useBasketsStore } from '../../baskets/stores/BasketsStore';
  import { useContentsStore } from '../../restaurants/stores/ContentsStore';

  const basketsStore = useBasketsStore()
  const contentsStore = useContentsStore()

  const createOrder = async (order) => {
    let { isSuccessful } = await order_service.apiCreateOrder(order)

    if (isSuccessful) {      
      contentsStore.setContent('OrdersIndexView')
      basketsStore.clearBasket()
    }
  }
</script>

<template>
  <DishesList :dishes="basketsStore.dishes" />
  <OrderForm :order="{}"
             @form-submit="createOrder" />
</template>