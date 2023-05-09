import { useTitle } from '@vueuse/core'

import { createPermissionGuard } from './permission'

import type { Router } from 'vue-router'

export function createRouterGuard(router: Router) {
	router.beforeEach(async (to, from, next) => {
		// 开始 loadingBar
		window.$loadingBar?.start()
		// 页面跳转权限处理
		await createPermissionGuard(to, from, next)
	})
	router.afterEach(to => {
		// 设置document title
		useTitle(to.meta.title)
		// 结束 loadingBar
		window.$loadingBar?.finish()
	})
}
