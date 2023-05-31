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
  import { ButtonSetting } from '../../../services/buttons/ButtonSetting';
  import FloatLabelInput from '../../../../components/forms/FloatLabelInput.vue';
  import { CacncelToRestaurant } from '../../../services/cancele/CancelToRestaurant';

  const currentUserStore = useCurrentUserStore();  
  const restaurantsStore = useRestaurantsStore()
  const profileUserFormErrorsStore = useProfileUserFormErrorsStore()

  const user = ref({})
  const searchEmail = ref('');
  const readOnlyForm = ref(true)
  const searchAble = ref(false)

  const currentUser = computed(() => currentUserStore.user)
  const primaryButton = computed(() => {
    const button = new ButtonSetting('Edit', true,  editUserSwitch)

    if (!readOnlyForm.value){
      button.setAttribute('label', 'Update')
      button.setAttribute('callback', async () => await updateUser())
    }
    
    if (user.value.id !== currentUser.value.id) {
      button.setAttribute('enable', false)
      button.setAttribute('label', '')
      button.setAttribute('callback', () => {})
    }

    return button
  })

  const secondaryButton = computed(() => {
    const button = new ButtonSetting('Search', true, searchUserByEmail)
    
    if (!readOnlyForm.value) {
      button.setAttribute('label', 'Cancel')
      button.setAttribute('callback', editUserSwitch)
    } else if (readOnlyForm.value && currentUser.value.type === 'Customer') {
      button.setAttribute('label', 'Cancel')
      button.setAttribute('callback', () => new CacncelToRestaurant().cancel() )
    }

    return button
  })

  const setSeachText = (text) => {
    searchEmail.value = text 
  }

  const setUser = (userValue) => {
    if (!!userValue) {
      if (userValue.type === 'Cook') {
        userValue.restaurant = restaurantsStore.findRestaurant(restaurantsStore.restaurants, userValue.restaurant)
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
      data: { user: user.value },
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
        editUserSwitch()
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
      <FloatLabelInput label="Name" label-id="user-name">
        <input
          type="text" id="user-name" class="form-control"
          v-model="user.name" v-bind:readonly="readOnlyForm" v-bind:disabled="readOnlyForm"
        />
      </FloatLabelInput>

      <FloatLabelInput label="Email" label-id="user-email">
        <input
          type="text" id="user-email" class="form-control"
          v-model="user.email" v-bind:readonly="readOnlyForm" v-bind:disabled="readOnlyForm"
        />
      </FloatLabelInput>

      <FloatLabelInput label="Role" label-id="user-type">
        <input
          type="text" id="user-type" class="form-control"
          v-model="user.type" v-bind:readonly="true" v-bind:disabled="true"
        />
      </FloatLabelInput>
    </div>

    <div v-if="currentUser.type != 'Customer'">
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
