<script setup>

  import { computed } from 'vue';
  import LoadRestaurants from './components/datacomponents.vue/LoadRestaurants.vue'
  import DishesIndexView from '../../dishes/v1/IndexView.vue';
  import CurrentMenu from '../../menus/v1/components/CurrentMenu.vue';
  import EditIcon from '../../icons/EditIcon.vue';
  import restaurant_service from '../../services/restaurants/restaurant_service';
  import tokensService from '../../services/tokensService';
  import { useRestaurantsStore } from '../stores/RestaurantsStore';
  import { useMenusStore } from '../../menus/stores/MenusStore';  
  import { useContentsStore } from '../stores/ContentsStore';
  import MenuCreateView from '../../menus/CreateView.vue';
  import DeleteIcon from '../../icons/DeleteIcon.vue';
  import { useCurrentUserStore } from '../../../stores/users/currentUser';
  import CreateCookAccount from '../../../components/users/forms/CreateCookAccount.vue';
import { Tabs } from 'vue3-tabs-component';
import CommandStructureView from './team/CommandStructureView.vue';

  const restaurantStore = useRestaurantsStore();
  const contentsStore = useContentsStore()
  const currentUserSotre = useCurrentUserStore()
  
  const restaurant = computed(() => { return restaurantStore.currentRestaurant })

  const menusStore = useMenusStore();
  const editRestaurant = () => {
    contentsStore.setContent('RestaurantEditView')
  }

  const deleteRestaurant = async () => {
    let { isSuccessful, response } = await restaurant_service.apiDestroyRestaurants(tokensService.auth_headers(), restaurant.value)

    if (isSuccessful) {
      contentsStore.setContent('RestaurantsIndexView')
    }
  }

  const ownRestaurant = computed(() => {
    return restaurantStore.ownRestaurant(restaurant.value, currentUserSotre.user)
  })
</script>

<template>
  <LoadRestaurants>
    <div class="container">
      <div class="menu-container">
        <div class="card border">
          <div class="card-body">
            <h1 class="card-title">{{ restaurant.name }}</h1>
            <p class="card-text">{{ restaurant.address }}</p>
            <p class="card-text">{{ restaurant.workingTime }}</p>
          </div>

          <EditIcon v-if="ownRestaurant" @icon-click="editRestaurant" />
          <DeleteIcon v-if="ownRestaurant" @icon-click="deleteRestaurant" />
        </div>

        <CurrentMenu v-if="menusStore.menusExists" />    
      </div>

      <tabs>
        <tab name="Menu">
          <DishesIndexView v-if="menusStore.menusExists" />

          <MenuCreateView v-if="ownRestaurant && !menusStore.menusExists" />
        </tab>


        <tab name="Team">
          <tabs>
            <tab name="Add Cook Account">
              <CreateCookAccount />
            </tab>

            <tab name="Team">
              <CommandStructureView />
            </tab>
          </tabs>
        </tab>
      </tabs>
    </div>
  </LoadRestaurants>
</template>

<style lang="scss">
  .menu-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .border {
    border: none;
    border-right: 1px solid #ddd;
    border-radius: 0;
  }

  .sub-card {
    margin-top: 1rem;
  }

  .card {
    margin: 0;
  }
</style>
