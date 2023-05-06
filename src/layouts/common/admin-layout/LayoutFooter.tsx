import { computed, defineComponent } from 'vue'
import { CssRender } from 'css-render'

export default defineComponent({
	name: 'LayoutFooter',
	props: {
		fixed: {
			type: Boolean,
			default: true
		},
		zIndex: {
			type: Number,
			default: 999
		},
		useMinWidthLayout: {
			type: Boolean,
			default: false
		},
		minWidth: {
			type: Number,
			default: 1200
		},
		height: {
			type: Number,
			default: 56
		},
		paddingLeft: {
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
			const {
				fixed,
				zIndex,
				minWidth,
				height,
				paddingLeft,
				transitionDuration,
				transitionTimingFunction
			} = props
			const position = fixed ? 'fixed' : 'static'
			const minWidthStyle = props.useMinWidthLayout ? `min-width:${minWidth}px;` : ''
			return `position:${position};z-index:${zIndex};${minWidthStyle}height:${height}px;padding-left:${paddingLeft}px;transition-duration:${transitionDuration}ms;transition-timing-function:${transitionTimingFunction};`
		})

		// css
		const { c } = CssRender()
		const cStyle = c('.admin-layout__footer', {
			left: 0,
			bottom: 0,
			flexShrink: 0,
			boxSizing: 'border-box',
			width: '100%',
			transitionProperty: 'padding-left'
		})
		cStyle.render()
		cStyle.mount()
		return () => (
			<footer class='admin-layout__footer' style={style.value}>
				{slots.default?.()}
			</footer>
		)
	}
})
