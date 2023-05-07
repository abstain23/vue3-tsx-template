import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'DarkModeSwitch',
	props: {
		dark: {
			type: Boolean,
			default: false
		}
	},
	emits: ['update:dark'],
	setup(props, { emit }) {
		const darkMode = computed({
			get() {
				return props.dark
			},
			set(newValue: boolean) {
				emit('update:dark', newValue)
			}
		})

		function handleSwitch() {
			darkMode.value = !darkMode.value
		}

		return () => (
			<div class='flex-center text-18px cursor-pointer' onClick={handleSwitch}>
				{darkMode.value ? <icon-mdi-moon-waning-crescent /> : <icon-mdi-white-balance-sunny />}
			</div>
		)
	}
})
