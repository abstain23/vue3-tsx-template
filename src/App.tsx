import { defineComponent } from 'vue'
import { dateZhCN, zhCN, NConfigProvider } from 'naive-ui'
import NaiveProvider from '@/components/common/NaiveProvider'
import { useThemeStore, subscribeStore } from '@/store'

export default defineComponent({
	name: 'App',
	setup() {
		const themeStore = useThemeStore()

		subscribeStore()
		return () => (
			<NConfigProvider
				locale={zhCN}
				dateLocale={dateZhCN}
				theme={themeStore.naiveTheme}
				themeOverrides={themeStore.naiveThemeOverrides}
				class='h-full'
			>
				<NaiveProvider>
					<router-view />
				</NaiveProvider>
			</NConfigProvider>
		)
	}
})
