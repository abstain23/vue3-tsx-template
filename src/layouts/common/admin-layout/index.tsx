import { defineComponent, computed, PropType } from 'vue'
import { CssRender } from 'css-render'
import LayoutHeader from './LayoutHeader'
import LayoutTab from './LayoutTab'
import LayoutSide from './LayoutSide'
import LayoutContent from './LayoutContent'
import LayoutFooter from './LayoutFooter'
import { useFixedTransformStyle } from './useFixedTransformStyle'

export default defineComponent({
	name: 'AdminLayout',
	props: {
		mode: {
			type: String as PropType<'vertical' | 'horizontal'>,
			default: 'vertical'
		},
		isMobile: {
			type: Boolean,
			default: false
		},
		maskBg: {
			type: String,
			default: 'rgba(0,0,0,0.3)'
		},
		useMinWidthLayout: {
			type: Boolean,
			default: false
		},
		minWidth: {
			type: Number,
			default: 1200
		},
		headerVisible: {
			type: Boolean,
			default: true
		},
		headerHeight: {
			type: Number,
			default: 56
		},
		tabVisible: {
			type: Boolean,
			default: true
		},
		tabHeight: {
			type: Number,
			default: 44
		},
		fixedHeaderAndTab: {
			type: Boolean,
			default: true
		},
		addMainOverflowHidden: {
			type: Boolean,
			default: false
		},
		footerVisible: {
			type: Boolean,
			default: true
		},
		footerHeight: {
			type: Number,
			default: 48
		},
		fixedFooter: {
			type: Boolean,
			default: true
		},
		sideVisible: {
			type: Boolean,
			default: true
		},
		sideWidth: {
			type: Number,
			default: 200
		},
		sideCollapsedWidth: {
			type: Number,
			default: 64
		},
		sideCollapse: {
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
	emits: ['update:side-collapse'],
	setup(props, { emit, slots }) {
		const style = computed(() => (props.useMinWidthLayout ? `min-width:${props.minWidth}px;` : ''))

		// fixed布局时，应用translateX样式(水平方向出现滚动条，拖动滚动条时，fixed元素跟着滚动)
		const hasFixedEl = computed(
			() => props.useMinWidthLayout && (props.fixedHeaderAndTab || props.fixedFooter)
		)
		const transformStyle = useFixedTransformStyle(hasFixedEl)
		const headerAndTabTransform = computed(() =>
			props.fixedHeaderAndTab ? transformStyle.value : ''
		)
		const footerTransform = computed(() => (props.fixedFooter ? transformStyle.value : ''))

		/** 各个子组件的公共属性 */
		const commonProps = computed(() => {
			const { transitionDuration, transitionTimingFunction } = props
			return {
				transitionDuration,
				transitionTimingFunction
			}
		})

		/** 水平布局 */
		const isVertical = computed(() => props.mode === 'vertical')

		// fixed布局时的层级
		const headerZIndex = 1001
		const tabZIndex = 999
		const sideZIndex = computed(() => (props.isMobile || isVertical.value ? 1003 : 1000))
		const footerZIndex = 998

		const sideCollapseStatus = computed({
			get() {
				return props.sideCollapse
			},
			set(collapse) {
				emit('update:side-collapse', collapse)
			}
		})
		function handleClickMask() {
			sideCollapseStatus.value = true
		}

		const showMask = computed(() => props.isMobile && !sideCollapseStatus.value)

		const sideStyle = computed(() => {
			const { transitionDuration, transitionTimingFunction } = props
			const sStyle = `background-color:${props.maskBg};transition-duration:${transitionDuration}ms;transition-timing-function:${transitionTimingFunction};`
			return sStyle
		})

		/** 侧边宽度 */
		const currentSideWidth = computed(() => {
			const { sideWidth, sideCollapsedWidth } = props
			const collapseWidth = props.isMobile ? 0 : sideCollapsedWidth
			const width = sideCollapseStatus.value ? collapseWidth : sideWidth
			return props.sideVisible ? width : 0
		})

		const commonPaddingLeft = computed(() => (props.isMobile ? 0 : currentSideWidth.value))

		// 各子组件的属性
		const headerPaddingLeft = computed(() => (isVertical.value ? commonPaddingLeft.value : 0))
		const sidePaddingTop = computed(() =>
			!props.isMobile && !isVertical.value && props.headerVisible ? props.headerHeight : 0
		)
		const contentPaddingTop = computed(() => {
			let height = 0
			if (props.fixedHeaderAndTab) {
				if (props.headerVisible) {
					height += props.headerHeight
				}
				if (props.tabVisible) {
					height += props.tabHeight
				}
			}
			return height
		})
		const contentPaddingBottom = computed(() =>
			props.fixedFooter && props.footerVisible ? props.footerHeight : 0
		)

		// css
		const { c } = CssRender()
		const cStyle = c(
			'.admin-layout',
			{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '100%'
			},
			[
				c('&__side-mask', {
					position: 'fixed',
					left: 0,
					top: 0,
					zIndex: 1002,
					width: '100%',
					height: '100%',
					transitionProperty: 'background-color'
				})
			]
		)
		cStyle.render()
		cStyle.mount()
		return () => (
			<div class='admin-layout' style={style.value}>
				{props.headerVisible && (
					<LayoutHeader
						v-bind={commonProps.value}
						fixed={props.fixedHeaderAndTab}
						zIndex={headerZIndex}
						minWidth={props.minWidth}
						height={props.headerHeight}
						paddingLeft={headerPaddingLeft.value}
						style={headerAndTabTransform.value}
					>
						{slots.header?.()}
					</LayoutHeader>
				)}
				{props.tabVisible && (
					<LayoutTab
						v-bind={commonProps.value}
						fixed={props.fixedHeaderAndTab}
						zIndex={tabZIndex}
						minWidth={props.minWidth}
						top={props.headerHeight}
						height={props.tabHeight}
						paddingLeft={commonPaddingLeft.value}
						style={headerAndTabTransform.value}
					>
						{slots.tab?.()}
					</LayoutTab>
				)}
				{props.sideVisible && (
					<LayoutSide
						v-bind={commonProps.value}
						zIndex={sideZIndex.value}
						width={currentSideWidth.value}
						paddingTop={sidePaddingTop.value}
					>
						{slots.side?.()}
					</LayoutSide>
				)}
				{showMask.value && (
					<div
						class='admin-layout__side-mask'
						style={sideStyle.value}
						onClick={handleClickMask}
					></div>
				)}

				<LayoutContent
					v-bind={commonProps.value}
					paddingTop={contentPaddingTop.value}
					paddingBottom={contentPaddingBottom.value}
					paddingLeft={commonPaddingLeft.value}
					overflowHidden={props.addMainOverflowHidden}
				>
					{slots.default?.()}
				</LayoutContent>

				{props.footerVisible && (
					<LayoutFooter
						v-bind={commonProps.value}
						fixed={props.fixedFooter}
						zIndex={footerZIndex}
						minWidth={props.minWidth}
						height={props.footerHeight}
						paddingLeft={commonPaddingLeft.value}
						style={footerTransform.value}
					>
						{slots.footer?.()}
					</LayoutFooter>
				)}
			</div>
		)
	}
})
