declare namespace Layouts {
	interface AdminTabProps {
		/** 暗黑模式 */
		darkMode?: boolean
		/**
		 * Tab模式
		 * - {@link TabMode}
		 */
		mode?: import('@soybeanjs/vue-materials').TabMode
		/**
		 * 通用的样式名称
		 * - 可以用来配置过渡动画的样式
		 * @default 'transition-all-300'
		 */
		commonClass?: string
		/** button模式的类名 */
		buttonClass?: string
		/** chrome模式的类名 */
		chromeClass?: string
		/** 是否是激活状态 */
		active?: boolean
		/** 激活时的颜色 */
		activeColor?: string
		/** 是否显示关闭图标 */
		closable?: boolean
		/** 点击关闭图标 */
		onClose?: () => void
		/** 补充ts类型 原生点击 */
		onClick?: () => void
		/** 补充ts类型 右键菜单  */
		onContextmenu?: (e: MouseEvent) => void
	}
}
