import './assets/main.css'

import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import router from './router'

const options: PluginOptions = {
  position: POSITION.TOP_CENTER,
  timeout: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  showCloseButtonOnHover: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}
const app = createApp(App)

app.use(router)
app.use(Toast, options)

app.mount('#app')
