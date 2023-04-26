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

//storage
import Vue3Storage from "vue3-storage";
import StorageType from "vue3-storage"
app.use(Vue3Storage, { namespace: "pro_", storage: StorageType.Local })

import { Tab, Tabs } from 'vue3-tabs-component'
app.component('tabs', Tabs)
app.component('tab', Tab)

app.mount('#app')
