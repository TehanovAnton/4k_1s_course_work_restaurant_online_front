<script setup>
import { useCurrentUserStore } from '../../stores/users/currentUser';

  const props = defineProps(['user', 'actionName'])
  const emits = defineEmits(['formSubmit'])

  const currentUserStore = useCurrentUserStore()
</script>

<template>
  <div class="card">
    <form class="block">
      <div class="centrenize-content-column">
        <label for="u-name">Name: </label>
        <input id='u-name' v-model="user.name"/>

        <label for="u-email">Email: </label>
        <input id='u-email' v-model="user.email"/>
        
        <div v-if="actionName == 'create'">
          <label for="u-password">Password: </label>
          <input id='u-password' v-model="(user.password)"/>

          <label for="u-password-confirmation">Password confirmation: </label>
          <input id='u-password-confirmation' v-model="(user.password_confirmation)"/>

          <label for="u-type">Type: </label>
          <input id='u-type' v-model="user.type"/>
        </div>

        <div v-if="currentUserStore.user.type === 'SuperAdmin'">
          <label for="user-type">User Type:</label>
          <select id="user-type" v-model="user.type">
            <option value="">Select a type</option>
            <option value="Customer">Customer</option>
            <option value="Cook">Cook</option>
            <option value="SuperAdmin">SuperAdmin</option>
          </select>
        </div>
      </div>

      <button type="button" @click="$emit('formSubmit')">{{ actionName }}</button>
    </form>
  </div>
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
