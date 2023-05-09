import { defineComponent } from 'vue'

import { useThemeStore } from '@/store'
import { useBasicLayout } from '@/composable'
import { DarkModeContainer } from '@/components'

import GlobalLogo from '../global-logo'
import {
	FullScreen,
	GlobalBreadcrumb,
	HeaderMenu,
	MenuCollapse,
	SettingButton,
	SystemMessage,
	ThemeMode,
	UserAvatar
} from './components'

export default defineComponent({
	name: 'GlobalHeader',
	props: {
		showLogo: Boolean,
		showHeaderMenu: Boolean,
		showMenuCollapse: Boolean
	},
	setup(props) {
		const theme = useThemeStore()
		const { isMobile } = useBasicLayout()

		const showButton = import.meta.env.PROD && import.meta.env.VITE_VERCEL !== 'Y'
		return () => (
			<DarkModeContainer
				class='global-header flex-y-center h-full'
				inverted={theme.header.inverted}
			>
				{props.showLogo && (
					<GlobalLogo showTitle={true} class='h-full' style={{ width: theme.sider.width + 'px' }} />
				)}
				{props.showHeaderMenu ? (
					<div class='flex-1-hidden flex-y-center h-full'>
						{(props.showMenuCollapse || isMobile.value) && <MenuCollapse />}
						{theme.header.crumb.visible && !isMobile.value && <GlobalBreadcrumb />}
					</div>
				) : (
					<HeaderMenu />
				)}
				<div class='flex justify-end h-full'>
					<FullScreen />
					<ThemeMode />
					<SystemMessage />
					{showButton && <SettingButton />}
					<UserAvatar />
				</div>
			</DarkModeContainer>
		)
	}
})
