import { defineComponent } from 'vue'

import themeSettings from '@/settings/theme.json'
import { useAppInfo } from '@/composable'
import { getRgbOfColor, localStg } from '@/utils'

import SystemLogo from './SystemLogo'

export default defineComponent({
	name: 'AppLoading',
	setup() {
		const { title } = useAppInfo()

		const loadingClasses = [
			'left-0 top-0',
			'left-0 bottom-0 animate-delay-500',
			'right-0 top-0 animate-delay-1000',
			'right-0 bottom-0 animate-delay-1500'
		]

		function addThemeColorCssVars() {
			const defaultColor = themeSettings.themeColor
			const themeColor = localStg.get('themeColor') || defaultColor

			const { r, g, b } = getRgbOfColor(themeColor)

			const cssVars = `--primary-color: ${r},${g},${b}`
			document.documentElement.style.cssText = cssVars
		}

		addThemeColorCssVars()
		return () => (
			<div class='fixed-center flex-col'>
				<SystemLogo class='text-128px text-primary' />
				<div class='w-56px h-56px my-36px'>
					<div class='relative h-full animate-spin'>
						{loadingClasses.map((item, index) => (
							<div
								key={index}
								class={`absolute w-16px h-16px bg-primary rounded-8px animate-pulse ${item}`}
							></div>
						))}
					</div>
				</div>
				<h2 class='text-28px font-500 text-#646464'>{title}</h2>
			</div>
		)
	}
})
