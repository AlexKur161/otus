import { createApp } from 'vue'
import { store } from './store/index.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {LoadingPlugin} from 'vue-loading-overlay';
import 'gitart-vue-dialog/dist/style.css'
import {GDialog} from 'gitart-vue-dialog'
import 'vue-loading-overlay/dist/css/index.css';
import './style.css'
import router from './router/index.js'
import App from './App.vue'

const app = createApp(App);
app.component('GDialog', GDialog)
app.use(LoadingPlugin);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
