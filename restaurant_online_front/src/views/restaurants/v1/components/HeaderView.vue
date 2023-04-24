<script setup>
  import { useCurrentUserStore } from '../../../../stores/users/currentUser';
import { OwnService } from '../../../services/owns/ownService';
  import { useContentsStore } from '../../stores/ContentsStore';

  const contentsStore = useContentsStore()
  const currentUserStore = useCurrentUserStore()
  const ownService = new OwnService()

  const createWelcome = () => {
    contentsStore.setContent('CreateWelcomeView')
  }

  const basketShowView = () => {
    contentsStore.setContent('BasketShowView')
  }

  const setContentView = (content) => {
    contentsStore.setContent(content)
  }

  const isUserType = (type) => {
    return ownService.isUserType(type, currentUserStore.user)
  }

  const signOut = async () => {
    await currentUserStore.apiSignOut()
  }
</script>

<template>
  <div class="r-header" :on-click="createWelcome">  
    <button
      v-if="[isUserType('Customer'), isUserType('SuperAdmin')].includes(true)"
      @click="setContentView('SearchIndexView')">
      Search
    </button>

    <button
      @click="setContentView('UserShowView')">
      Profile
    </button>

    <button
      v-if="[isUserType('Customer'), isUserType('SuperAdmin')].includes(true)"
      @click="setContentView('RestaurantsIndexView')">
      Restaurants
    </button>

    <button
      v-if="[isUserType('Customer'), isUserType('SuperAdmin')].includes(true)"
      @click="setContentView('OrdersIndexView')">
      Orders
    </button>

    <button 
      v-if="[isUserType('Cook'), isUserType('SuperAdmin')].includes(true)"
      @click="setContentView('CooksOrdersView')">
      Cooks Orders
    </button>

    <button
      v-if="[isUserType('Customer'), isUserType('SuperAdmin')].includes(true)"
      @click="setContentView('BasketShowView')">
      Basket
    </button>

    <button
      v-if="[isUserType('SuperAdmin')].includes(true)"
      @click="createWelcome">
      Create
    </button>

    <button
      @click="signOut">
      Sign Out
    </button>
  </div>
</template>

<style>
  .r-header {
    display: flex;
    justify-content: space-around;
    
    background-color: black;
  }

  .h-element {
    background-color: white;
    padding: 5px;
    border-radius: 6px;
  }
</style>