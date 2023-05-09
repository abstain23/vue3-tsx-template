import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'ColorCheckbox',
	props: {
		color: String,
		checked: Boolean,
		iconClass: {
			type: String,
			default: 'text-14px'
		}
	},
	setup(props) {
		const whiteColors = ['#ffffff', '#fff', 'rgb(255,255,255)']
		const isWhite = computed(() => whiteColors.includes(props.color || ''))
		return () => (
			<div
				class='flex-center w-20px h-20px rounded-2px shadow cursor-pointer'
				style={{ backgroundColor: props.color }}
			>
				{props.checked && (
					<icon-ic-outline-check
						class={[props.iconClass, isWhite.value ? 'text-gray-700' : 'text-white']}
					/>
				)}
			</div>
		)
	}
})
