import { computed, defineComponent } from 'vue'
import { NDropdown, type DropdownOption } from 'naive-ui'

import { useAppStore, useTabStore } from '@/store'
import { useIconRender } from '@/composable'

export default defineComponent({
	name: 'ContextMenu',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		currentPath: {
			type: String,
			default: ''
		},
		affix: {
			type: Boolean
		},
		x: {
			type: Number
		},
		y: {
			type: Number
		}
	},
	emits: {
		'update:visible': (_visible: boolean) => true
	},
	setup(props, { emit }) {
		const app = useAppStore()
		const tab = useTabStore()
		const { iconRender } = useIconRender()

		const dropdownVisible = computed({
			get() {
				return props.visible
			},
			set(visible: boolean) {
				emit('update:visible', visible)
			}
		})

		function hide() {
			dropdownVisible.value = false
		}

		type DropdownKey =
			| 'full-content'
			| 'reload-current'
			| 'close-current'
			| 'close-other'
			| 'close-left'
			| 'close-right'
			| 'close-all'
		type Option = DropdownOption & {
			key: DropdownKey
		}

		const options = computed<Option[]>(() => [
			{
				label: '内容全屏',
				key: 'full-content',
				icon: iconRender({ icon: 'gridicons-fullscreen' })
			},
			{
				label: '重新加载',
				key: 'reload-current',
				disabled: props.currentPath !== tab.activeTab,
				icon: iconRender({ icon: 'ant-design:reload-outlined' })
			},
			{
				label: '关闭',
				key: 'close-current',
				disabled: props.currentPath === tab.homeTab.fullPath || Boolean(props.affix),
				icon: iconRender({ icon: 'ant-design:close-outlined' })
			},
			{
				label: '关闭其他',
				key: 'close-other',
				icon: iconRender({ icon: 'ant-design:column-width-outlined' })
			},
			{
				label: '关闭左侧',
				key: 'close-left',
				icon: iconRender({ icon: 'mdi:format-horizontal-align-left' })
			},
			{
				label: '关闭右侧',
				key: 'close-right',
				icon: iconRender({ icon: 'mdi:format-horizontal-align-right' })
			},
			{
				label: '关闭所有',
				key: 'close-all',
				icon: iconRender({ icon: 'ant-design:line-outlined' })
			}
		])

		const actionMap = new Map<DropdownKey, () => void>([
			[
				'full-content',
				() => {
					app.setContentFull(true)
				}
			],
			[
				'reload-current',
				() => {
					app.reloadPage()
				}
			],
			[
				'close-current',
				() => {
					tab.removeTab(props.currentPath)
				}
			],
			[
				'close-other',
				() => {
					tab.clearTab([props.currentPath])
				}
			],
			[
				'close-left',
				() => {
					tab.clearLeftTab(props.currentPath)
				}
			],
			[
				'close-right',
				() => {
					tab.clearRightTab(props.currentPath)
				}
			],
			[
				'close-all',
				() => {
					tab.clearAllTab()
				}
			]
		])

		function handleDropdown(optionKey: string) {
			const key = optionKey as DropdownKey
			const actionFunc = actionMap.get(key)
			if (actionFunc) {
				actionFunc()
			}
			hide()
		}
		return () => (
			<NDropdown
				show={dropdownVisible.value}
				options={options.value}
				placement='bottom-start'
				x={props.x}
				y={props.y}
				onClickoutside={hide}
				onSelect={handleDropdown}
			/>
		)
	}
})
