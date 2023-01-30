<script setup>
import { ref, computed } from 'vue';
import ModesSelect from '../../components/modes/ModesSelect.vue';
import tokensService from '../services/tokensService';
import EditMenu from './EditView.vue';
import modelApi from '../services/api/model_api';

const props = defineProps([
  'menus',
  'restaurant'
])

const createMenuModeArgs = computed(() => {
  return {
    canCreateUrl: `http://localhost:3000/restaurants/${restaurant.id}/menus/can_create`,
    requestOptions: {
      headers: tokensService.auth_headers()
    }
  }
})
const editMenuModeArgs = computed(() => {
  return {
    canUpdateUrl: `http://localhost:3000/menus/${currentMenu.value.id}/can_update`,
    requestOptions: {
      headers: tokensService.auth_headers()
    }
  }
})


const restaurant = computed(() => props.restaurant)
const menuModes = ['index', 'create', 'edit']
const menusModesProperties = ref({
  index:{ action:'index', allowed:true, visible:true },
  create:{ action:'create', allowed:true, visible:true,
    args: createMenuModeArgs.value
  },
  edit:{ action:'update', allowed:false, visible:true,
    args: editMenuModeArgs.value
  },
})
const currentMenuMode = ref('index')
const setMenuMode = (modeName) => {
  currentMenuMode.value = modeName;
}
const menus = computed(() => {
  currentMenu.value = props.menus[0]
  return props.menus
})
const currentMenu = ref({})
const setCurrentMenu = (menu) => {
  currentMenu.value = menu
}
const menuActivityStyle = (menu) => {
  let commonStyle = 'border menu-padding mb-element-flex'

  if (currentMenu.value && menu.id == currentMenu.value.id) {
    return `current-menu-bg ${commonStyle}`
  }

  return `menu-bg ${commonStyle}`
}
const showMenuChange = async (menu) => {
  await refreshRestaurantMenusData()
  currentRestaurant.value = menu
}
const refreshRestaurantMenusData = async () => {  
  let url = `http://localhost:3000/restaurants/${restaurant.value.id}/menus?`
  let args = { 
    getUrl: url,
    requestOptions: { 
      headers: tokensService.auth_headers()
    }
  }

  let { response, isSuccessful } = await modelApi.apiIndexModels(args)

  if (isSuccessful) {     
    menus.value = response.data  


    if (dishes.value.length > 0)
      menu.value = dishes.value[0].menu
  }
}

const dishes = computed(() => {
  return currentMenu.value ? currentMenu.value.dishes : []
})

const propsCounter = computed(() => props.counter)
</script>

<template>
  <div class="menus-bar">    
    <div v-for="menu in menus" 
          v-bind:class="menuActivityStyle(menu)"
          @click="setCurrentMenu(menu)">
      {{ menu.name }}
    </div>

    <div>
      <ModesSelect :modes="menuModes"
                   :current-mode="currentMenuMode"
                   :modes-properties="menusModesProperties"
                   :record="currentMenu"
                   :with-slot="false"
                   @set-mode="setMenuMode"/>
    </div>
  </div>

  <div class="menu-dishes-container" v-if="currentMenuMode == 'index'">
    <div v-for="dish in dishes"
          class="border md-background md-padding">
      {{ dish.name }}
    </div>
  </div>

  <div>
    <div v-if="currentMode == 'edit' && modeAlowability('edit')">
      <EditMenu :menu="currentMenu" @data-change="showMenuChange" />
    </div>
  </div>
</template>