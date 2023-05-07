import { defineComponent } from 'vue'
import { useAppStore, useThemeStore } from '@/store'
import { HoverContainer } from '@/components'

export default defineComponent({
	name: 'MenuCollapse',
	setup() {
		const app = useAppStore()
		const theme = useThemeStore()
		return () => (
			<HoverContainer
				class='w-40px h-full'
				inverted={theme.header.inverted}
				onClick={app.toggleSideCollapse}
			>
				{app.sideCollapse ? (
					<icon-line-md-menu-unfold-left class='text-16px' />
				) : (
					<icon-line-md-menu-fold-left class='text-16px' />
				)}
			</HoverContainer>
		)
	}
})
