import { defineComponent } from 'vue'

import { DarkModeSwitch, HoverContainer } from '@/components'
import { useThemeStore } from '@/store'

export default defineComponent({
	name: 'ThemeMode',
	setup() {
		const theme = useThemeStore()
		return () => (
			<HoverContainer class='w-40px' inverted={theme.header.inverted} tooltipContent='主题模式'>
				<DarkModeSwitch
					dark={theme.darkMode}
					class='wh-full'
					onUpdate:dark={theme.setDarkMode}
				></DarkModeSwitch>
			</HoverContainer>
		)
	}
})
