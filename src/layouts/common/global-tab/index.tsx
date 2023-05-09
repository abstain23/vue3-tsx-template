import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useElementBounding } from '@vueuse/core'

import { useTabStore, useThemeStore } from '@/store'
import { useDeviceInfo } from '@/composable'
import { BetterScroll, DarkModeContainer } from '@/components'

import { ReloadButton, TabDetail } from './components'

export default defineComponent({
	name: 'GlobalTab',
	setup() {
		const route = useRoute()
		const theme = useThemeStore()
		const tab = useTabStore()
		const deviceInfo = useDeviceInfo()

		const bsWrapper = ref<HTMLElement>()
		const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(bsWrapper)

		const bsScroll = ref<Expose.BetterScroll>()

		const canClick = Boolean(deviceInfo.device.type)

		function handleScroll(clientX: number) {
			const currentX = clientX - bsWrapperLeft.value
			const deltaX = currentX - bsWrapperWidth.value / 2
			if (bsScroll.value) {
				const { maxScrollX, x: leftX } = bsScroll.value.instance
				const rightX = maxScrollX - leftX
				const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX)
				bsScroll.value?.instance.scrollBy(update, 0, 300)
			}
		}

		function init() {
			tab.iniTabStore(route)
		}

		watch(
			() => route.fullPath,
			() => {
				tab.addTab(route)
				tab.setActiveTab(route.fullPath)
			}
		)

		// 初始化
		init()
		return () => (
			<DarkModeContainer
				class='global-tab flex-y-center w-full pl-16px'
				style={{ height: theme.tab.height + 'px' }}
			>
				<div ref={bsWrapper} class='flex-1-hidden h-full'>
					<BetterScroll ref={bsScroll} options={{ scrollX: true, scrollY: false, click: canClick }}>
						<TabDetail onScroll={handleScroll} />
					</BetterScroll>
				</div>
				<ReloadButton />
			</DarkModeContainer>
		)
	}
})
