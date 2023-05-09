<script setup>
  import { useCurrentUserStore } from '../../../../../stores/users/currentUser';
  import { OwnService } from '../../../../services/owns/ownService';
  import { useContentsStore } from '../../../stores/ContentsStore';
  import NavDropDown from './NavDropDown.vue';
  import NavLi from './NavLi.vue';

  const contentsStore = useContentsStore()
  const currentUserStore = useCurrentUserStore()
  const ownService = new OwnService()

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
  <div class="container rounded bg-dark">
    <div class="row m-3 bg-transparent">
      <ul class="nav nav-pills nav-fill">
        <NavLi v-if="[isUserType('Customer'), isUserType('SuperAdmin')].includes(true)"
          label="Search"
          @nav-click="setContentView('SearchIndexView')"
        />

        <NavLi
          label="Profile"
          @nav-click="setContentView('UserShowView')"
        />

        <NavLi v-if="[isUserType('Customer'), isUserType('SuperAdmin')].includes(true)"
          label="Restaurants"
          @nav-click="setContentView('RestaurantsIndexView')"
        />

        <NavLi v-if="[isUserType('Customer'), isUserType('SuperAdmin')].includes(true)"
          label="Orders"
          @nav-click="setContentView('OrdersIndexView')"
        />

        <NavLi v-if="[isUserType('Cook'), isUserType('SuperAdmin')].includes(true)"
          label="Cooks Orders"
          @nav-click="setContentView('CooksOrdersView')"
        />

        <NavLi v-if="[isUserType('Customer'), isUserType('SuperAdmin')].includes(true)"
          label="Basket"
          @nav-click="setContentView('BasketShowView')"
        />

        <NavDropDown label="Create">
          <li><a class="dropdown-item" @click="setContentView('RestaurantCreateView')">Restaurant</a></li>
          <li><a class="dropdown-item" @click="setContentView('MenuCreateView')">Menu</a></li>
          <li><a class="dropdown-item" @click="setContentView('DishCreateView')">Dish</a></li>        
        </NavDropDown>

        <NavLi v-if="[isUserType('SuperAdmin')].includes(true)"
          label="Sign out"
          @nav-click="signOut"
        />
      </ul>
    </div>
  </div>
</template>
