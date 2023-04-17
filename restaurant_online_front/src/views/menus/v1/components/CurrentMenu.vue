<script setup>
  import { computed, ref } from 'vue';
  import { useMenusStore } from '../../stores/MenusStore';
  import { useContentsStore } from '../../../restaurants/stores/ContentsStore';
  import menu_service from '../../../services/menus/menu_service';
  import EditIconWrap from '../../../restaurants/v1/components/EditIconWrap.vue';
  import EditIcon from '../../../icons/EditIcon.vue';
  import MenuSelect from '../components/MenuSelect.vue'
  import DeleteIcon from '../../../icons/DeleteIcon.vue';
import tokensService from '../../../services/tokensService';
import { useCurrentUserStore } from '../../../../stores/users/currentUser';
import { useRestaurantsStore } from '../../../restaurants/stores/RestaurantsStore';

  const menusStore = useMenusStore()
  const restaurantsStore = useRestaurantsStore()
  const contentsStore = useContentsStore()
  const currentUserSotre = useCurrentUserStore()
  const menus = computed(() => { return menusStore.menus })

  const currentMenu = computed(() => {
    if (!!!menusStore.currentMenu)
    return menusStore.findMenu(menusStore.currentMenu)
  })

  const editMenu = () => contentsStore.setContent('MenuEditView')

  const setMenu = (menu) => {
    menusStore.setMenu(menu)
  }

  const deleteMenu = async () => {
    let {
      isSuccessful
    } = await menu_service.apiDestroyMenu(tokensService.auth_headers(), currentMenu.value)

    if (isSuccessful) {
      menusStore.updateAndSetCurrent(menusStore.currentMenu)
      contentsStore.setContent('RestaurantShowView')
    }
  }

  const ownMenu = computed(() => {
    if (currentMenu.value)
      return menusStore.ownMenu(currentMenu.value, currentUserSotre.user)

    return false
  })
</script>

<template>
  <div class="card">
      <div class="card-body">
        <h2 class="card-title">Current Menu</h2>
        <div class="sub-card">
          <MenuSelect
            :init-value="currentMenu"
            :menus="menusStore.menus"
            @menu-change="setMenu"
          />

          <EditIcon v-if="ownMenu" @icon-click="editMenu" />
          <DeleteIcon v-if="ownMenu" @icon-click="deleteMenu" />
        </div>
      </div>
    </div>
</template>

<style>
  
</style>
