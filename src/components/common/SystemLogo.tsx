import { defineComponent } from 'vue'

export default defineComponent({
	name: 'SystemLogo',
	props: {
		fill: {
			type: Boolean,
			default: false
		},
		class: String
	},
	setup(props) {
		return () => (
			<>
				{props.fill ? (
					<icon-local-logo-fill class={props.class} />
				) : (
					<icon-local-logo class={props.class} />
				)}
			</>
		)
	}
})
