import { createApp } from 'vue'

import App from './App'

import { setupRouter } from './router'
import { setupAssets } from './plugins'
import { setupStore } from './store'
import { setupDirectives } from './directives'

async function bootstrap() {
	const app = createApp(App)

	setupAssets()

	setupStore(app)

	setupDirectives(app)

	await setupRouter(app)

	app.mount('#app')
}

bootstrap()
