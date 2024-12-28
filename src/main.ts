import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
