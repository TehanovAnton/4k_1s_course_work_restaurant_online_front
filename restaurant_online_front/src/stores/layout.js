import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
    const layoutsMap = new Map();
    layoutsMap.set('default', '../views/layouts/DefaultLayout.vue');

    const layout = ref({})

    const layoutComponent = computed(() => {
        for(layoutKey in layoutsMap.keys()) {
            if (layout == layoutKey) {
                layout.value = import(layoutsMap.get(layoutKey))
                break;
            }
        }
    })

    return { layout }
})
