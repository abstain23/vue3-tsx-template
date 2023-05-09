import { defineComponent, computed, h } from 'vue'
import { useRoute } from 'vue-router'
import { routePath } from '@/router'
import { useRouteStore, useThemeStore } from '@/store'
import { useRouterPush } from '@/composable'
import { getBreadcrumbByRouteKey } from '@/utils'
import { NBreadcrumb, NBreadcrumbItem, NDropdown } from 'naive-ui'
export default defineComponent({
	name: 'GlobalBreadcrumb',
	setup() {
		const route = useRoute()
		const theme = useThemeStore()
		const routeStore = useRouteStore()
		const { routerPush } = useRouterPush()

		const breadcrumbs = computed(() =>
			getBreadcrumbByRouteKey(
				route.name as string,
				routeStore.menus as App.GlobalMenuOption[],
				routePath('root')
			)
		)

		function dropdownSelect(key: string) {
			routerPush({ name: key })
		}
		return () => (
			<NBreadcrumb class='px-12px'>
				{breadcrumbs.value.map(breadcrumb => {
					return (
						<NBreadcrumbItem key={breadcrumb.key}>
							{breadcrumb.hasChildren ? (
								<NDropdown options={breadcrumb.options} onSelect={dropdownSelect}>
									<span>
										{theme.header.crumb.showIcon &&
											breadcrumb.icon &&
											h(breadcrumb.icon, {
												class: `inline-block align-text-bottom mr-4px text-16px`
											})}
										<span>{breadcrumb.label}</span>
									</span>
								</NDropdown>
							) : (
								<>
									{theme.header.crumb.showIcon &&
										breadcrumb.icon &&
										h(breadcrumb.icon, {
											class: `inline-block align-text-bottom mr-4px text-16px ${
												theme.header.inverted ? 'text-#BBBBBB' : ''
											}`
										})}
									<span class={`${theme.header.inverted ? 'text-#BBBBBB' : ''}`}>
										{breadcrumb.label}
									</span>
								</>
							)}
						</NBreadcrumbItem>
					)
				})}
			</NBreadcrumb>
		)
	}
})
