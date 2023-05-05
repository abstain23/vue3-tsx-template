import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from './App'
import 'uno.css'
import 'virtual:svg-icons-register'
import { setupRouter } from './router'

async function bootstrap() {
	const app = createApp(App)

	app.use(createPinia())

	await setupRouter(app)

	app.mount('#app')
}

bootstrap()
