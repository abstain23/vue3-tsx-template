import { PropType, defineComponent } from 'vue'
import { NButton } from 'naive-ui'
import { RouterLink } from 'vue-router'

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
					<icon-local-no-permission v-if={props.type === '403'} />
					<icon-local-not-found v-if={props.type === '404'} />
					<icon-local-service-error v-if={props.type === '500'} />
				</div>
				<RouterLink to={{ name: 'root' }}>
					<NButton type='primary'>回到首页</NButton>
				</RouterLink>
			</div>
		)
	}
})
