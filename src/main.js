import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faTimes,
  faMusic,
  faFileAudio,
  faFont,
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
library.add(faPlay, faPause, faStepForward, faStepBackward, faTimes, faMusic, faFileAudio, faFont, faCircleInfo);
const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.mount('#app')
