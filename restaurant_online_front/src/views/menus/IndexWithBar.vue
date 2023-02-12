<script setup>
import { ref, computed } from 'vue';
import ModesSelect from '../../components/modes/ModesSelect.vue';
import tokensService from '../services/tokensService';
import EditMenu from './EditView.vue';
import CreateMenu from './CreateView.vue';
import DeleteModelVue from '../../components/DeleteModel.vue'
import menuApi from '../services/api/model_api';
import { useCurrentMenuIdStore } from './IndexWithBarStore'

const props = defineProps([
  'menus',
  'restaurant'
])
const emits = defineEmits(['refreshMenus'])

const currentMenuIdStore = useCurrentMenuIdStore()
const currentMenu = ref({})
const createMenuModeArgs = computed(() => {
  return {
    canCreateUrl: `http://localhost:3000/restaurants/${props.restaurant.id}/menus/can_create`,
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
const destroyMenuArgs = computed(() => {
  return {
    canDestroyUrl: `http://localhost:3000/menus/${currentMenu.value.id}/can_destroy`,
    requestOptions: {
      headers: tokensService.auth_headers()
    }
  }
})


const restaurant = computed(() => props.restaurant)
const menuModes = ['index', 'create', 'edit', 'delete']
const menusModesProperties = ref({
  index:{ action:'index', allowed:true, visible:true },
  create:{ action:'create', allowed:true, visible:true,
    args: createMenuModeArgs.value
  },
  edit:{ action:'update', allowed:false, visible:true,
    args: editMenuModeArgs.value
  },
  delete:{ action:'destroy', allowed:false, visible: true,
    args: destroyMenuArgs.value
  }
})
const currentMenuMode = ref('index')
const setMenuMode = (modeName) => {
  currentMenuMode.value = modeName;
}
const menus = computed(() => {
  let menuFromStore = props.menus.find((menu) => menu.id == currentMenuIdStore.getCurrentMenuId)
  currentMenu.value = menuFromStore || props.menus[0]
  return props.menus
})
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
const modeAlowability = (mode) => menusModesProperties.value[mode].allowed
const dishes = computed(() => {
  return currentMenu.value ? currentMenu.value.dishes : []
})

const refreshMenus = async () => {
  let url = menuApi.urlOptionsEditor(`http://localhost:3000/restaurants/${props.restaurant.id}/menus?`, 
                                     { view: 'with_dishes' })
  let args = { 
    getUrl: url,
    requestOptions: { 
      headers: tokensService.auth_headers()
    }
  }

  let { response, isSuccessful } = await menuApi.apiIndexModels(args)

  if (isSuccessful) {      
    currentMenuIdStore.setCurrentMenuId(currentMenu.value.id)
    emits('refreshMenus', response.data)
  }
}

const resetIndex = async () => {
  await refreshMenus()
  setMenuMode('index')
}
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

  <div class="menu-dishes-container"
       v-if="currentMenuMode == 'index'">
    <div v-for="dish in dishes"
          class="border md-background md-padding">
      {{ dish.name }}
    </div>
  </div>

  <div class="menu-dishes-container"
       v-if="currentMenuMode == 'edit' && modeAlowability('edit')">
    <EditMenu :menu="currentMenu" @data-change="setMenuMode('index')" />
  </div>

  <div v-if="currentMenuMode == 'create' && modeAlowability('create')">
    <CreateMenu @data-change="refreshMenus" :restaurant="restaurant" />
  </div>

  <div v-if="currentMenuMode == 'delete' && modeAlowability('delete')">
    <DeleteModelVue :record="currentMenu"
                    :destroy-url="`http://localhost:3000/menus/${currentMenu.id}`"
                    @deleted-sucessfully="resetIndex" />
  </div>
</template>