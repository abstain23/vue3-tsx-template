import { defineComponent } from 'vue'

import ExceptionBase from '@/components/common/ExceptionBase'

export default defineComponent({
	name: '500-page',
	setup() {
		return () => <ExceptionBase type='500' />
	}
})
