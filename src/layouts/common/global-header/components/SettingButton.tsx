import { defineComponent } from 'vue'
import { HoverContainer } from '@/components'
import { useAppStore, useThemeStore } from '@/store'
export default defineComponent({
	name: 'SettingButton',
	setup() {
		const app = useAppStore()
		const theme = useThemeStore()
		return () => (
			<HoverContainer
				class='w-40px h-full'
				tooltipContent='主题配置'
				inverted={theme.header.inverted}
			>
				<div onClick={app.toggleSettingDrawerVisible}>
					<icon-ant-design-setting-outlined className='text-20px' />
				</div>
			</HoverContainer>
		)
	}
})
