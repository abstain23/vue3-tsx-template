import { computed, defineComponent } from 'vue'
import { NTooltip } from 'naive-ui'

import type { PropType } from 'vue'
import type { PopoverPlacement } from 'naive-ui'

export default defineComponent({
	name: 'HoverContainer',
	props: {
		tooltipContent: {
			type: String,
			default: ''
		},
		placement: {
			type: String as PropType<PopoverPlacement>,
			default: 'bottom'
		},
		contentClass: {
			type: String,
			default: ''
		},
		inverted: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { slots }) {
		const showTooltip = computed(() => Boolean(props.tooltipContent))
		const contentClassName = computed(
			() => `${props.contentClass} ${props.inverted ? 'hover:bg-primary' : 'hover:bg-#f6f6f6'}`
		)

		return () =>
			showTooltip.value ? (
				<div>
					<NTooltip>
						{{
							trigger: () => (
								<div
									class={`flex-center h-full cursor-pointer dark:hover:bg-#333 ${contentClassName.value}`}
								>
									{slots.default?.()}
								</div>
							),
							default: () => props.tooltipContent
						}}
					</NTooltip>
				</div>
			) : (
				<div class={`flex-center cursor-pointer dark:hover:bg-#333 ${contentClassName.value}`}>
					{slots.default?.()}
				</div>
			)
	}
})
