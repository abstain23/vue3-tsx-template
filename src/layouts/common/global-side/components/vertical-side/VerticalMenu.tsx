import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NMenu, NScrollbar, type MenuOption } from 'naive-ui'

import { useAppStore, useRouteStore, useThemeStore } from '@/store'
import { useRouterPush } from '@/composable'
import { getActiveKeyPathsOfMenus } from '@/utils'

export default defineComponent({
	name: 'VerticalMenu',
	setup() {
		const route = useRoute()
		const app = useAppStore()
		const theme = useThemeStore()
		const routeStore = useRouteStore()
		const { routerPush } = useRouterPush()

		const menus = computed(() => routeStore.menus as App.GlobalMenuOption[])

		const activeKey = computed(
			() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string
		)
		const expandedKeys = ref<string[]>([])

		function handleUpdateMenu(_key: string, item: MenuOption) {
			const menuItem = item as App.GlobalMenuOption
			routerPush(menuItem.routePath)
		}

		function handleUpdateExpandedKeys(keys: string[]) {
			expandedKeys.value = keys
		}

		watch(
			() => route.name,
			() => {
				expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, menus.value)
			},
			{ immediate: true }
		)
		return () => (
			<NScrollbar class='flex-1-hidden'>
				<NMenu
					value={activeKey.value}
					collapsed={app.sideCollapse}
					collapsedWidth={theme.sider.collapsedWidth}
					collapsedIconSize={22}
					options={menus.value}
					expandedKeys={expandedKeys.value}
					indent={18}
					inverted={!theme.darkMode && theme.sider.inverted}
					onUpdate:value={handleUpdateMenu}
					onUpdate:expandedKeys={handleUpdateExpandedKeys}
				></NMenu>
			</NScrollbar>
		)
	}
})
