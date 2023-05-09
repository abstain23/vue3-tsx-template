import { computed, defineComponent } from 'vue'

import { useThemeStore } from '@/store'

import { VerticalMixSide, VerticalSide } from './components'

export default defineComponent({
	name: 'GlobalSide',
	setup() {
		const theme = useThemeStore()

		const isVerticalMix = computed(() => theme.layout.mode === 'vertical-mix')
		return () =>
			isVerticalMix.value ? (
				<VerticalMixSide class='global-side' />
			) : (
				<VerticalSide class='global-side' />
			)
	}
})
