<script setup>
  import { ref, computed, onBeforeMount } from 'vue';
  import { useCurrentUserStore } from '../../../../stores/users/currentUser';
  import user_service from '../../../services/users/user_service';
  import tokensService from '../../../services/tokensService';
  import { useContentsStore } from '../../../restaurants/stores/ContentsStore';
  import { useRestaurantsStore } from '../../../restaurants/stores/RestaurantsStore';
  import { useProfileUserFormErrorsStore } from '../show/stores/ProfileUserFormErrorsStore'
  import TextField from './fields/TextField.vue';
  import SearchInput from './fields/SearchInput.vue';
  import { BaseApi } from '../../../services/api/baseApi';
  import FormSettableButtons from '../../../../components/forms/FormSettableButtons.vue';

  const currentUserStore = useCurrentUserStore();  
  const restaurantsStore = useRestaurantsStore()
  const profileUserFormErrorsStore = useProfileUserFormErrorsStore()

  const user = ref({})
  const searchEmail = ref('');
  const readOnlyForm = ref(true)
  const searchAble = ref(false)

  const currentUser = computed(() => currentUserStore.user)
  const primaryButton = computed(() => {
    let button = { label: 'Edit', callback: editUserSwitch, enable: true }

    if (!readOnlyForm.value){
      button['label'] = 'Update'
      button['callback'] = async () => await updateUser()
    }
    
    if (user.value.id !== currentUser.value.id) {
      button['label'] = ''
      button['enable'] = false
      button['callback'] = () => {}  
    }

    return button
  })

  const secondaryButton = computed(() => {
    let button = { label: 'Search', callback: searchUserByEmail, enable: true }
    
    if (!readOnlyForm.value){
      button['label'] = 'Cancel'
      button['callback'] = editUserSwitch
    }

    return button
  })

  const setSeachText = (text) => {
    searchEmail.value = text 
  }

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

  const editUserSwitch = () => {
    readOnlyForm.value = !readOnlyForm.value
    searchAble.value = !searchAble.value
  }

  const updateUser = async () => {
    let args = {
      url: `http://localhost:3000/users/${currentUser.value.id}`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
    const requester = new BaseApi(args)

    await requester.requestBase(
      'put',
      profileUserFormErrorsStore,
      (response) => {
        currentUserStore.setCurrentUser(response.data)
      }
    )
  }
</script>

<template>
  <FormSettableButtons
    form-label="User"
    :primary-button="primaryButton" :secondary-button="secondaryButton" :errors-store="profileUserFormErrorsStore"
    @primaryBtnClick="primaryButton.callback" @secondaryBtnClick="secondaryButton.callback"
  >
    <div class="col-lg-6">
      <TextField
        label="Name" label-id="user-name"
        :text="user.name" :read-only="readOnlyForm"
      />

      <TextField
        label="Email" label-id="user-email"
        :text="user.email" :read-only="readOnlyForm"
      />

      <TextField
        label="Role" label-id="user-type"
        :text="user.type" :read-only="true"
      />
    </div>

    <div class="">
      <SearchInput
        label="Search" label-id="search-input"
        :read-only="searchAble"
        @text-change="setSeachText"
      />
    </div>
  </FormSettableButtons>
</template>

<style>
  .user-form {
    display: flex;
    justify-content: space-around;
  }
</style>
