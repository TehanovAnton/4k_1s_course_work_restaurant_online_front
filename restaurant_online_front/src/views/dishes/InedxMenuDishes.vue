<script setup>
  import { ref, computed } from 'vue';
  import tokensService from '../services/tokensService';
  import CreateDish from './CreateView.vue';
  import dishApi from '../services/api/model_api';
  import { useCurrentDishIdStore } from './stores/CurrentDishStore'
  import { useCurrentDishModeStore } from './stores/CurrentDishModeStore';
  import { useSelectedModeStore } from './stores/SelectedDishModeStore';
  import EditView from './EditView.vue';
  import DeleteModel from '../../components/DeleteModel.vue';
  import ModesSelect from '../../components/modes/ModeSelectWithStor.vue';

  const props = defineProps(['dishes', 'menu'])
  const emits = defineEmits(['refresh-data'])

  const currentDishIdStore = useCurrentDishIdStore()
  const currentDishModeStore = useCurrentDishModeStore()
  const selectedModeStore = useSelectedModeStore()

  const currentDish = ref({})
  
  const setCurrentDish = (dish) => {
    currentDish.value = dish
  }

  const dishes = computed(() => {
    let dishFromStore = props.dishes.find((dish) => {
      return dish.id == currentDishIdStore.getCurrentDishId
    })

    currentDish.value = dishFromStore || props.dishes[0]

    return props.dishes
  })  
  const menu = computed(() => props.menu)
  
  const createModeArgs = computed(() => {
    return {
      canCreateUrl: `http://localhost:3000/menus/${props.menu.id}/dishes/can_create`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })
  const editModeArgs = computed(() => {
    return {
      canUpdateUrl: `http://localhost:3000/dishes/${currentDish.value.id}/can_update`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })
  const destroyArgs = computed(() => {
    return {
      canDestroyUrl: `http://localhost:3000/dishes/${currentDish.value.id}/can_destroy`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })
  
  const currentMode = computed(() => {
    if (dishes.value.length == 0) {
      return 'create'&& modeAlowability('edit')
    }

    return currentDishModeStore.getCurrentMode.value
  })

  const setMode = (modeName) => {
    currentDishModeStore.setCurrentMode(modeName)
  }

  const setSelectedMode = () => {
    currentDishModeStore.setCurrentMode(selectedModeStore.selectedMode)
  }
  
  const modes = computed(() => currentDishModeStore.modes) 
  const modesProperties = ref({
    index:{ action:'index', allowed:true, visible:true },
    create:{ action:'create', allowed:true, visible:true,
      args: createModeArgs.value
    },
    edit:{ action:'update', allowed:false, visible:true,
      args: editModeArgs.value
    },
    delete:{ action:'destroy', allowed:false, visible: true,
      args: destroyArgs.value
    }
  })
  const modeAlowability = (mode) => modesProperties.value[mode].allowed

  const refreshDishes = async () => {
    let url = `http://localhost:3000/menus/${menu.value.id}/dishes`
    let args = { 
      getUrl: url,
      requestOptions: { 
        headers: tokensService.auth_headers()
      }
    }
    
    let { response, isSuccessful } = await dishApi.apiIndexModels(args)

    if (isSuccessful) {      
      debugger
      if (currentDish.value) {
        currentDishIdStore.setCurrentDishId(currentDish.value.id)
      }

      emits('refresh-data', response.data)
    }
  }

  const dishActivityStyle = (dish) => {
    let commonStyle = 'border dish-padding d-element-flex'

    if (currentDish.value && dish.id == currentDish.value.id) {      
      return `current-dish-bg ${commonStyle}`
    }

    return `dish-bg ${commonStyle}`
  }  

</script>

<template>  
  <div v-if="currentMode == 'index'"
       v-for="dish in dishes"
       v-bind:class="dishActivityStyle(dish)"
       @click="setCurrentDish(dish)">
    {{ dish.name }}

    <div>
      <ModesSelect :modes="modes"
                   :current-mode="currentMode"
                   :mode-store="currentDishModeStore"
                   :selected-mode-store="selectedModeStore"
                   :modes-properties="modesProperties"
                   :record="dish"
                   :with-slot="false"
                   @set-mode="setSelectedMode"/>
    </div>
  </div>

  <div class="menu-dishes-container"
       v-if="currentMode == 'edit' ">
    <EditView @data-change="setMode('index')" 
              :dish="currentDish" />
  </div>

  <div v-if="currentMode == 'create' && modeAlowability('create')">
    <CreateDish @data-change="refreshDishes()"
                :menu="menu" />
  </div>

  <div v-if="currentMode == 'delete'">
    <DeleteModel @deleted-sucessfully="refreshDishes()"
                 :record="currentDish"
                 :destroy-url="`http://localhost:3000/dishes/${currentDish.id}`" />
  </div>
</template>

<style>
  .border {
    border: 1px solid black;
  }

  .dish-padding {
    padding: 3px;
  }

  .d-element-flex {
    flex: 1;

    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-around;
    flex-wrap: nowrap;
    align-items: center;
  }

  .current-dish-bg {
    background-color:blueviolet;
  }
  
  .dish-bg {
    background-color: rgb(191, 160, 221);
  }
</style>reset
