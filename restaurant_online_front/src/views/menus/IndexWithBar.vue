<script setup>
import { ref, computed } from 'vue';
import ModesSelect from '../../components/modes/ModesSelect.vue';
import tokensService from '../services/tokensService';

const props = defineProps([
  'menus',
  'restaurant'
])

const restaurant = computed(() => props.restaurant)
const createMenuModeArgs = computed(() => {
  return {
    canCreateUrl: `http://localhost:3000/restaurants/${restaurant.id}/menus/can_create`,
    requestOptions: {
      headers: tokensService.auth_headers()
    }
  }
})

const menuModes = ['index', 'create']
const menusModesProperties = ref({
  index:{ action:'index', allowed:true, visible:true },
  create:{ action:'create', allowed:true, visible:true,
  args: createMenuModeArgs.value
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
      <!-- modes select -->
      <ModesSelect :modes="menuModes"
                    :current-mode="currentMenuMode"
                    :modes-properties="menusModesProperties"
                    :record="currentMenu"
                    :with-slot="false"
                    @set-mode="setMenuMode"/>
    </div>
  </div>

  <div class="menu-dishes-container">
    <div v-for="dish in dishes"
          class="border md-background md-padding">
      {{ dish.name }}
    </div>
  </div>
</template>