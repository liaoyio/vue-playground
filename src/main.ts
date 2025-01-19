import { setGlobeProvide } from '@/components/dialog/inject'
import router from '@/router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'

import './assets/main.css'

const app = createApp(App)
setGlobeProvide(app)
app.use(createPinia())
app.use(router)
app.mount('#app')
