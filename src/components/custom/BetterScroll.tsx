import BScroll from '@better-scroll/core'
import { computed, defineComponent, onMounted, ref, type PropType, watch } from 'vue'
import { useElementSize } from '@vueuse/core'

import type { Options } from '@better-scroll/core'

export default defineComponent({
	name: 'BetterScroll',
	props: {
		options: Object as PropType<Options>
	},
	setup(props, { expose, slots }) {
		const bsWrap = ref<HTMLElement>()
		const instance = ref<BScroll>()
		const bsContent = ref<HTMLElement>()
		const isScrollY = computed(() => Boolean(props.options?.scrollY))

		function initBetterScroll() {
			if (!bsWrap.value) return
			instance.value = new BScroll(bsWrap.value, props.options)
		}

		// 滚动元素发生变化，刷新BS
		const { width: wrapWidth } = useElementSize(bsWrap)
		const { width, height } = useElementSize(bsContent)
		watch([() => wrapWidth.value, () => width.value, () => height.value], () => {
			if (instance.value) {
				instance.value.refresh()
			}
		})

		onMounted(() => {
			initBetterScroll()
		})

		expose({ instance })

		return () => (
			<div ref={bsWrap} class='h-full text-left'>
				<div ref={bsContent} class={`inline-block ${!isScrollY.value ? 'h-full' : ''}`}>
					{slots.default?.()}
				</div>
			</div>
		)
	}
})
