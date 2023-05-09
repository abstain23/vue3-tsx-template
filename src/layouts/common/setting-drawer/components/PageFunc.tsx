import { defineComponent } from 'vue'
import { NDivider, NInputNumber, NSelect, NSpace, NSwitch } from 'naive-ui'

import { useThemeStore } from '@/store'

import SettingMenu from './SettingMenu'

export default defineComponent({
	name: 'PageFunc',
	setup() {
		const theme = useThemeStore()
		return () => (
			<>
				<NDivider titlePlacement='center'>界面功能</NDivider>
				<NSpace vertical size='large'>
					<SettingMenu label='滚动模式'>
						<NSelect
							class='w-120px'
							size='small'
							value={theme.scrollMode}
							options={theme.scrollModeList}
							onUpdate:value={theme.setScrollMode}
						/>
					</SettingMenu>
					<SettingMenu label='固定头部和多页签'>
						<NSwitch
							value={theme.fixedHeaderAndTab}
							onUpdate:value={theme.setIsFixedHeaderAndTab}
						/>
					</SettingMenu>
					<SettingMenu label='顶部菜单位置'>
						<NSelect
							class='w-120px'
							size='small'
							value={theme.menu.horizontalPosition}
							options={theme.menu.horizontalPositionList}
							onUpdate:value={theme.setHorizontalMenuPosition}
						/>
					</SettingMenu>
					<SettingMenu label='头部高度'>
						<NInputNumber
							class='w-120px'
							size='small'
							value={theme.header.height}
							step={1}
							onUpdate:value={theme.setHeaderHeight}
						/>
					</SettingMenu>
					<SettingMenu label='多页签高度'>
						<NInputNumber
							class='w-120px'
							size='small'
							value={theme.tab.height}
							step={1}
							onUpdate:value={theme.setTabHeight}
						/>
					</SettingMenu>
					<SettingMenu label='多页签缓存'>
						<NSwitch value={theme.tab.isCache} onUpdate:value={theme.setTabIsCache} />
					</SettingMenu>
					<SettingMenu label='侧边栏展开宽度'>
						<NInputNumber
							class='w-120px'
							size='small'
							value={theme.sider.width}
							step={1}
							onUpdate:value={theme.setSiderWidth}
						/>
					</SettingMenu>
					<SettingMenu label='左侧混合侧边栏展开宽度'>
						<NInputNumber
							class='w-120px'
							size='small'
							value={theme.sider.mixWidth}
							step={1}
							onUpdate:value={theme.setMixSiderWidth}
						/>
					</SettingMenu>
					<SettingMenu label='显示底部'>
						<NSwitch value={theme.footer.visible} onUpdate:value={theme.setFooterVisible} />
					</SettingMenu>
					<SettingMenu label='固定底部'>
						<NSwitch value={theme.footer.fixed} onUpdate:value={theme.setFooterIsFixed} />
					</SettingMenu>
					<SettingMenu label='底部居右'>
						<NSwitch value={theme.footer.right} onUpdate:value={theme.setFooterIsRight} />
					</SettingMenu>
				</NSpace>
			</>
		)
	}
})
