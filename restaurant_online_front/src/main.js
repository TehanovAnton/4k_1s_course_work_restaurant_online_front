import { createApp } from 'vue'

import App from './App.vue'


const app = createApp(App)

// pinia
import { createPinia } from 'pinia'
app.use(createPinia())

// router
import router from './router/router'
app.use(router)

//axious
import axios from 'axios'
import VueAxios from 'vue-axios'
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)

import Vue3Storage from "vue3-storage";
import StorageType from "vue3-storage"
app.use(Vue3Storage, { namespace: "pro_", storage: StorageType.Local })

import VueSocketIO from 'vue-3-socket.io'
app.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000/cabel',
  options: { path:'/cable' }
}))

app.mount('#app')
