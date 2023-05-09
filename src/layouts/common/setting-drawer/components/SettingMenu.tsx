import { defineComponent } from 'vue'

export default defineComponent({
	name: 'SettingMenu',
	props: {
		label: {
			type: String
		}
	},
	setup(props, { slots }) {
		return () => (
			<div class='flex-y-center justify-between'>
				<span>{props.label}</span>
				{slots.default?.()}
			</div>
		)
	}
})
