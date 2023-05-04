import { defineComponent } from 'vue'
import { dateZhCN, zhCN, NConfigProvider } from 'naive-ui'
import NaiveProvider from '@/components/common/NaiveProvider'

export default defineComponent({
	name: 'App',
	setup() {
		return () => (
			<NConfigProvider locale={zhCN} dateLocale={dateZhCN} class='h-full'>
				<NaiveProvider>
					<router-view />
				</NaiveProvider>
			</NConfigProvider>
		)
	}
})
