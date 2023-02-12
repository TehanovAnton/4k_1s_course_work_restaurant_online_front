<script setup>
import { ref, computed } from 'vue';
import tokensService from '../services/tokensService';
import { useCurrentDishIdStore } from './stores/CurrentDishStore'

  const props = defineProps(['dishes', 'menu'])

  const currentDishIdStore = useCurrentDishIdStore()

  const currentDish = ref({})

  const dishes = computed(() => {
    let dishFromStore = props.dishes.find((dish) => {
      return dish.id == currentDishIdStore.getCurrentDishId
    })

    currentDish.value = dishFromStore || props.dishes[0]

    return props.dishes
  })  
  
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
    CREATE SOME DISH
  </div>

  <div v-if="currentMode == 'delete' && modeAlowability('delete')">
  </div>
</template>
