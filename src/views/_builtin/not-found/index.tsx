import ExceptionBase from '@/components/common/ExceptionBase'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NotFound',
	setup() {
		return () => <ExceptionBase type='404' />
	}
})
