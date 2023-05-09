import { HoverContainer } from '@/components'
import { defineComponent } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useThemeStore } from '@/store'

export default defineComponent({
	name: 'useFullscreen',
	setup() {
		const { isFullscreen, toggle } = useFullscreen()
		const theme = useThemeStore()
		return () => (
			<div onClick={toggle}>
				<HoverContainer
					class='w-40px h-full'
					tooltip-content='全屏'
					inverted={theme.header.inverted}
				>
					{isFullscreen.value ? (
						<icon-gridicons-fullscreen-exit class='text-18px' />
					) : (
						<icon-gridicons-fullscreen class='text-18px' />
					)}
				</HoverContainer>
			</div>
		)
	}
})
