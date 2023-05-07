import { computed, defineComponent, useAttrs } from 'vue'
import { Icon } from '@iconify/vue'

import type { PropType } from 'vue'
export default defineComponent({
	name: 'SvgIcon',
	props: {
		icon: {
			type: String as PropType<string | undefined>,
			default: undefined
		},
		localIcon: {
			type: String as PropType<string | undefined>,
			default: undefined
		}
	},
	setup(props) {
		const attrs = useAttrs()
		const bindAttrs = computed<{ class: string; style: string }>(() => ({
			class: (attrs.class as string) || '',
			style: (attrs.style as string) || ''
		}))
		const symbolId = computed(() => {
			const { VITE_ICON_LOCAL_PREFIX: prefix } = import.meta.env

			const defaultLocalIcon = 'no-icon'

			const icon = props.localIcon || defaultLocalIcon

			return `#${prefix}-${icon}`
		})

		/** 渲染本地icon */
		const renderLocalIcon = computed(() => props.localIcon || !props.icon)
		return () => (
			<template>
				<template v-if={renderLocalIcon.value}>
					<svg aria-hidden='true' width='1em' height='1em' {...bindAttrs.value}>
						<use xlinkHref={symbolId.value} fill='currentColor' />
					</svg>
				</template>
				<template v-else>
					<Icon v-if={props.icon} icon={props.icon as string} {...bindAttrs.value} />
				</template>
			</template>
		)
	}
})
