import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
library.add(faPlay, faPause, faStepForward, faStepBackward, faTimes);
const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, {
    autoClose: 3000,
  });
app.mount('#app')
