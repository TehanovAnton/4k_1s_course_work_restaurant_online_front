<script setup>
  import Modes from '../../components/Modes.vue';
  import EditMenu from './EditView.vue'
  import ShowDishView from '../dishes/ShowView.vue'
  import tokensService from '../services/tokensService';
  import service from '../services/menus/menu_service'
  import { ref, computed } from 'vue';  
  import CreateView from './CreateView.vue';
  import router from '../../router/router';
  
  const props = defineProps(['menu'])
  const emits = defineEmits(['data-change'])

  const editMenuModeArgs = computed(() => {
    return {
      canUpdateUrl: `http://localhost:3000/menus/${props.menu.id}/can_update`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })

  const deleteMenuModeArgs = computed(() => {
    return {
      canDestroyUrl: `http://localhost:3000/menus/${props.menu.id}/can_destroy`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })
// 
  const modes = ref(['show', 'edit', 'delete'])
  const modesProperties = ref({
    show:{ action:'show', allowed:true, visible:true },
    edit:{ action:'update', allowed:false, visible:true,
      args: editMenuModeArgs
    },
    delete:{ action:'destroy', allowed:false, visible:false,
      args: deleteMenuModeArgs
    } 
  })
  const currentMode = ref('show')
  const modesClass = ref('menu-class')
  const setMode = (modeName) => currentMode.value = modeName  
  const modeAlowability = (mode) => modesProperties.value[mode].allowed
//
  const showDataChange = () => {    
    setMode('show')
    emits('data-change')
  }

  const destroyMenu = async () => {
    let { 
      response, 
      isSuccessful
    } = await service.apiDestroyMenu(tokensService.auth_headers(), props.menu)

    if (isSuccessful) {      
      tokensService.setAuthTokens(response.headers)
      emits('data-change')
    }
  }

  const menuDishesView = () => router.push({ name:'menu_dishes', params:{ menuId:props.menu.id } })
</script>

<template>
  <div>
    <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
           :current-mode="currentMode"  :record="menu"                      :service="service"
           @set-mode="setMode"/>

    <div v-if="currentMode == 'show'">
      <div class="centrenize-content-column">
        <span>Name: <a href="#" @click="menuDishesView">{{ menu.name }}</a></span>

        <div class="block centrenize-content-column">
          Dishes:
          <ShowDishView v-for="dish in menu.dishes" :dish="dish" />
        </div>

        <button v-if="modeAlowability('delete')"
                type="button"
                @click="destroyMenu()">destroy</button>
      </div>
    </div>

    <div v-if="currentMode == 'edit' && modeAlowability('edit')">
      <EditMenu :menu="menu" @data-change="showDataChange" />
    </div>
    
    <div v-if="currentMode == 'create' && modeAlowability('create')">
      <CreateView :restaurant-id="restaurant.id"
                  @data-change="refreshData" />
    </div>
  </div>
</template>