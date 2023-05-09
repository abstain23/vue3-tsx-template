import { computed, defineComponent, h } from 'vue'

import { useBoolean } from '@/hooks'

import type { VNodeChild, PropType } from 'vue'

export default defineComponent({
	name: 'MixMenuDetail',
	props: {
		routeName: {
			type: String
		},
		label: {
			type: String
		},
		activeRouteName: {
			type: String
		},
		icon: {
			type: Function as PropType<() => VNodeChild>,
			default: () => undefined
		},
		isMini: {
			type: Boolean,
			default: false
		}
	},
	emits: ['click'],
	setup(props, { emit }) {
		const { bool: isHover, setTrue, setFalse } = useBoolean()

		const isActive = computed(() => props.routeName === props.activeRouteName)
		return () => (
			<div
				class='mb-6px px-4px cursor-pointer'
				onMouseenter={() => {
					setTrue()
				}}
				onMouseleave={() => {
					setFalse()
				}}
				onClick={() => emit('click')}
			>
				<div
					class={[
						'flex-center flex-col py-12px rounded-2px bg-transparent transition-colors duration-300 ease-in-out',
						isActive.value ? 'text-primary !bg-primary_active' : '',
						isHover.value ? 'text-primary' : ''
					]}
				>
					{props.icon && h(props.icon, { class: props.isMini ? 'text-16px' : 'text-20px' })}
					<p
						class={[
							'text-12px overflow-hidden transition-height duration-300 ease-in-out',
							props.isMini ? 'h-0 pt-0' : 'h-24px pt-4px'
						]}
					>
						{props.label}
					</p>
				</div>
			</div>
		)
	}
})
