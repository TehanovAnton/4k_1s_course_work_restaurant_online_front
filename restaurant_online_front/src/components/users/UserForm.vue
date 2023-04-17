<script setup>
  import { computed, onBeforeMount, ref } from 'vue';
  import { useCurrentUserStore } from '../../stores/users/currentUser';
  import RegularFormStyle from '../stylecomponents/RegularFormStyle.vue';
  import { useRestaurantsStore } from '../../views/restaurants/stores/RestaurantsStore';

  const props = defineProps(['user', 'actionName', 'label'])
  const emits = defineEmits(['formSubmit', 'cancle'])

  const currentUserStore = useCurrentUserStore()
  const restaurantsStore = useRestaurantsStore()

  const currentUserRestaurants = computed(() => restaurantsStore.currentUserRestaurants)

  const formUser = ref(Object.assign({}, props.user))

  const initFormRestaurant = () => {
    if (formUser.value.type === 'Cook')
      return Object.assign({}, formUser.value.restaurant)

    if (formUser.value.type === 'SuperAdmin') {
      let restaurant = restaurantsStore.findRestaurant(currentUserRestaurants.value, formUser.value.restaurants[0])
      debugger
      return Object.assign({}, restaurant)
    }      
      
    return Object.assign({}, currentUserRestaurants.value[0])
  }
  const formRestaurant = ref(initFormRestaurant())

  const setAdditionalTypeAttributes = (formUser) => {
    if (formUser.type === 'Cook') {
      formUser.restaurants_admins_attributes = null
      formUser.restaurants_cook_attributes = { restaurant_id: formRestaurant.value.id }
    } else if (formUser.type === 'SuperAdmin') {
      formUser.restaurants_cook_attributes = null
      formUser.restaurants_admins_attributes = [{ restaurant_id: formRestaurant.value.id }]
    } else {
      formUser.restaurants_cook_attributes = null
      formUser.restaurants_admins_attributes = null
    }
  }

  const setAdditionalRestaurantAttributes = (formUser) => {
    if (formUser.type === 'Cook') {

      debugger
      if (!!!formUser.restaurants_cook) {
        formUser.restaurants_cook_attributes = { restaurant_id: formRestaurant.value.id }
      } else {
        let restaurants_cook = formUser.restaurants_cook
        formUser.restaurants_cook_attributes = { id: restaurants_cook.id, restaurant_id: formRestaurant.value.id }
      }

    } else if (formUser.type === 'SuperAdmin') {
      if (!!!formUser.restaurants_admins) {
        formUser.restaurants_admins_attributes = [{ restaurant_id: formRestaurant.value.id }]
      } else {
        let restaurants_admin = formUser.restaurants_admins.find(ra => ra.restaurant_id === formRestaurant.value.id)

        if (restaurants_admin)
          return formUser.restaurants_admins_attributes = [{ id: restaurants_admin.id, restaurant_id: formRestaurant.value.id }]

        formUser.restaurants_admins_attributes = [{ restaurant_id: formRestaurant.value.id }]
      }
    }
  }

  const formSubmit = (formUser) => {
    emits('formSubmit', formUser)
  }
</script>

<template>
  <RegularFormStyle>
    <div class="form">
      <label for="u-name">{{ label }}</label>
      <div class="form__content">
        <label for="u-name">Name: </label>
        <input id='u-name' class="text-input" v-model="formUser.name"/>

        <label for="u-email">Email: </label>
        <input id='u-email' class="text-input" v-model="formUser.email"/>
        
        <div v-if="actionName == 'create'">
          <label for="u-password">Password: </label>
          <input id='u-password' class="text-input" v-model="(user.password)"/>

          <label for="u-password-confirmation">Password confirmation: </label>
          <input id='u-password-confirmation' class="text-input" v-model="(user.password_confirmation)"/>

          <label for="u-type">Type: </label>
          <input id='u-type' class="text-input" v-model="user.type"/>
        </div>

        <div v-if="currentUserStore.user.type === 'SuperAdmin'">
          <label for="user-type">User Type:</label>
          <select id="user-type" class="text-input" v-model="formUser.type" @change="setAdditionalTypeAttributes(formUser)">
            <option value="Customer">Customer</option>
            <option value="Cook">Cook</option>
            <option value="SuperAdmin">SuperAdmin</option>
          </select>

          <div v-if="['SuperAdmin', 'Cook'].includes(formUser.type)">
            <label for="user-type">Restaurant:</label>
            <select
              id="user-type"
              class="text-input"
              v-model="formRestaurant"
              @change="setAdditionalRestaurantAttributes(formUser)">
              <option
                v-for="restaurant in currentUserRestaurants"
                :value="restaurant">
                {{ restaurant.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="form__actions">
        <button type="button" @click="formSubmit(formUser)">{{ actionName }}</button>
        <button type="button" @click="$emit('cancle')">cancle</button>
      </div>
    </div>
  </RegularFormStyle>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.centrenize-content-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
