import { defineComponent } from 'vue'

import ExceptionBase from '@/components/common/ExceptionBase'

export default defineComponent({
	name: '404-page',
	setup() {
		return () => <ExceptionBase type='404' />
	}
})
