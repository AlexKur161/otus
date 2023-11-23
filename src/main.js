import { createApp } from 'vue'
import { store } from './store/index.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import './style.css'
import App from './App.vue'

const app = createApp(App);

app.use(LoadingPlugin);
app.use(store);
app.use(VueAxios, axios);
app.mount('#app');
