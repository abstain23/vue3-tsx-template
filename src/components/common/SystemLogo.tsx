import { defineComponent } from 'vue'

export default defineComponent({
	name: 'SystemLogo',
	props: {
		fill: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		return () => <div>{props.fill ? <icon-local-logo-fill /> : <icon-local-logo />}</div>
	}
})
