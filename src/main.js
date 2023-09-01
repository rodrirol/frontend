import './assets/background-anim.js'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

const options = {
    backdrop: false,
    background: '#2d2d2d',
    color: "white",
};

app.use(VueSweetalert2, options)
app.use(router)

app.config.globalProperties.$baseURL = 'https://backend-five-sage.vercel.app/'

app.mount('#app')