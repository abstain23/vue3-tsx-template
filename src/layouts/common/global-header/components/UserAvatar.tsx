import { defineComponent } from 'vue'
import { NDropdown, type DropdownOption } from 'naive-ui'

import { useAuthStore, useThemeStore } from '@/store'
import { useIconRender } from '@/composable'
import { HoverContainer } from '@/components'

export default defineComponent({
	name: 'UserAvatar',
	setup() {
		const auth = useAuthStore()
		const theme = useThemeStore()
		const { iconRender } = useIconRender()

		const options: DropdownOption[] = [
			{
				label: '用户中心',
				key: 'user-center',
				icon: iconRender({ icon: 'carbon:user-avatar' })
			},
			{
				type: 'divider',
				key: 'divider'
			},
			{
				label: '退出登录',
				key: 'logout',
				icon: iconRender({ icon: 'carbon:logout' })
			}
		]

		type DropdownKey = 'user-center' | 'logout'

		function handleDropdown(optionKey: string) {
			const key = optionKey as DropdownKey
			if (key === 'logout') {
				window.$dialog?.info({
					title: '提示',
					content: '您确定要退出登录吗？',
					positiveText: '确定',
					negativeText: '取消',
					onPositiveClick: () => {
						auth.resetAuthStore()
					}
				})
			}
		}
		return () => (
			<NDropdown options={options} onSelect={handleDropdown}>
				<HoverContainer class='px-12px' inverted={theme.header.inverted}>
					<icon-local-avatar class='text-32px' />
					<span class='pl-8px text-16px font-medium'>{auth.userInfo.userName}</span>
				</HoverContainer>
			</NDropdown>
		)
	}
})
