import { defineComponent, computed, type PropType } from 'vue'
import { NTooltip, type PopoverPlacement } from 'naive-ui'

export default defineComponent({
	name: 'LayoutCheckbox',
	props: {
		mode: String as PropType<UnionKey.ThemeLayoutMode>,
		label: String,
		checked: Boolean
	},
	setup(props) {
		type LayoutConfig = Record<
			UnionKey.ThemeLayoutMode,
			{
				placement: PopoverPlacement
				menuClass: string
				mainClass: string
			}
		>

		const layoutConfig: LayoutConfig = {
			vertical: {
				placement: 'bottom-start',
				menuClass: 'w-1/3 h-full',
				mainClass: 'w-2/3 h-3/4'
			},
			'vertical-mix': {
				placement: 'bottom',
				menuClass: 'w-1/4 h-full',
				mainClass: 'w-2/3 h-3/4'
			},
			horizontal: {
				placement: 'bottom',
				menuClass: 'w-full h-1/4',
				mainClass: 'w-full h-3/4'
			},
			'horizontal-mix': {
				placement: 'bottom-end',
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
							<div class='layout-checkbox__shadow relative w-56px h-48px bg-white rounded-4px overflow-hidden'>
								<div class={`absolute-lt bg-#273352 ${activeConfig.value.menuClass}`}></div>
								<div class={`absolute-rb bg-#f0f2f5 ${activeConfig.value.mainClass}`}></div>
							</div>
						)
					}}
					<span>{props.label}</span>
				</NTooltip>
			</div>
		)
	}
})
