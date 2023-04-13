<script setup>
import { useCurrentUserStore } from '../../stores/users/currentUser';
import RegularFormStyle from '../stylecomponents/RegularFormStyle.vue';

  const props = defineProps(['user', 'actionName', 'label'])
  const emits = defineEmits(['formSubmit', 'cancle'])

  const currentUserStore = useCurrentUserStore()
</script>

<template>
  <RegularFormStyle>
    <div class="form">
      <label for="u-name">{{ label }}</label>
      <div class="form__content">
        <label for="u-name">Name: </label>
        <input id='u-name' class="text-input" v-model="user.name"/>

        <label for="u-email">Email: </label>
        <input id='u-email' class="text-input" v-model="user.email"/>
        
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
          <select id="user-type" class="text-input" v-model="user.type">
            <option value="">Select a type</option>
            <option value="Customer">Customer</option>
            <option value="Cook">Cook</option>
            <option value="SuperAdmin">SuperAdmin</option>
          </select>
        </div>
      </div>

      <div class="form__actions">
        <button type="button" @click="$emit('formSubmit')">{{ actionName }}</button>
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
