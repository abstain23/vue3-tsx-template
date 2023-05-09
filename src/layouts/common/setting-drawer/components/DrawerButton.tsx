import { defineComponent } from 'vue'
import { useAppStore } from '@/store'
import { NButton } from 'naive-ui'

export default defineComponent({
	name: 'DrawerButton',
	setup() {
		const app = useAppStore()
		return () => (
			<NButton
				type='primary'
				class={[
					'fixed top-360px right-14px z-10000 w-42px h-42px !p-0 transition-all duration-300',
					app.settingDrawerVisible ? 'ease-out' : 'ease-in',
					app.settingDrawerVisible ? '!right-330px' : ''
				]}
				onClick={app.toggleMixSideFixed}
			>
				{app.settingDrawerVisible ? (
					<icon-ant-design-close-outlined class='text-24px' />
				) : (
					<icon-ant-design-setting-outlined class='text-24px' />
				)}
			</NButton>
		)
	}
})
