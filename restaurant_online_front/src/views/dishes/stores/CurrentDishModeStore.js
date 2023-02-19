
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import tokensService from '../../services/tokensService';

export const useCurrentDishModeStore = defineStore('CurrentDishMode', () => {
  const defaultDishMode = 'index'
  const modes = ['index', 'create', 'edit', 'delete']
  const menu_id = ref('')
  const dish_id = ref('')
  const modesAllowabilities = ref({
    index:{ allowed:true },
    create:{ allowed:false },
    edit:{ allowed:false},
    delete:{ allowed:false }
  })

  const createModeArgs = computed(() => {
    return {
      canCreateUrl: `http://localhost:3000/menus/${menu_id.value}/dishes/can_create`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })
  const editModeArgs = computed(() =>{
    return {
      canUpdateUrl: `http://localhost:3000/dishes/${dish_id.value}/can_update`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })
  const destroyArgs = computed(() => {
    return {
      canDestroyUrl: `http://localhost:3000/dishes/${dish_id.value}/can_destroy`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })
  
  const udpateDependentFromMenuModesArgs = (id) => {
    menu_id.value = id
  }

  const udpateDependentFromDishModesArgs = (id) => {
    dish_id.value = id
  }

  const modeAllowability = (mode) => modesAllowabilities[mode].allowed

  const modesProperties = computed(() => {
    return {
      index:{ action:'index', allowed:modeAllowability('index'), visible:true },
      create:{ action:'create', allowed:modeAllowability('create'), visible:true,
        args: createModeArgs.value
      },
      edit:{ action:'update', allowed:modeAllowability('edit'), visible:true,
        args: editModeArgs.value
      },
      delete:{ action:'destroy', allowed:modeAllowability('delete'), visible: true,
        args: destroyArgs.value
      }
    }
  })
  
  const currentDishMode = ref(defaultDishMode)

  const setCurrentMode = (dishMode) => {
    currentDishMode.value = dishMode
  }

  const getCurrentMode = computed(() => {
    return currentDishMode ? currentDishMode : defaultDishMode
  })

  return {
    udpateDependentFromMenuModesArgs,
    udpateDependentFromDishModesArgs,
    setCurrentMode,
    getCurrentMode,
    modes,
    modesProperties,
    menu_id,
    dish_id,
    createModeArgs,
    editModeArgs,
    modesAllowabilities,
  }
})