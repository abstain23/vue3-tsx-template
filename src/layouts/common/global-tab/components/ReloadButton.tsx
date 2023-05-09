import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import { useAppStore, useRouteStore } from '@/store'
import { useLoading } from '@/hooks'
import { HoverContainer } from '@/components'

export default defineComponent({
	name: 'ReloadButton',
	setup() {
		const app = useAppStore()
		const routeStore = useRouteStore()
		const route = useRoute()
		const { loading, startLoading, endLoading } = useLoading()

		function handleRefresh() {
			const isCached = routeStore.cacheRoutes.includes(String(route.name))
			if (isCached) {
				routeStore.removeCacheRoute(route.name as AuthRoute.AllRouteKey)
			}
			startLoading()
			app.reloadPage()
			const timeId = setTimeout(() => {
				if (isCached) {
					routeStore.addCacheRoute(route.name as AuthRoute.AllRouteKey)
				}
				endLoading()
				clearTimeout(timeId)
			}, 1000)
		}
		return () => (
			<HoverContainer
				class='w-64px h-full'
				tooltip-content='重新加载'
				placement='bottom-end'
				onClick={handleRefresh}
			>
				<icon-mdi-refresh class={['text-22px', loading.value ? 'animate-spin' : '']} />
			</HoverContainer>
		)
	}
})
