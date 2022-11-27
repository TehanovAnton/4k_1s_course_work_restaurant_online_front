<script setup>
  import axios from 'axios';
  import { onBeforeMount, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useTokensStore } from '../../../stores/tokens';

  import RestuarantMenus from '../../../components/restaurants/menus/RestuarantMenus.vue'
import { computed } from '@vue/reactivity';

  const route = useRoute();
  const menus = ref()
  const activeMenu = ref()
  const tokens = useTokensStore()

  onBeforeMount(async () => {
    let response = await requestMenus()

    setRefs(response)
  })

  const requestMenus = async () => {
    let url = `http://localhost:3000/restaurants/${route.params.id}/menus/`
    let headers = { headers: tokens.auth_headers }

    let response = await axios.get(url, headers)
                              .catch(errorshandler)

    return response
  }

  const setActiveMenu = (menu) => {
    debugger
    activeMenu.value = menu
  }

  // ############

  let errorshandler = (error) => {            
    console.log(error);
  }

  const setRefs = (response) => {
    let successfulResponse = isSuccessfulResponse(response)

    if (successfulResponse) {   
      menus.value = response.data      
      activeMenu.value = menus.value[0]

      tokens.setAuthTokens(response.headers)
    }
  }

  const isSuccessfulResponse = (response) => response && response.status === 200

</script>

<template>
  <header class="block centrenize-content-row">
    HEADER
  </header>

  <div class="centrenize-content-row">
    <div class="content block centrenize-content-row">
      <RestuarantMenus :menus="menus"
                       :active-menu="activeMenu"
                       @menu-click="setActiveMenu" />
    </div>
  </div>

  <footer class="block centrenize-content-row">
    FOOTER
  </footer>
</template>

<style>
  .block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
  }

  .active-block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
    background-color: black;
    color: white;
  }

  .centrenize-content-column {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .menu {
    flex: 1;

    margin: 1.5px;
  }
</style>