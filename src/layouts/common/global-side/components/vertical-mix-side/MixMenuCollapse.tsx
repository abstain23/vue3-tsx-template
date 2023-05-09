import { defineComponent } from 'vue'
import { useAppStore } from '@/store'
import { NButton } from 'naive-ui'
export default defineComponent({
	name: 'MixMenuCollapse',
	setup() {
		const app = useAppStore()
		return () => (
			<NButton text class='h-36px' onClick={app.toggleSideCollapse}>
				{app.sideCollapse ? (
					<icon-ph-caret-double-right-bold class='text-16px' />
				) : (
					<icon-ph-caret-double-left-bold class='text-16px' />
				)}
			</NButton>
		)
	}
})
