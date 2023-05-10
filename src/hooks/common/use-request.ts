import { computed, ref, type Ref } from 'vue'
import { debounce, delay, throttle } from 'lodash-es'

import useBoolean from './use-boolean'
import useLoading from './use-loading'

export interface IUseRequestOption<T = any> {
	// 是否开启防抖 时长
	debounce?: boolean
	debounceInterval?: number
	// 是否开启节流 时长
	throttle?: boolean
	throttleInterval?: number
	// 是否轮询
	polling?: boolean
	pollingInterval?: number
	// 是否自动调用
	autoRun?: boolean
	// 调用完毕可执行的函数
	onFinish?: (data: T) => void
}

const defaultOption: IUseRequestOption = {
	// 是否开启防抖 时长
	debounce: false,
	debounceInterval: 1000,
	// 是否开启节流 时长
	throttle: false,
	throttleInterval: 1000,
	// 是否轮询
	polling: false,
	pollingInterval: 5000,
	// 是否自动调用
	autoRun: true,
	// 调用完毕可执行的函数
	onFinish: undefined
}

export default function useRequest<ParamsType, DataType>(
	api: (p: ParamsType) => Promise<Service.RequestResult<DataType>>,
	params: ParamsType,
	opt: IUseRequestOption<DataType>
) {
	const option = Object.assign({}, defaultOption, opt)
	const { loading, startLoading, endLoading } = useLoading()
	const { bool: network, setBool: setNetwork } = useBoolean(window.navigator.onLine)

	const data = ref<DataType | null>(null) as Ref<DataType | null>
	const error = ref<Service.RequestError | null>(null)

	const run = async () => {
		try {
			startLoading()
			const { data: _data, error: _error } = await api(params)
			error.value = _error
			data.value = _data
			option.onFinish?.(_data)
		} finally {
			endLoading()
			setNetwork(window.navigator.onLine)
		}
	}

	// 轮询
	const polling = async () => {
		try {
			startLoading()
			const { data: _data, error: _error } = await api(params)
			data.value = _data
			error.value = _error
			option.onFinish?.(_data)
			delay(polling, option.pollingInterval as number)
		} finally {
			endLoading()
			setNetwork(window.navigator.onLine)
		}
	}

	option.autoRun && run()
	option.polling && polling()

	const runComputed = computed(() => {
		// 判断是否开启防抖
		if (option.debounce) {
			return {
				run: debounce(run, option.debounceInterval) as () => Promise<void>
			}
		}

		// 判断是否开启节流
		if (option.throttle) {
			return {
				run: throttle(run, option.throttleInterval) as () => Promise<void>
			}
		}

		return { run }
	})

	return {
		data,
		error,
		loading,
		network,
		run: runComputed.value.run
	}
}
