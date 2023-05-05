import ExceptionBase from '@/components/common/ExceptionBase'
import { defineComponent } from 'vue'

export default defineComponent({
	name: '404',
	setup() {
		return () => <ExceptionBase type='404' />
	}
})
