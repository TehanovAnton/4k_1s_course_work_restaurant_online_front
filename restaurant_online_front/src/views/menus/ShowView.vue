<script setup>
  import Modes from '../../components/Modes.vue';
  import EditMenu from './EditView.vue'
  import ShowDishView from '../dishes/ShowView.vue'
  import tokensService from '../services/tokensService';
  import service from '../services/menus/menu_service'
  import { ref } from 'vue';  
  import CreateView from './CreateView.vue';
  import router from '../../router/router';
  
  const props = defineProps(['menu'])
  const emits = defineEmits(['data-change'])
// 
  const modes = ref(['show', 'edit', 'delete'])
  const modesProperties = ref({
    show:{ action:'show', allowed:true, visible:true },
    edit:{ action:'update', allowed:false, visible:true },
    delete:{ action:'destroy', allowed:false, visible:false } 
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
        Name: <a href="#" @click="menuDishesView">{{ menu.name }}</a>

        <div class="block centrenize-content-column">
          Dishes:
          <ShowDishView v-for="dish in menu.dishes" :dish="dish" />
        </div>

        <button v-if="modeAlowability('delete')"
                type="button"
                @click="destroyMenu()">destroy</button>
      </div>
    </div>

    <div v-if="currentMode == 'edit'">
      <EditMenu :menu="menu" @data-change="showDataChange" />
    </div>
    
    <div v-if="currentMode == 'create'">
      <CreateView :restaurant-id="restaurant.id"
                  @data-change="refreshData" />
    </div>
  </div>
</template>