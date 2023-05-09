import { computed, defineComponent, ref, type PropType, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NMenu, NScrollbar, type MenuOption } from 'naive-ui'

import { useAppStore, useThemeStore } from '@/store'
import { useAppInfo, useRouterPush } from '@/composable'
import { getActiveKeyPathsOfMenus } from '@/utils'
import { DarkModeContainer } from '@/components'

export default defineComponent({
	name: 'MixMenuDrawer',
	props: {
		visible: {
			type: Boolean
		},
		menus: {
			type: Array as PropType<App.GlobalMenuOption[]>,
			default: () => []
		}
	},
	setup(props) {
		const route = useRoute()
		const app = useAppStore()
		const theme = useThemeStore()
		const { routerPush } = useRouterPush()
		const { title } = useAppInfo()

		const showDrawer = computed(() => (props.visible && props.menus.length) || app.mixSideFixed)

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
				expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, props.menus)
			},
			{ immediate: true }
		)
		return () => (
			<div
				class='relative h-full transition-width duration-300 ease-in-out'
				style={{ width: app.mixSideFixed ? theme.sider.mixChildMenuWidth + 'px' : '0px' }}
			>
				<DarkModeContainer
					class='drawer-shadow absolute-lt flex-col-stretch h-full nowrap-hidden'
					inverted={theme.sider.inverted}
					style={{ width: showDrawer.value ? theme.sider.mixChildMenuWidth + 'px' : '0px' }}
				>
					<header
						class='header-height flex-y-center justify-between'
						style={{ height: theme.header.height + 'px' }}
					>
						<h2 class='text-primary pl-8px text-16px font-bold'>{title}</h2>
						<div
							class='px-8px text-16px text-gray-600 cursor-pointer'
							onClick={app.toggleMixSideFixed}
						>
							{app.mixSideFixed ? <icon-mdi-pin-off /> : <icon-mdi-pin />}
						</div>
					</header>
					<NScrollbar class='flex-1-hidden'>
						<NMenu
							value={activeKey.value}
							options={props.menus}
							expandedKeys={expandedKeys.value}
							indent={18}
							inverted={!theme.darkMode && theme.sider.inverted}
							onUpdate:value={handleUpdateMenu}
							onUpdate:expandedKeys={handleUpdateExpandedKeys}
						></NMenu>
					</NScrollbar>
				</DarkModeContainer>
			</div>
		)
	}
})
