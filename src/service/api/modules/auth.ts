import { request } from '../../request'

export const apiRefreshToken = (refreshToken: string) => {
	return request.post<{ data: string }>('/reX', {
		refreshToken
	})
}
