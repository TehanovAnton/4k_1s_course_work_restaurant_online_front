<script setup>
  import { ref, computed, onBeforeMount } from 'vue';
  import tokensService from '../services/tokensService';
  import CreateDish from './CreateView.vue';
  import dishApi from '../services/api/model_api';
  import { useCurrentDishIdStore } from './stores/CurrentDishStore'
  import { useCurrentDishModeStore } from './stores/CurrentDishModeStore';
  import { useSelectedModeStore } from './stores/SelectedDishModeStore';
  import EditView from './EditView.vue';
  import DeleteModel from '../../components/DeleteModel.vue';
  import ModesSelect from '../../components/modes/ModesSelectWithSettableModesProps.vue';

  const props = defineProps(['dishes', 'menu'])
  const emits = defineEmits(['refresh-data'])

  onBeforeMount(async () => {
    if (props.dishes.length != 0)
      currentDishModeStore.udpateDependentFromDishModesArgs(props.dishes[0].id)

    currentDishModeStore.udpateDependentFromMenuModesArgs(props.menu.id)
    await currentDishModeStore.getModesAllowabilities()
  })

  const currentDishIdStore = useCurrentDishIdStore()
  const currentDishModeStore = useCurrentDishModeStore()
  const selectedModeStore = useSelectedModeStore()

  const currentDish = ref({})
  const dataReady = ref(false)
  
  const setCurrentDish = (dish) => {
    currentDishModeStore.udpateDependentFromDishModesArgs(dish.id)
    currentDish.value = dish
  }

  const initCurrentDishId = () => {
    let dishFromStore = props.dishes.find((dish) => {
      return dish.id == currentDishIdStore.getCurrentDishId
    })

    if (!!dishFromStore)
      return dishFromStore

    return props.dishes[0]
  }

  const dishes = computed(() => {
    if (props.dishes.length == 0) {
      setMode('create')
      return []
    }      

    let curreDishId = initCurrentDishId()    
    setCurrentDish(curreDishId)

    return props.dishes
  })  

  const menu = computed(() => {
    if (currentDishModeStore.menu_id != props.menu.id)
      if (props.dishes.length != 0)
        setMode('index')

    currentDishModeStore.udpateDependentFromMenuModesArgs(props.menu.id)
    return props.menu
  })  
  
  const currentMode = computed(() => {
    if (dishes.value.length == 0 && modeAlowability('edit')) {
      currentDishModeStore.setCurrentMode('create')
    }

    return currentDishModeStore.getCurrentMode.value
  })

  const setMode = (modeName) => {
    currentDishModeStore.setCurrentMode(modeName)
    selectedModeStore.setSelectedMode(modeName)
  }

  const setSelectedMode = () => {
    currentDishModeStore.setCurrentMode(selectedModeStore.selectedMode)
  }

  const setModeAllowability = (modeName, allowability) => {
    currentDishModeStore.modesSettableProperties[modeName].allowed = allowability
  }
  
  const modes = computed(() => currentDishModeStore.modes) 
  const modesProperties = computed(() => currentDishModeStore.modesProperties)
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
      if (currentDish.value) {
        currentDishIdStore.setCurrentDishId(currentDish.value.id)
        setMode('index')
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
                 :current-mode-stor="currentDishModeStore"
                 :selected-mode-store="selectedModeStore"
                 :with-slot="false"
                 @set-mode="setSelectedMode"
                 @set-mode-allowability="setModeAllowability" />
  </div>
  </div>

  <div class="menu-dishes-container"
      v-if="currentMode == 'edit' ">
    <EditView @data-change="setMode('index')" 
              :dish="currentDish">
      <ModesSelect :modes="modes"
                   :current-mode-stor="currentDishModeStore"
                   :selected-mode-store="selectedModeStore"
                   :with-slot="false"
                   @set-mode="setSelectedMode"
                   @set-mode-allowability="setModeAllowability" />
    </EditView>
  </div>
  
  <div v-if="currentMode == 'create' && modeAlowability('create')">
    <CreateDish @data-change="refreshDishes()"
                :menu="menu">
      <ModesSelect :modes="modes"
                   :current-mode-stor="currentDishModeStore"
                   :selected-mode-store="selectedModeStore"
                   :with-slot="false"
                   @set-mode="setSelectedMode"
                   @set-mode-allowability="setModeAllowability" />
    </CreateDish>
  </div>

  <div v-if="currentMode == 'delete'">
    <DeleteModel @deleted-sucessfully="refreshDishes()"
                :record="currentDish"
                :destroy-url="`http://localhost:3000/dishes/${currentDish.id}`">
      <ModesSelect :modes="modes"
                   :current-mode-stor="currentDishModeStore"
                   :selected-mode-store="selectedModeStore"
                   :with-slot="false"
                   @set-mode="setSelectedMode"
                   @set-mode-allowability="setModeAllowability" />
    </DeleteModel>
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
