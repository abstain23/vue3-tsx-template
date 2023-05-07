import { defineComponent } from 'vue'
import { AdminLayout } from '@soybeanjs/vue-materials'
import { useAppStore, useThemeStore } from '@/store'
import { useBasicLayout } from '@/composable'

export default defineComponent({
	name: 'AdminLayout',
	setup() {
		return () => <AdminLayout></AdminLayout>
	}
})
