import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NScrollbar } from 'naive-ui'

import { useAppStore, useRouteStore, useThemeStore } from '@/store'
import { useRouterPush } from '@/composable'
import { useBoolean } from '@/hooks'
import { GlobalLogo } from '@/layouts/common'
import { DarkModeContainer } from '@/components'

import MixMenuCollapse from './MixMenuCollapse'
import MixMenuDetail from './MixMenuDetail'
import MixMenuDrawer from './MixMenuDrawer'

export default defineComponent({
	name: 'VerticalMixSide',
	setup() {
		const route = useRoute()
		const app = useAppStore()
		const theme = useThemeStore()
		const routeStore = useRouteStore()
		const { routerPush } = useRouterPush()
		const { bool: drawerVisible, setTrue: openDrawer, setFalse: hideDrawer } = useBoolean()

		const activeParentRouteName = ref('')
		function setActiveParentRouteName(routeName: string) {
			activeParentRouteName.value = routeName
		}

		const firstDegreeMenus = computed(() =>
			routeStore.menus.map(item => {
				const { routeName, label } = item
				const icon = item?.icon
				const hasChildren = Boolean(item.children && item.children.length)

				return {
					routeName,
					label,
					icon,
					hasChildren
				}
			})
		)

		function getActiveParentRouteName() {
			firstDegreeMenus.value.some(item => {
				const routeName = (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string
				const flag = routeName?.includes(item.routeName)
				if (flag) {
					setActiveParentRouteName(item.routeName)
				}
				return flag
			})
		}

		function handleMixMenu(routeName: string, hasChildren: boolean) {
			setActiveParentRouteName(routeName)
			if (hasChildren) {
				openDrawer()
			} else {
				routerPush({ name: routeName })
			}
		}

		function resetFirstDegreeMenus() {
			getActiveParentRouteName()
			hideDrawer()
		}

		const activeChildMenus = computed(() => {
			const menus: App.GlobalMenuOption[] = []
			routeStore.menus.some(item => {
				const flag =
					item.routeName === activeParentRouteName.value && Boolean(item.children?.length)
				if (flag) {
					menus.push(...(item.children || []))
				}
				return flag
			})
			return menus
		})

		watch(
			() => route.name,
			() => {
				getActiveParentRouteName()
			},
			{ immediate: true }
		)
		return () => (
			<DarkModeContainer
				class='flex h-full'
				inverted={theme.sider.inverted}
				onMouseleave={resetFirstDegreeMenus}
			>
				<div class='flex-1 flex-col-stretch h-full'>
					<GlobalLogo showTitle={false} style={{ height: theme.header.height + 'px' }} />
					<NScrollbar class='flex-1-hidden'>
						{firstDegreeMenus.value.map(item => (
							<MixMenuDetail
								key={item.routeName}
								routeName={item.routeName}
								activeRouteName={activeParentRouteName.value}
								label={item.label}
								icon={item.icon}
								isMini={app.sideCollapse}
								onClick={() => handleMixMenu(item.routeName, item.hasChildren)}
							/>
						))}
					</NScrollbar>
					<MixMenuCollapse />
				</div>
				<MixMenuDrawer visible={drawerVisible.value} menus={activeChildMenus.value} />
			</DarkModeContainer>
		)
	}
})
