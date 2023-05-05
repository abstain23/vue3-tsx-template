import { defineComponent } from 'vue'
import { GlobalContent } from '../common'

export default defineComponent({
	name: 'BlankLayout',
	setup() {
		console.log('cccc => BlankLayout')
		return () => <GlobalContent showPadding={false} />
	}
})
