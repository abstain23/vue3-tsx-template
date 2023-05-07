import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { getColorPalette } from '@/utils'
import CornerTop from './CornerTop'
import CornerBottom from './CornerBottom'

export default defineComponent({
	name: 'LoginBg',
	props: {
		themeColor: {
			type: String as PropType<string>,
			default: ''
		}
	},
	setup(props) {
		const lightColor = computed(() => getColorPalette(props.themeColor, 3))
		const darkColor = computed(() => getColorPalette(props.themeColor, 6))
		return () => (
			<div class='absolute-lt z-1 wh-full overflow-hidden'>
				<div class='absolute -right-300px -top-900px <sm:(-right-100px -top-1170px)'>
					<CornerTop start-color={lightColor.value} end-color={darkColor.value} />
				</div>
				<div class='absolute -left-200px -bottom-400px <sm:(-left-100px -bottom-760px)'>
					<CornerBottom start-color={darkColor.value} end-color={lightColor.value} />
				</div>
			</div>
		)
	}
})
