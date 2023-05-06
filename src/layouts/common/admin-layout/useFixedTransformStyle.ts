import { ComputedRef, Ref, computed, onUnmounted, ref, watch } from 'vue'

/**
 * 使用了固定定位的布局元素添加translateX
 * @param isFixed - 是否是fixed布局
 */
export function useFixedTransformStyle(isFixed: Ref<boolean> | ComputedRef<boolean>) {
	const scrollLeft = ref(0)
	const transformStyle = computed(() => `transform: translateX(${-scrollLeft.value}px);`)

	/** 是否初始化过 */
	let isInit = false

	function setScrollLeft(sLeft: number) {
		scrollLeft.value = sLeft
	}
	function scrollHandler() {
		const sLeft = document.scrollingElement?.scrollLeft || 0
		setScrollLeft(sLeft)
	}
	function initScrollLeft() {
		scrollHandler()
	}

	function addScrollEventListener() {
		document.addEventListener('scroll', scrollHandler)
	}

	function removeScrollEventListener() {
		if (!isInit) return
		document.removeEventListener('scroll', scrollHandler)
	}

	function init() {
		initScrollLeft()
		addScrollEventListener()
		isInit = true
	}

	watch(
		isFixed,
		newValue => {
			if (newValue) {
				init()
			} else {
				removeScrollEventListener()
			}
		},
		{ immediate: true }
	)

	onUnmounted(() => {
		removeScrollEventListener()
	})

	return transformStyle
}
