<script setup>
  import { ref } from 'vue';
  import OrderForm from '../../../components/orders/v1/OrderForm.vue';
  import order_service from '../../services/orders/order_service';
  import { useBasketsStore } from '../../baskets/stores/BasketsStore';
  import { useContentsStore } from '../../restaurants/stores/ContentsStore';
  import { useOrdersStore } from '../stores/OrdersStore';
  import { useRestaurantsStore } from '../../restaurants/stores/RestaurantsStore';
  import { useCurrentUserStore } from '../../../stores/users/currentUser';

  const basketsStore = useBasketsStore()
  const contentsStore = useContentsStore()
  const ordersStore = useOrdersStore()
  const restaurantsStore = useRestaurantsStore()
  const currentUserStore = useCurrentUserStore()

  const order = ref({
    id: '',
    user_id: currentUserStore.user.id,
    restaurant_id: restaurantsStore.currentRestaurant.id,
    dishes: basketsStore.dishes,
    order_dishes_attributes: basketsStore.currentBasket.dishes,
    reservation: { id: '', place_type: 'outside', start_at: '', table_id: '' }
  })

  const createOrder = async (order) => {

    let { isSuccessful } = await order_service.apiCreateOrder(order)

    if (isSuccessful) {
      basketsStore.clearBasket()
      ordersStore.updateOrders()
      contentsStore.setContent('OrdersIndexView')
    }
  }

  const showBasket = () => {
    contentsStore.setContent('BasketShowView')
  }
</script>

<template>
  <OrderForm action-name="Create" :pOrder="order"
             @form-submit="createOrder" @cancle="showBasket" />
</template>