import { computed, defineComponent } from 'vue'
import { CssRender } from 'css-render'

export default defineComponent({
	name: 'LayoutContent',
	props: {
		paddingTop: {
			type: Number,
			default: 0
		},
		paddingBottom: {
			type: Number,
			default: 0
		},
		paddingLeft: {
			type: Number,
			default: 0
		},
		overflowHidden: {
			type: Boolean,
			default: false
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
				paddingTop,
				paddingBottom,
				paddingLeft,
				transitionDuration,
				transitionTimingFunction
			} = props
			const overflowStyle = `overflow:${props.overflowHidden ? 'hidden' : 'visible'};`
			return `padding-top:${paddingTop}px;padding-bottom:${paddingBottom}px;padding-left:${paddingLeft}px;${overflowStyle}transition-duration:${transitionDuration}ms;transition-timing-function:${transitionTimingFunction};`
		})

		const { c } = CssRender()
		const cStyle = c('.admin-layout__content', {
			flexGrow: 1,
			boxSizing: 'border-box',
			width: '100%',
			transitionProperty: 'padding-left'
		})
		cStyle.render()
		cStyle.mount()

		return () => (
			<main style={style.value} class='admin-layout__content'>
				{slots.default?.()}
			</main>
		)
	}
})
