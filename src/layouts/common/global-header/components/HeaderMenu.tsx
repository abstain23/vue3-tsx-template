import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { MenuOption, NMenu, NScrollbar } from 'naive-ui'
import { useRouteStore, useThemeStore } from '@/store'
import { useRouterPush } from '@/composable'

import './HeaderMenu.scss'

export default defineComponent({
	name: 'HeaderMenu',
	setup() {
		const route = useRoute()
		const routeStore = useRouteStore()
		const theme = useThemeStore()
		const { routerPush } = useRouterPush()

		const menus = computed(() => routeStore.menus as App.GlobalMenuOption[])
		const activeKey = computed(
			() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string
		)

		function handleUpdateMenu(_key: string, item: MenuOption) {
			const menuItem = item as App.GlobalMenuOption
			routerPush(menuItem.routePath)
		}
		return () => (
			<div class='flex-1-hidden h-full px-10px'>
				<NScrollbar xScrollable={true} class='flex-1-hidden h-full' content-class='h-full'>
					<div
						class='flex-y-center h-full'
						style='{ justifyContent: theme.menu.horizontalPosition }'
					>
						<NMenu
							value={activeKey.value}
							mode='horizontal'
							options={menus.value}
							inverted={theme.header.inverted}
							onUpdate:value={handleUpdateMenu}
						/>
					</div>
				</NScrollbar>
			</div>
		)
	}
})
