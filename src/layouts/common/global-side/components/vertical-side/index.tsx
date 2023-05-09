import { computed, defineComponent } from 'vue'

import { useAppStore, useThemeStore } from '@/store'
import { GlobalLogo } from '@/layouts/common'
import { DarkModeContainer } from '@/components'

import VerticalMenu from './VerticalMenu'

export default defineComponent({
	name: 'VerticalSide',
	setup() {
		const app = useAppStore()
		const theme = useThemeStore()

		const isHorizontalMix = computed(() => theme.layout.mode === 'horizontal-mix')
		const showTitle = computed(() => !app.sideCollapse && theme.layout.mode !== 'vertical-mix')

		return () => (
			<DarkModeContainer class='flex-col-stretch h-full' inverted={theme.sider.inverted}>
				{!isHorizontalMix.value && (
					<GlobalLogo showTitle={showTitle.value} style={{ height: theme.header.height + 'px' }} />
				)}
				<VerticalMenu />
			</DarkModeContainer>
		)
	}
})
