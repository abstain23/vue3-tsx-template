import { defineComponent } from 'vue'
import { GlobalContent } from '../common'

export default defineComponent({
	name: 'BlankLayout',
	setup() {
		return () => <GlobalContent showPadding={false} />
	}
})
