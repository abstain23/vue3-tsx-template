import { createPinia } from 'pinia'
import type { App } from 'vue'
import { resetSetupStore } from './plugins'

export function setupStore(app: App) {
	const store = createPinia()
	store.use(resetSetupStore)

	app.use(store)
}

export * from './modules'
export * from './subscribe'
