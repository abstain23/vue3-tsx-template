import { defineComponent } from 'vue'
import { useThemeStore } from '@/store'
import { DarkModeContainer } from '@/components'

export default defineComponent({
	name: 'GlobalFooter',
	setup() {
		const theme = useThemeStore()
		return () => (
			<DarkModeContainer class='flex-center h-full' inverted={theme.footer.inverted}>
				<span>Copyright ©2023 Soybean Admin</span>
			</DarkModeContainer>
		)
	}
})
