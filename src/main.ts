import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from './App'
import 'uno.css'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
