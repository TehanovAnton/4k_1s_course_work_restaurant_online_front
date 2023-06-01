<script setup>
  import { computed, ref } from '@vue/reactivity';
  import { useContentsStore } from '../../../views/restaurants/stores/ContentsStore';
  import { useDishesStore } from '../../dishes/stores/DishesStore';
  import { useEditBasketsStore } from '../../../views/baskets/stores/EditOrderBasketStore';
  import { useMenusStore } from '../../../views/menus/stores/MenusStore'
  import ShowView from '../../dishes/v1/Show/BasketShowView .vue';
  import { CacncelToOrders } from '../../services/cancele/CancelToOrders';
  import DishesGrid from '../../dishes/v1/index/DishesGrid.vue';
  import OrderForm from '../../../components/orders/v1/OrderForm.vue';
  import { onBeforeMount } from 'vue';
  import { useOrdersStore } from '../stores/OrdersStore';
  import { useRestaurantsStore } from '../../restaurants/stores/RestaurantsStore';
  import { useOrderFormErrorsStore } from '../../../components/orders/v1/stores/OrderFormErrorsStore'
  import { BaseApi } from '../../services/api/baseApi';
  import tokensService from '../../services/tokensService';

  const contentsStore = useContentsStore()
  const dishesStore = useDishesStore()
  const menusStore = useMenusStore()
  const editOrderBasketStore = useEditBasketsStore()
  const ordersStore = useOrdersStore()
  const restaurantsStore = useRestaurantsStore()
  const errorsStore = useOrderFormErrorsStore()

  onBeforeMount(() => {
    if (!!!ordersStore.order.id)
      return contentsStore.setContent('OrdersIndexView')

    let orderRestaurant = restaurantsStore.findRestaurant(
      restaurantsStore.restaurants,
      { id: ordersStore.order.restaurant_id }
    )    

    restaurantsStore.setModel(orderRestaurant)  

    ordersStore.order.orders_dishes.forEach(orderDish => {
      editOrderBasketStore.addOrderDish(orderDish)
    });

    if (ordersStore.order.id)
      order.value = {
        id: ordersStore.order.id,
        user_id: ordersStore.order.user_id,
        restaurant_id: ordersStore.order.restaurant_id,
        dishes: editOrderBasketStore.dishes,
        order_dishes_attributes: editOrderBasketStore.currentBasket.dishes,
        reservation: { 
          id: ordersStore.order.reservation.id, 
          place_type: ordersStore.order.reservation.place_type, 
          start_at: ordersStore.order.reservation.start_at, 
          end_at: ordersStore.order.reservation.end_at, 
          table_id: ordersStore.order.reservation.table_id
        }
      }
  })

  const order = ref()

  const dishes = computed(() => {
    return editOrderBasketStore.dishes
  })

  const showOrders = () => {
    new CacncelToOrders().cancel()
  }

  const updateOrder = async (formOrder) => {
    let args = {
      url: `http://localhost:3000/orders/${ordersStore.order.id}`,
      data: { order: formOrder.attributes },
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
    const requester = new BaseApi(args)

    await requester.requestBase(
      'put',
      errorsStore,
      () => {
        contentsStore.setContent('OrdersIndexView')
      }
    )
  }
</script>

<template>
  <div v-if="ordersStore.order.id" class="container">
    <div class="col">
      <DishesGrid>
        <ShowView 
          v-for="dish in dishes"
          :dish="dish"
          :editable="false"
        />
      </DishesGrid>

      <OrderForm
        action-name="Edit" :pOrder="order"
        :baskets-store="editOrderBasketStore"
        @form-submit="updateOrder" @cancle="showOrders"
      />
    </div>
  </div>
</template>
