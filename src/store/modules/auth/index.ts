import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth-store', {
	state: () => ({}),
	actions: {
		login(userName: string, password: string) {
			console.log('userName', userName)
			console.log('password', password)
		}
	}
})
