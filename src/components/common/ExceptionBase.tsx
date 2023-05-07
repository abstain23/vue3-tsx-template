import { defineComponent } from 'vue'
import { NButton } from 'naive-ui'
import { RouterLink } from 'vue-router'

import type { PropType } from 'vue'
type ExceptionType = '403' | '404' | '500'

export default defineComponent({
	name: 'ExceptionBase',
	props: {
		type: {
			type: String as PropType<ExceptionType>
		}
	},
	setup(props) {
		return () => (
			<div class='flex-col-center gap-24px min-h-520px wh-full overflow-hidden'>
				<div class='flex text-400px text-primary'>
					{props.type === '403' && <icon-local-no-permission />}
					{props.type === '404' && <icon-local-not-found />}
					{props.type === '500' && <icon-local-service-error />}
				</div>
				<RouterLink to={{ name: 'root' }}>
					<NButton type='primary'>回到首页</NButton>
				</RouterLink>
			</div>
		)
	}
})
