import { NForm } from 'naive-ui'
import { defineComponent, reactive, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'

import { formRules } from '@/utils'
import { useAuthStore } from '@/store'

export default defineComponent({
	name: 'PwdLLogin',
	setup() {
		const auth = useAuthStore()

		return () => <NForm></NForm>
	}
})
