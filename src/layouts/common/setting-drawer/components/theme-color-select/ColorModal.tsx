import { defineComponent, ref } from 'vue'
import { NGradientText, NGrid, NGridItem, NModal, NTabPane, NTabs } from 'naive-ui'

import { traditionColors } from '@/settings'
import { useThemeStore } from '@/store'

import ColorCheckbox from './ColorCheckbox'

export default defineComponent({
	name: 'ColorModal',
	props: {
		visible: Boolean
	},
	emits: ['close'],
	setup(props, { emit }) {
		const theme = useThemeStore()

		const currentTab = ref(traditionColors[0].label)

		function handleClose() {
			emit('close')
		}
		return () => (
			<NModal
				show={props.visible}
				preset='card'
				class='w-640px h-480px'
				zIndex={10001}
				onClose={handleClose}
			>
				<div class='flex-x-center'>
					<NGradientText type='primary' size={24}>
						中国传统颜色
					</NGradientText>
				</div>
				<NTabs v-model:value={currentTab.value}>
					{traditionColors.map(item => (
						<NTabPane key={item.label} name={item.label} tab={item.label}>
							<NGrid cols={8} xGap={16} yGap={8}>
								{item.data.map(i => (
									<NGridItem key={i.label}>
										<div onClick={() => theme.setThemeColor(i.color)}>
											<ColorCheckbox
												class='!w-full !h-36px !rounded-4px'
												color={i.color}
												checked={i.color === theme.themeColor}
												iconClass='text-20px'
											/>
										</div>
										<p class='text-center'>{i.label}</p>
									</NGridItem>
								))}
							</NGrid>
						</NTabPane>
					))}
				</NTabs>
			</NModal>
		)
	}
})
