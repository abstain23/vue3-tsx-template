import { defineComponent, computed, type PropType } from 'vue'
import { NTooltip, type PopoverPlacement } from 'naive-ui'

export default defineComponent({
	name: 'LayoutCard',
	props: {
		mode: String as PropType<UnionKey.ThemeLayoutMode>,
		label: String,
		checked: Boolean
	},
	setup(props, { slots }) {
		type LayoutConfig = Record<
			UnionKey.ThemeLayoutMode,
			{
				placement: PopoverPlacement
				headerClass: string
				menuClass: string
				mainClass: string
			}
		>

		const layoutConfig: LayoutConfig = {
			vertical: {
				placement: 'bottom-start',
				headerClass: '',
				menuClass: 'w-1/3 h-full',
				mainClass: 'w-2/3 h-3/4'
			},
			'vertical-mix': {
				placement: 'bottom',
				headerClass: '',
				menuClass: 'w-1/4 h-full',
				mainClass: 'w-2/3 h-3/4'
			},
			horizontal: {
				placement: 'bottom',
				headerClass: '',
				menuClass: 'w-full h-1/4',
				mainClass: 'w-full h-3/4'
			},
			'horizontal-mix': {
				placement: 'bottom-end',
				headerClass: '',
				menuClass: 'w-full h-1/4',
				mainClass: 'w-2/3 h-3/4'
			}
		}

		const activeConfig = computed(() => layoutConfig[props.mode || 'vertical'])

		return () => (
			<div
				class={[
					'border-2px rounded-6px cursor-pointer hover:border-primary',
					props.checked ? 'border-primary' : 'border-transparent'
				]}
			>
				<NTooltip placement={activeConfig.value.placement} trigger='hover'>
					{{
						trigger: () => (
							<div
								class={[
									'layout-card__shadow gap-6px w-96px h-64px p-6px rd-4px',
									props.mode?.includes('vertical') ? 'flex' : 'flex-col'
								]}
							>
								{slots.default?.()}
							</div>
						),
						default: () => <span>{props.label}</span>
					}}
				</NTooltip>
			</div>
		)
	}
})
