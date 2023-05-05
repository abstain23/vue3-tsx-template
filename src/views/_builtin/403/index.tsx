import ExceptionBase from '@/components/common/ExceptionBase'
import { defineComponent } from 'vue'

export default defineComponent({
	name: '403',
	setup() {
		return () => <ExceptionBase type='403' />
	}
})
