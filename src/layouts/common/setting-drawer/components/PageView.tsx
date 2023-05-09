import { defineComponent } from 'vue'
import { NDivider, NSelect, NSpace, NSwitch } from 'naive-ui'

import { useThemeStore } from '@/store'

import SettingMenu from './SettingMenu'

export default defineComponent({
	name: 'PageView',
	setup() {
		const theme = useThemeStore()
		return () => (
			<>
				<NDivider titlePlacement='center'>界面显示</NDivider>
				<NSpace vertical size='large'>
					<SettingMenu label='面包屑'>
						<NSwitch
							value={theme.header.crumb.visible}
							onUpdate:value={theme.setHeaderCrumbVisible}
						/>
					</SettingMenu>
					<SettingMenu label='面包屑图标'>
						<NSwitch
							value={theme.header.crumb.showIcon}
							onUpdate:value={theme.setHeaderCrumbIconVisible}
						/>
					</SettingMenu>
					<SettingMenu label='多页签'>
						<NSwitch value={theme.tab.visible} onUpdate:value={theme.setTabVisible} />
					</SettingMenu>
					<SettingMenu label='多页签风格'>
						<NSelect
							class='w-120px'
							size='small'
							value={theme.tab.mode}
							options={theme.tab.modeList}
							onUpdate:value={theme.setTabMode}
						/>
					</SettingMenu>
					<SettingMenu label='页面切换动画'>
						<NSwitch value={theme.page.animate} onUpdate:value={theme.setPageIsAnimate} />
					</SettingMenu>
					<SettingMenu label='页面切换动画类型'>
						<NSelect
							class='w-120px'
							size='small'
							value={theme.page.animateMode}
							options={theme.page.animateModeList}
							onUpdate:value={theme.setPageAnimateMode}
						/>
					</SettingMenu>
				</NSpace>
			</>
		)
	}
})
