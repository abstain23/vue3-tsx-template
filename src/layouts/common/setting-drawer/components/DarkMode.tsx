import { defineComponent } from 'vue'
import { useThemeStore } from '@/store'
import SettingMenu from './SettingMenu'
import { NDivider, NSpace, NSwitch } from 'naive-ui'

export default defineComponent({
	name: 'DarkMode',
	setup() {
		const theme = useThemeStore()
		return () => (
			<>
				<NDivider titlePlacement='center'>主题模式</NDivider>
				<NSpace vertical size='large'>
					<SettingMenu label='深色主题'>
						<NSwitch value={theme.darkMode} onUpdate:value={theme.setDarkMode}>
							{{
								checked: () => <icon-mdi-white-balance-sunny class='text-14px text-white' />,
								unchecked: () => <icon-mdi-moon-waning-crescent class='text-14px text-white' />
							}}
						</NSwitch>
					</SettingMenu>
					<SettingMenu label='跟随系统'>
						<NSwitch value={theme.followSystemTheme} onUpdate:value={theme.setFollowSystemTheme}>
							{{
								checked: () => <icon-ic-baseline-do-not-disturb class='text-14px text-white' />,
								unchecked: () => <icon-ic-round-hdr-auto class='text-14px text-white' />
							}}
						</NSwitch>
					</SettingMenu>
					<SettingMenu label='侧边栏深色'>
						<NSwitch value={theme.sider.inverted} onUpdate:value={theme.setSiderInverted}></NSwitch>
					</SettingMenu>
					<SettingMenu label='头部深色'>
						<NSwitch
							value={theme.header.inverted}
							onUpdate:value={theme.setHeaderInverted}
						></NSwitch>
					</SettingMenu>
					<SettingMenu label='底部深色'>
						<NSwitch
							value={theme.footer.inverted}
							onUpdate:value={theme.setFooterInverted}
						></NSwitch>
					</SettingMenu>
				</NSpace>
			</>
		)
	}
})
