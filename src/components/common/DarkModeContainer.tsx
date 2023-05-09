import { defineComponent } from 'vue'

export default defineComponent({
	name: 'DarkModeContainer',
	props: {
		inverted: {
			type: Boolean,
			default: false
		}
	},
	emits: ['mouseleave'],
	setup(props, { slots, emit }) {
		const baseClass = 'dark:bg-dark dark:text-white dark:text-opacity-82 transition-all'

		return () => (
			<div
				onMouseleave={() => emit('mouseleave')}
				class={`${baseClass} ${props.inverted ? 'bg-#001428 text-white' : 'bg-white text-#333639'}`}
			>
				{slots.default?.()}
			</div>
		)
	}
})
