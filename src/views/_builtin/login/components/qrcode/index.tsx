import { defineComponent, ref } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { NButton, NSpace } from 'naive-ui'
import { useRouterPush } from '@/composable'

export default defineComponent({
	name: 'QrcodeLogin',
	setup() {
		const qrcodeValue = ref('111')

		const { toLoginModule } = useRouterPush()

		const handleToPwdLogin = () => {
			toLoginModule('pwd-login')
		}

		return () => (
			<NSpace vertical={true} size={18}>
				<QrcodeVue value={qrcodeValue.value} size={240} class='mx-auto' />
				<NButton
					type='primary'
					ghost
					size='large'
					block={true}
					round={true}
					onClick={handleToPwdLogin}
				>
					返回
				</NButton>
			</NSpace>
		)
	}
})
