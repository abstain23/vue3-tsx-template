import { defineStore } from 'pinia'
import { nextTick, unref } from 'vue'

import { router } from '@/router'
import { useRouterPush } from '@/composable'
import { localStg } from '@/utils'

import { clearAuthStorage, getToken, getUserInfo } from './helper'
import { useTabStore } from '../tab'
import { useRouteStore } from '../route'

interface AuthState {
	/** 用户信息 */
	userInfo: Auth.UserInfo
	/** 用户token */
	token: string
	/** 登录的加载状态 */
	loginLoading: boolean
}

export const useAuthStore = defineStore('auth-store', {
	state: (): AuthState => ({
		userInfo: getUserInfo(),
		token: getToken(),
		loginLoading: false
	}),
	getters: {
		/** 是否登录 */
		isLogin(state) {
			return Boolean(state.token)
		}
	},
	actions: {
		/** 重置auth状态 */
		resetAuthStore() {
			const { toLogin } = useRouterPush(false)
			const { resetTabStore } = useTabStore()
			const { resetRouteStore } = useRouteStore()
			const route = unref(router.currentRoute)

			clearAuthStorage()
			this.$reset()

			if (route.meta.requiresAuth) {
				toLogin()
			}

			nextTick(() => {
				resetTabStore()
				resetRouteStore()
			})
		},
		async handleActionAfterLogin(data: ApiAuth.Token) {
			const route = useRouteStore()
			const { toLoginRedirect } = useRouterPush(false)

			const loginSuccess = await this.loginByToken(data)

			if (loginSuccess) {
				await route.initAuthRoute()

				// 跳转登录后的地址
				toLoginRedirect()

				// 登录成功弹出欢迎提示
				if (route.isInitAuthRoute) {
					window.$notification?.success({
						title: '登录成功!',
						content: `欢迎回来，${this.userInfo.userName}!`,
						duration: 3000
					})
				}

				return
			}
			// 不成功则重置状态
			this.resetAuthStore()
		},
		async loginByToken(backendToken: ApiAuth.Token) {
			let successFlag = false

			// 先把token存储到缓存中(后面接口的请求头需要token)
			const { token, refreshToken } = backendToken
			localStg.set('token', token)
			localStg.set('refreshToken', refreshToken)

			// 获取用户信息
			const { data } = await new Promise<{ data: Auth.UserInfo }>(r => {
				setTimeout(() => {
					r({
						data: {
							userId: '111',
							userName: 'cc',
							userRole: 'admin'
						}
					})
				}, 1000)
			})
			if (data) {
				// 成功后把用户信息存储到缓存中
				localStg.set('userInfo', data)

				// 更新状态
				this.userInfo = data
				this.token = token

				successFlag = true
			}

			return successFlag
		},
		/**
		 * 登录
		 * @param userName
		 * @param password
		 */
		async login(userName: string, password: string) {
			console.log('userName', userName)
			console.log('password', password)
			this.loginLoading = true
			const { data } = await new Promise<{ data: ApiAuth.Token }>(r => {
				setTimeout(() => {
					r({
						data: {
							token: 'token11',
							refreshToken: 'refreshToken11'
						}
					})
				}, 1000)
			})
			if (data) {
				await this.handleActionAfterLogin(data)
			}
			this.loginLoading = false
		}
	}
})
