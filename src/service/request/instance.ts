import { REFRESH_TOKEN_CODE } from '@/config'
import {
	handleAxiosError,
	handleBackendError,
	handleResponseError,
	handleServiceResult,
	localStg,
	transformRequestData
} from '@/utils'
import axios from 'axios'
import type { AxiosResponse, AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { handleRefreshToken } from './helper'

export default class CustomAxiosInstance {
	instance: AxiosInstance

	backendConfig: Service.BackendResultConfig

	constructor(
		axiosConfig: AxiosRequestConfig,
		backendConfig: Service.BackendResultConfig = {
			codeKey: 'code',
			dataKey: 'data',
			msgKey: 'message',
			successCode: 200
		}
	) {
		this.backendConfig = backendConfig
		this.instance = axios.create(axiosConfig)
		this.setInterceptor()
	}
	setInterceptor() {
		this.instance.interceptors.request.use(
			async config => {
				const handleConfig = { ...config }
				if (handleConfig.headers) {
					// 数据转换
					const contentType = handleConfig.headers['Content-Type'] as UnionKey.ContentType
					handleConfig.data = await transformRequestData(handleConfig.data, contentType)
					// 设置token
					handleConfig.headers.Authorization = localStg.get('token') || ''
				}
				return handleConfig
			},
			(axiosError: AxiosError) => {
				const error = handleAxiosError(axiosError)
				return handleServiceResult(error, null)
			}
		)
		this.instance.interceptors.response.use(
			(async axiosResponse => {
				const { status } = axiosResponse
				if (status === 200 || status < 300 || status === 304) {
					const backend = axiosResponse.data
					const { codeKey, dataKey, successCode } = this.backendConfig
					// 请求成功
					if (backend[codeKey] === successCode) {
						return handleServiceResult(null, backend[dataKey])
					}

					// token失效, 刷新token
					if (REFRESH_TOKEN_CODE.includes(backend[codeKey])) {
						const config = await handleRefreshToken(axiosResponse.config)
						if (config) {
							return this.instance.request(config)
						}
					}

					const error = handleBackendError(backend, this.backendConfig)
					return handleServiceResult(error, null)
				}
				const error = handleResponseError(axiosResponse)
				return handleServiceResult(error, null)
			}) as (response: AxiosResponse<any, any>) => Promise<AxiosResponse<any, any>>,
			(axiosError: AxiosError) => {
				const error = handleAxiosError(axiosError)
				return handleServiceResult(error, null)
			}
		)
	}
}
