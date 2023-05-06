import { computed, defineComponent } from 'vue'
import { CssRender } from 'css-render'

export default defineComponent({
	name: 'LayoutSide',
	props: {
		zIndex: {
			type: Number,
			default: 1002
		},
		width: {
			type: Number,
			default: 200
		},
		paddingTop: {
			type: Number,
			default: 0
		},
		transitionDuration: {
			type: Number,
			default: 300
		},
		transitionTimingFunction: {
			type: String,
			default: 'ease-in-out'
		}
	},
	setup(props, { slots }) {
		const style = computed(() => {
			const { zIndex, width, paddingTop, transitionDuration, transitionTimingFunction } = props
			return `z-index:${zIndex};width:${width}px;padding-top:${paddingTop}px;transition-duration:${transitionDuration}ms;transition-timing-function:${transitionTimingFunction};`
		})

		// css
		const { c } = CssRender()
		const cStyle = c('.admin-layout__side', {
			position: 'fixed',
			left: 0,
			top: 0,
			boxSizing: 'border-box',
			width: '100%',
			height: '100%',
			transitionProperty: 'all'
		})
		cStyle.render()
		cStyle.mount()
		return () => (
			<aside class='admin-layout__side' style={style.value}>
				{slots.default?.()}
			</aside>
		)
	}
})
