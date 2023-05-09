import { defineComponent } from 'vue'
import { NDrawer, NDrawerContent } from 'naive-ui'

import { useAppStore } from '@/store'

import {
	DarkMode,
	DrawerButton,
	LayoutMode,
	PageFunc,
	PageView,
	ThemeColorSelect,
	ThemeConfig
} from './components'

export default defineComponent({
	name: 'SettingDrawer',
	setup() {
		const app = useAppStore()

		const showButton = import.meta.env.DEV || import.meta.env.VITE_VERCEL === 'Y'
		console.log('app.settingDrawerVisible', app.settingDrawerVisible)
		return () => (
			<>
				<NDrawer
					show={app.settingDrawerVisible}
					displayDirective='show'
					width={330}
					onMaskClick={app.closeSettingDrawer}
				>
					<NDrawerContent title='主题配置' nativeScrollbar={false}>
						<DarkMode />
						<LayoutMode />
						<ThemeColorSelect />
						<PageFunc />
						<PageView />
						<ThemeConfig />
					</NDrawerContent>
				</NDrawer>
				{showButton && <DrawerButton />}
			</>
		)
	}
})
