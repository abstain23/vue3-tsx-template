import { NCheckbox, NForm, NFormItem, NInput, NSpace, NButton } from 'naive-ui'
import { defineComponent, reactive, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'

import { formRules } from '@/utils'
import { useAuthStore } from '@/store'
import { useRouterPush } from '@/composable'

export default defineComponent({
	name: 'PwdLLogin',
	setup() {
		const auth = useAuthStore()
		const { toLoginModule } = useRouterPush()

		const formRef = ref<HTMLElement & FormInst>()

		const model = reactive({
			username: 'admin',
			password: 'admin123'
		})

		const rules: FormRules = {
			password: formRules.pwd
		}

		const rememberMe = ref(false)

		async function handleSubmit() {
			await formRef.value?.validate()

			const { username, password } = model

			auth.login(username, password)
		}

		const handleToQrcodeLogin = () => {
			toLoginModule('qrcode')
		}

		return () => (
			<NForm ref={formRef} model={model} rules={rules} size='large' showLabel={false}>
				<NFormItem path='username'>
					<NInput v-model:value={model.username} placeholder='请输入用户名' />
				</NFormItem>
				<NFormItem path='password'>
					<NInput
						v-model:value={model.password}
						type='password'
						showPasswordOn='click'
						placeholder='请输入密码'
					/>
				</NFormItem>
				<NSpace vertical={true} size={24}>
					<div class='flex-y-center justify-between'>
						<NCheckbox v-model:checked={rememberMe.value}>记住我</NCheckbox>
						{/* <NButton text={true} onClick="toLoginModule('reset-pwd')">忘记密码？</NButton> */}
					</div>
					<NButton
						type='primary'
						size='large'
						block={true}
						round={true}
						loading={auth.loginLoading}
						onClick={handleSubmit}
					>
						确定
					</NButton>
					<div class='flex-y-center justify-between'>
						<NButton class='flex-1' block={true} onClick={handleToQrcodeLogin}>
							扫码登录
						</NButton>
						<div class='w-12px'></div>
						<NButton class='flex-1' block={true}>
							注册
						</NButton>
					</div>
				</NSpace>
			</NForm>
		)
	}
})
