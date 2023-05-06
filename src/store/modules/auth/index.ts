import { defineStore } from 'pinia'

interface AuthState {
	/** 用户信息 */
	userInfo: {}
	/** 用户token */
	token: string
	/** 登录的加载状态 */
	loginLoading: boolean
}

export const useAuthStore = defineStore('auth-store', {
	state: (): AuthState => ({
		userInfo: {},
		token: '',
		loginLoading: false
	}),
	actions: {
		login(userName: string, password: string) {
			console.log('userName', userName)
			console.log('password', password)
		}
	}
})
