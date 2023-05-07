import './index.scss'

import { defineComponent } from 'vue'

import { useAppStore, useThemeStore } from '@/store'
import { useBasicLayout } from '@/composable'

import AdminLayout from '../common/admin-layout'

export default defineComponent({
	name: 'BasicLayout',
	setup() {
		const app = useAppStore()
		const theme = useThemeStore()

		const { mode, headerProps, sideVisible, sideWidth, sideCollapsedWidth } = useBasicLayout()
		return () => <AdminLayout mode={mode.value}></AdminLayout>
	}
})
