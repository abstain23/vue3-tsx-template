import './index.scss'

import { defineComponent } from 'vue'
import { AdminLayout } from '@soybeanjs/vue-materials'
import { NBackTop } from 'naive-ui'

import { useAppStore, useThemeStore } from '@/store'
import { useBasicLayout } from '@/composable'

import {
	GlobalContent,
	GlobalFooter,
	GlobalHeader,
	GlobalSide,
	GlobalTab,
	SettingDrawer
} from '../common'

export default defineComponent({
	name: 'BasicLayout',
	setup() {
		const app = useAppStore()
		const theme = useThemeStore()

		const { mode, headerProps, sideVisible, sideWidth, sideCollapsedWidth } = useBasicLayout()

		return () => (
			<>
				<AdminLayout
					mode={mode.value}
					scrollMode={theme.scrollMode}
					scrollElId={app.scrollElId}
					fullContent={app.contentFull}
					fixedTop={theme.fixedHeaderAndTab}
					headerHeight={theme.header.height}
					tabVisible={theme.tab.visible}
					tabHeight={theme.tab.height}
					contentClass={app.disableMainXScroll ? 'overflow-x-hidden' : ''}
					siderVisible={sideVisible.value}
					siderCollapse={app.sideCollapse}
					siderWidth={sideWidth.value}
					siderCollapsedWidth={sideCollapsedWidth.value}
					footerVisible={theme.footer.visible}
					fixedFooter={theme.footer.fixed}
					rightFooter={theme.footer.right}
				>
					{{
						header: () => <GlobalHeader {...headerProps.value} />,
						tab: () => <GlobalTab />,
						sider: () => <GlobalSide />,
						default: () => <GlobalContent />,
						footer: () => <GlobalFooter />
					}}
				</AdminLayout>
				<NBackTop key={theme.scrollMode} listenTo={`#${app.scrollElId}`} class='z-100' />
				<SettingDrawer />
			</>
		)
	}
})
