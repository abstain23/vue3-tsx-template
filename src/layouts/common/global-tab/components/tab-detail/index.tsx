import { computed, defineComponent, nextTick, reactive, ref, watch } from 'vue'
import { AdminTab } from '@soybeanjs/vue-materials'

import { useTabStore, useThemeStore } from '@/store'
import { SvgIcon } from '@/components'

import ContextMenu from './ContextMenu'

export default defineComponent({
	name: 'TabDetail',
	emits: {
		scroll: (_clientX: number) => true
	},
	setup(_, { emit }) {
		const theme = useThemeStore()
		const tab = useTabStore()

		const isChromeMode = computed(() => theme.tab.mode === 'chrome')

		// 获取当前激活的tab的clientX
		const tabRef = ref<HTMLElement>()
		async function getActiveTabClientX() {
			await nextTick()
			if (
				tabRef.value &&
				tabRef.value.children.length &&
				tabRef.value.children[tab.activeTabIndex]
			) {
				const activeTabElement = tabRef.value.children[tab.activeTabIndex]
				const { x, width } = activeTabElement.getBoundingClientRect()
				const clientX = x + width / 2
				setTimeout(() => {
					emit('scroll', clientX)
				}, 50)
			}
		}

		interface DropdownConfig {
			visible: boolean
			affix: boolean
			x: number
			y: number
			currentPath: string
		}

		const dropdown: DropdownConfig = reactive({
			visible: false,
			affix: false,
			x: 0,
			y: 0,
			currentPath: ''
		})

		function setDropdown(config: Partial<DropdownConfig>) {
			Object.assign(dropdown, config)
		}

		let isClickContextMenu = false

		function handleDropdownVisible(visible: boolean) {
			if (!isClickContextMenu) {
				setDropdown({ visible })
			}
		}

		/** 点击右键菜单 */
		async function handleContextMenu(e: MouseEvent, currentPath: string, affix?: boolean) {
			e.preventDefault()

			const { clientX, clientY } = e

			isClickContextMenu = true

			const DURATION = dropdown.visible ? 150 : 0

			setDropdown({ visible: false })

			setTimeout(() => {
				setDropdown({
					visible: true,
					x: clientX,
					y: clientY,
					currentPath,
					affix
				})
				isClickContextMenu = false
			}, DURATION)
		}

		watch(
			() => tab.activeTabIndex,
			() => {
				getActiveTabClientX()
			},
			{
				immediate: true
			}
		)
		return () => (
			<div
				ref={tabRef}
				class={['flex h-full pr-18px', isChromeMode.value ? 'items-end' : 'items-center gap-12px']}
			>
				{tab.tabs.map(item => (
					<div
						key={item.fullPath}
						onContextmenu={(e: MouseEvent) => handleContextMenu(e, item.fullPath, item.meta.affix)}
					>
						<AdminTab
							mode={theme.tab.mode}
							darkMode={theme.darkMode}
							active={tab.activeTab === item.fullPath}
							activeColor={theme.themeColor}
							closable={!(item.name === tab.homeTab.name || item.meta.affix)}
							onClick={() => tab.handleClickTab(item.fullPath)}
							onClose={() => tab.removeTab(item.fullPath)}
						>
							{{
								prefix: () => (
									<SvgIcon
										class='inline-block align-text-bottom text-16px'
										icon={item.meta.icon}
										localIcon={item.meta.localIcon}
									/>
								),
								default: () => item.meta.title
							}}
						</AdminTab>
					</div>
				))}
				<ContextMenu
					visible={dropdown.visible}
					currentPath={dropdown.currentPath}
					affix={dropdown.affix}
					x={dropdown.x}
					y={dropdown.y}
					onUpdate:visible={handleDropdownVisible}
				/>
			</div>
		)
	}
})
