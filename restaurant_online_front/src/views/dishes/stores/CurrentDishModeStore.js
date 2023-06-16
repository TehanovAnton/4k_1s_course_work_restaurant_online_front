
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import tokensService from '../../services/tokensService';
import modelApi from '../../../views/services/api/model_api';

export const useCurrentDishModeStore = defineStore('CurrentDishMode', () => {
  const defaultDishMode = 'index'
  const modes = ['index', 'create', 'edit', 'delete']
  const menu_id = ref('')
  const dish_id = ref('')
  const modesSettableProperties = ref({
    index:{  allowed:true,  visible:true },
    create:{ allowed:false, visible:true },
    edit:{   allowed:false, visible:true },
    delete:{ allowed:false, visible:true }
  })

  const createModeArgs = computed(() => {
    return {
      canCreateUrl: `${import.meta.env.VITE_BACK_HOST}/menus/${menu_id.value}/dishes/can_create`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })
  const editModeArgs = computed(() =>{
    return {
      canUpdateUrl: `${import.meta.env.VITE_BACK_HOST}/dishes/${dish_id.value}/can_update`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })
  const destroyArgs = computed(() => {
    return {
      canDestroyUrl: `${import.meta.env.VITE_BACK_HOST}/dishes/${dish_id.value}/can_destroy`,
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

  const modesAllowabilities = (mode) => modesSettableProperties.value[mode].allowed
  const modesVisiabilities = (mode) => modesSettableProperties.value[mode].visible

  const modesProperties = computed(() => {
    return {
      index:{ action:'index', allowed:modesAllowabilities('index'), visible:modesVisiabilities('index') },
      create:{ action:'create', allowed:modesAllowabilities('create'), visible:modesVisiabilities('create'),
        args: createModeArgs.value
      },
      edit:{ action:'update', allowed:modesAllowabilities('edit'), visible:modesVisiabilities('edit'),
        args: editModeArgs.value
      },
      delete:{ action:'destroy', allowed:modesAllowabilities('delete'), visible: modesVisiabilities('delete'),
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

  const getModesAllowabilities = async () => {
    modes.forEach(async mode => await setModeAlowability(mode))
  }

  const setModeAlowability = async (mode) => {
    let modeProperties = modesProperties.value[mode]
    modesSettableProperties.value[mode].allowed = await modelApi.can(modeProperties.action, 
                                                                     ['index', 'show', 'create_rating', 'message'], 
                                                                     modeProperties.args
                                                                    )
  }

  return {
    udpateDependentFromMenuModesArgs,
    udpateDependentFromDishModesArgs,
    setCurrentMode,
    getModesAllowabilities,
    getCurrentMode,
    modes,
    modesProperties,
    menu_id,
    dish_id,
    createModeArgs,
    editModeArgs,
    modesSettableProperties
  }
})