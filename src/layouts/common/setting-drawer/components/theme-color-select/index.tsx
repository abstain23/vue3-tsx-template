import { computed, defineComponent } from 'vue'
import { NButton, NColorPicker, NDivider, NGrid, NGridItem, NSpace } from 'naive-ui'

import { isInTraditionColors } from '@/settings'
import { useThemeStore } from '@/store'
import { useBoolean } from '@/hooks'

import ColorCheckbox from './ColorCheckbox'
import ColorModal from './ColorModal'

export default defineComponent({
	name: 'ThemeColorSelect',
	setup() {
		const theme = useThemeStore()

		const { bool: visible, setTrue: openModal, setFalse: closeModal } = useBoolean()

		const isInOther = computed(() => isInTraditionColors(theme.themeColor))
		const otherColorBtnType = computed(() => (isInOther.value ? 'primary' : 'default'))
		return () => (
			<>
				<NDivider titlePlacement='center'>系统主题</NDivider>
				<NGrid cols={8} xGap={8} yGap={12}>
					{theme.themeColorList.map(color => (
						<NGridItem key={color} class='flex-x-center'>
							<div onClick={() => theme.setThemeColor(color)}>
								<ColorCheckbox color={color} checked={color === theme.themeColor} />
							</div>
						</NGridItem>
					))}
				</NGrid>
				<NSpace vertical class='pt-12px'>
					<NColorPicker
						value={theme.themeColor}
						showAlpha={false}
						onUpdate-value={theme.setThemeColor}
					/>
					<NButton block={true} type={otherColorBtnType.value} onClick={openModal}>
						更多颜色
					</NButton>
				</NSpace>
				<ColorModal visible={visible.value} onClose={closeModal} />
			</>
		)
	}
})
