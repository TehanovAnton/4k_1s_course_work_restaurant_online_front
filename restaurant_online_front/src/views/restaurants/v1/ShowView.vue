<script setup>

  import { computed } from 'vue';
  import LoadRestaurants from './components/datacomponents.vue/LoadRestaurants.vue'
  import DishesIndexView from '../../dishes/v1/index/IndexView.vue';
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
      <div class="row bg-transparent d-flex justify-content-around">

        <div class="col">
          <div class="card">
            <div class="card-body">
              <h1 class="card-title d-flex justify-content-around">{{ restaurant.name }}</h1>
              <h5 class="card-title d-flex justify-content-around">{{ restaurant.address }}</h5>
            </div>

            <div v-if="ownRestaurant" class="row bg-transparent">
              <div class="d-flex justify-content-around">
                <button class="btn btn-outline-success" @click="editRestaurant">
                  Edit
                </button>

                <button class="btn btn-outline-dark" @click="deleteRestaurant">
                  Destroy
                </button>             
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <CurrentMenu v-if="menusStore.menusExists" />
        </div>
      </div>

      <DishesIndexView v-if="menusStore.menusExists" />

      <MenuCreateView v-if="ownRestaurant && !menusStore.menusExists" />
    </div>
  </LoadRestaurants>
</template>
