import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { dateZhCN, NConfigProvider, zhCN } from 'naive-ui'

import NaiveProvider from '@/components/common/NaiveProvider'
import { subscribeStore, useThemeStore } from '@/store'
import { useGlobalEvents } from '@/composable'

export default defineComponent({
	name: 'App',
	setup() {
		const themeStore = useThemeStore()

		subscribeStore()
		useGlobalEvents()
		return () => (
			<NConfigProvider
				locale={zhCN}
				dateLocale={dateZhCN}
				theme={themeStore.naiveTheme}
				themeOverrides={themeStore.naiveThemeOverrides}
				class='h-full'
			>
				<NaiveProvider>
					<RouterView />
				</NaiveProvider>
			</NConfigProvider>
		)
	}
})
