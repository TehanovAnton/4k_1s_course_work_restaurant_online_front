<script setup>
  import { ref } from 'vue';
  import ModelShowWrap from '../../../../components/stylecomponents/ModelShowWrap.vue';
  import { useCurrentUserStore } from '../../../../stores/users/currentUser';
  import { useMenusStore } from '../../../menus/stores/MenusStore';
  import { useContentsStore } from '../../stores/ContentsStore';
  import { useRestaurantsStore } from '../../stores/RestaurantsStore';

  const props = defineProps(['restaurant'])
  const restaurantsStore = useRestaurantsStore()
  const contentsStore = useContentsStore()      
  const menusStore = useMenusStore()
  const currentUserSotre = useCurrentUserStore()

  const primaryButton = ref({
    enable: false,
    label: '',
    callBack: () => {}
  })

  const secondaryButton = ref({
    enable: false,
    label: '',
    callBack: () => {}
  })

  const showRestaurant = (_e, menu) => {
    restaurantsStore.setModel(props.restaurant)

    let defaultMenu = !!!menusStore.currentMenu ? restaurantsStore.currentRestaurant.menus[0] : menusStore.currentMenu
    menu = !!menu ? menu : defaultMenu
    menusStore.setMenu(menusStore.findMenu(menu))

    contentsStore.setContent('RestaurantShowView')
  }
</script>

<template>
  <ModelShowWrap
    :primary-button="primaryButton" :secondary-button="secondaryButton" :label="restaurant.name"
    @wrap-click="showRestaurant($event, null)"
  >
    <div class="row bg-transparent">
      <div class="col">
        <h5 class="card-title d-flex justify-content-around">{{ restaurant.email }}</h5>
        <h5 class="card-title d-flex justify-content-around">{{ restaurant.address }}</h5>
        <h5 class="card-title d-flex justify-content-around">{{ restaurant.phone }}</h5>
      </div>
      
      <div class="col d-flex justify-content-around">
        <div class="list-group">
          <a
            v-for="menu in restaurant.menus"
            @click="showRestaurant($event, menu)"
            class="list-group-item list-group-item-action"
          >
            {{ menu.name }}
          </a>
        </div>
      </div>
    </div>
  </ModelShowWrap>
</template>
