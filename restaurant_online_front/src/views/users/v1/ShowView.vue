<script setup>
  import { ref, computed, onBeforeMount } from 'vue';
  import { useCurrentUserStore } from '../../../stores/users/currentUser';
  import user_service from '../../services/users/user_service';
  import tokensService from '../../services/tokensService';
  import EditIcon from '../../icons/EditIcon.vue';
  import EditView from '../EditView.vue';
  import { useContentsStore } from '../../restaurants/stores/ContentsStore';
import { useRestaurantsStore } from '../../restaurants/stores/RestaurantsStore';

  const currentUserStore = useCurrentUserStore();  
  const contentsStore = useContentsStore()
  const restaurantsStore = useRestaurantsStore()

  const currentUser = computed(() => currentUserStore.user)
  const user = ref({})
  const searchEmail = ref('');

  const setUser = (userValue) => {
    if (!!userValue) {
      if (userValue.type === 'Cook') {
        userValue.restaurant = restaurantsStore.findRestaurant(restaurantsStore.currentUserRestaurants, userValue.restaurant)
      }

      if (currentUser.value.id === userValue.id)
        currentUserStore.setCurrentUser(userValue)  

      user.value = userValue
    }
  }

  onBeforeMount(() => {
    setUser(currentUser.value)
  })  

  const searchUserByEmail = async () => {
    let { isSuccessful, response } = await user_service.apiShowUserByEmail(tokensService.auth_headers(), searchEmail.value)

    if (isSuccessful) {
      setUser(response.data)
    }
  };

  const editUserForm = ref(false)

  const editUser = () => {
    editUserForm.value = true
  }

  const resetPage = (formUser) => {
    setUser(formUser)
    editUserForm.value = false
  }
</script>

<template>
  <div>
    <div v-if="user.id && !editUserForm">
      <h2>{{ user.name }}</h2>
      <EditIcon @icon-click="editUser" />
      <p>Email: {{ user.email }}</p>
      <p>Role: {{ user.type }}</p>

      <form v-if="currentUser.type === 'SuperAdmin'" @submit.prevent="searchUserByEmail">
        <label for="search-email">Search User By Email:</label>
        <input type="email" id="search-email" v-model="searchEmail" required>

        <button type="submit">Search</button>
      </form>
    </div>    

    <div v-if="editUserForm" class="user-form">
      <EditView :user="user"
                @data-change="resetPage"
                @cancle="resetPage" />
    </div>
  </div>
</template>

<style>
  .user-form {
    display: flex;
    justify-content: space-around;
  }
</style>
