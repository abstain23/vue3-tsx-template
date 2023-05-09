import { defineComponent } from 'vue'

import { routePath } from '@/router'
import { setLocale, t } from '@/locales'
import { RouterLink } from 'vue-router'
import { SystemLogo } from '@/components'

export default defineComponent({
	name: 'GlobalLogo',
	props: {
		showTitle: {
			type: Boolean
		}
	},
	setup(props) {
		const routeHomePath = routePath('root')
		let flag = true
		function toggleLocal() {
			flag = !flag
			setLocale(flag ? 'en' : 'zh-CN')
		}
		return () => (
			<RouterLink to={routeHomePath} class='flex-center w-full nowrap-hidden'>
				<SystemLogo class='text-32px text-primary' />
				<h2
					v-show={props.showTitle}
					class='pl-8px text-16px font-bold text-primary transition duration-300 ease-in-out'
					onClick={toggleLocal}
				>
					{t('message.system.title')}
				</h2>
			</RouterLink>
		)
	}
})
