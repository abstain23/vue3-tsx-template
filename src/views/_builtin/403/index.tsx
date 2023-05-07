import { defineComponent } from 'vue'

import { ExceptionBase } from '@/components'

export default defineComponent({
	name: '403-page',
	setup() {
		return () => <ExceptionBase type='403' />
	}
})
