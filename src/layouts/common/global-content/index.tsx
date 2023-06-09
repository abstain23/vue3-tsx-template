import { defineComponent, Transition, KeepAlive, computed, h, type VNode } from 'vue'

import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { RouterView } from 'vue-router'

import { useAppStore, useThemeStore } from '@/store'

export default defineComponent({
	name: 'GlobalContent',
	props: {
		showPadding: {
			type: Boolean,
			default: true
		}
	},
	setup(props) {
		const app = useAppStore()
		const theme = useThemeStore()

		const handleOnBeforeLeave = () => {
			app.setDisableMainXScroll(true)
		}

		const handleOnAfterEnter = () => {
			app.setDisableMainXScroll(false)
		}

		const classStr = computed(() => {
			if (props.showPadding) {
				return `flex-grow bg-#f6f9f8 dark:bg-#101014 transition duration-300 ease-in-out p-[16px]`
			}
			return `flex-grow bg-#f6f9f8 dark:bg-#101014 transition duration-300 ease-in-out`
		})

		return () => (
			<RouterView>
				{{
					default: ({
						Component,
						route
					}: {
						route: RouteLocationNormalizedLoaded
						Component: VNode
					}) => {
						return (
							<Transition
								name={theme.pageAnimateMode}
								mode='out-in'
								appear={true}
								onBeforeLeave={handleOnBeforeLeave}
								onAfterEnter={handleOnAfterEnter}
							>
								<KeepAlive include={[]}>
									{app.reloadFlag
										? h(Component, { key: route.fullPath, class: classStr.value })
										: null}
								</KeepAlive>
							</Transition>
						)
					}
				}}
			</RouterView>
		)
	}
})
