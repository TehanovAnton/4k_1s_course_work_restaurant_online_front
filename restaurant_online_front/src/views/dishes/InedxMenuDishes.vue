<script setup>

  import { ref, computed } from 'vue';
  import tokensService from '../services/tokensService';
  import CreateDish from './CreateView.vue';
  import dishApi from '../services/api/model_api';
  import { useCurrentDishIdStore } from './stores/CurrentDishStore'

  const props = defineProps(['dishes', 'menu'])
  const emits = defineEmits(['refresh-data'])

  const currentDishIdStore = useCurrentDishIdStore()

  const currentDish = ref({})

  const dishes = computed(() => {
    debugger
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
      return 'create'
    }
  })

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

    debugger
    if (isSuccessful) {      
      if (currentDish.value) {
        currentDishIdStore.setCurrentDishId(currentDish.value.id)
      }

      emits('refresh-data', response.data)
    }
  }

</script>

<template>  
  <div v-for="dish in dishes"
        class="border md-background md-padding">
    {{ dish.name }}
  </div>

  <div class="menu-dishes-container"
       v-if="currentMode == 'edit' && modeAlowability('edit')">
  </div>

  <div v-if="currentMode == 'create' && modeAlowability('create')">
    <CreateDish @data-change="refreshDishes()" :menu="menu" />
  </div>

  <div v-if="currentMode == 'delete' && modeAlowability('delete')">
  </div>

  {{ currentMode }}
  {{ currentDish }}
</template>
