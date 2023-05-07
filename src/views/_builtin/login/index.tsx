import { NCard, NGradientText } from 'naive-ui'
import { computed, defineComponent, h, Transition } from 'vue'

import { DarkModeSwitch, SystemLogo } from '@/components'
import { useAppInfo } from '@/composable'
import { useThemeStore } from '@/store'
import { getColorPalette, mixColor } from '@/utils'

import { LoginBg, PwdLogin, QrcodeLogin } from './components'

import type { Component, PropType } from 'vue'
type LoginModule = {
	key: UnionKey.LoginModule
	label: string
	component: Component
}

export default defineComponent({
	name: 'LoginPage',
	props: {
		module: {
			type: String as PropType<UnionKey.LoginModule>,
			default: 'pwd-login'
		}
	},
	setup(props) {
		const theme = useThemeStore()

		const { title } = useAppInfo()

		const modules: LoginModule[] = [
			{ key: 'pwd-login', label: '账密登录', component: PwdLogin },
			{ key: 'qrcode', label: '扫码登录', component: QrcodeLogin }
		]

		const activeModule = computed(() => {
			const active: LoginModule = { ...modules[0] }
			const findItem = modules.find(item => item.key === props.module)
			if (findItem) {
				Object.assign(active, findItem)
			}
			return active
		})
		const bgThemeColor = computed(() =>
			theme.darkMode ? getColorPalette(theme.themeColor, 7) : theme.themeColor
		)

		const bgColor = computed(() => {
			const COLOR_WHITE = '#ffffff'
			const ratio = theme.darkMode ? 0.5 : 0.2
			return mixColor(COLOR_WHITE, theme.themeColor, ratio)
		})

		return () => (
			<div class='relative flex-center wh-full' style={{ backgroundColor: bgColor.value }}>
				<DarkModeSwitch
					dark={theme.darkMode}
					onUpdate:dark={theme.setDarkMode}
					class='absolute left-48px top-24px z-3 text-20px'
				/>
				<NCard bordered={false} size='large' class='z-4 !w-auto rounded-20px shadow-sm'>
					<div class='w-300px sm:w-360px'>
						<header class='flex-y-center justify-between'>
							<SystemLogo class='text-64px text-primary' />
							<NGradientText type='primary' size={28}>
								{title}
							</NGradientText>
						</header>
						<main class='pt-24px'>
							<h3 class='text-18px text-primary font-medium'>{activeModule.value.label}</h3>
							<div class='pt-24px'>
								<Transition name='fade-slide' mode='out-in' appear>
									{h(activeModule.value.component)}
								</Transition>
							</div>
						</main>
					</div>
				</NCard>
				<LoginBg themeColor={bgThemeColor.value} />
			</div>
		)
	}
})
