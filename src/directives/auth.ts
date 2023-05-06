import type { App, Directive } from 'vue'

function setBtnDisabled(el: HTMLButtonElement) {
	el.disabled = true
	el.classList.add('n-button--disabled')
}
export default function setupAuthDirective(app: App) {
	// const auth = useAuthStore()

	const authDirective: Directive<HTMLButtonElement, string> = {
		mounted(el: HTMLButtonElement, { value }) {
			const userAuthorities: string[] = []
			if (value.includes('&')) {
				const codes = value.split('&')
				const flag = codes.every(code => userAuthorities.includes(code))
				if (!flag) {
					setBtnDisabled(el)
				}
				return
			}

			if (
				!userAuthorities.find(authority => {
					return authority === value
				})
			) {
				setBtnDisabled(el)
			}
		},
		// 在绑定元素的父组件
		// 及他自己的所有子节点都更新后调用
		updated(el: HTMLButtonElement, { value }) {
			const userAuthorities: string[] = []

			if (Array.isArray(value)) {
				const flag = value.every(code => userAuthorities.includes(code))

				if (!flag) {
					setBtnDisabled(el)
				}
				return
			}

			if (
				!userAuthorities.find(authority => {
					return authority === value
				})
			) {
				setBtnDisabled(el)
			}
		}
	}
	app.directive('auth', authDirective)
}
