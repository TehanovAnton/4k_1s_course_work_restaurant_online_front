<script setup>
  const props = defineProps(['orders', 'activeOrder'])

  const orderClass = (order) => {
    if (props.activeOrder && order.id === props.activeOrder.id) {
      return 'active-block'
    }

    return 'block'
  }
</script>

<template>
  <div class="menu centrenize-content-column">
    <p v-for="order in orders" v-bind:class="orderClass(order)"  @click="$emit('order-click',  order)">
      <p>
        created: {{ order.created_at }}

        <p v-for="dish in order.dishes">
          {{ dish.name }}
        </p>
      </p>
    </p>
  </div>
</template>
