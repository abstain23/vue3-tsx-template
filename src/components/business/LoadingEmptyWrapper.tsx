import { computed, defineComponent, nextTick, onUnmounted, watch } from 'vue'
import { NSpin } from 'naive-ui'

import { useBoolean } from '@/hooks'
import { NETWORK_ERROR_MSG } from '@/config'

import type { ComponentObjectPropsOptions, PropType } from 'vue'
interface Props {
	/** 是否加载 */
	loading: boolean
	/** 是否为空 */
	empty?: boolean
	/** 加载图标的大小 */
	loadingSize?: 'small' | 'medium' | 'large'
	/** 中间占位符的class */
	placeholderClass?: string
	/** 空数据描述文本 */
	emptyDesc?: string
	/** 图标的class */
	iconClass?: string
	/** 描述文本的class */
	descClass?: string
	/** 显示网络异常的重试点击按钮 */
	showNetworkReload?: boolean
}

export default defineComponent({
	name: 'LoadingEmptyWrapper',
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		empty: {
			type: Boolean,
			default: false
		},
		loadingSize: {
			type: String as PropType<Props['loadingSize']>,
			default: 'medium'
		},
		placeholderClass: {
			type: String,
			default: 'bg-white dark:bg-dark transition-background-color duration-300 ease-in-out'
		},
		emptyDesc: {
			tupe: String,
			default: '暂无数据'
		},
		iconClass: {
			type: String,
			default: 'text-320px text-primary'
		},
		descClass: {
			type: String,
			default: 'text-16px text-#666'
		},
		showNetworkReload: {
			type: Boolean,
			default: false
		}
	} as ComponentObjectPropsOptions<Props>,
	setup(props, { slots }) {
		// 网络状态
		const { bool: network, setBool: setNetwork } = useBoolean(window.navigator.onLine)
		const { bool: reloadFlag, setBool: setReload } = useBoolean(true)

		// 数据是否为空
		const isEmpty = computed(() => props.empty && !props.loading && network.value)

		const showPlaceholder = computed(() => props.loading || isEmpty.value || !network.value)

		const networkErrorDesc = computed(() =>
			props.showNetworkReload ? `${NETWORK_ERROR_MSG}, 点击重试` : NETWORK_ERROR_MSG
		)

		function handleReload() {
			if (!props.showNetworkReload) return
			setReload(false)
			nextTick(() => {
				setReload(true)
			})
		}

		const stopHandle = watch(
			() => props.loading,
			newValue => {
				// 结束加载判断一下网络状态
				if (!newValue) {
					setNetwork(window.navigator.onLine)
				}
			}
		)

		onUnmounted(() => {
			stopHandle()
		})
		return () =>
			reloadFlag.value ? (
				<div class='relative'>
					{slots.default?.()}
					<div
						v-show={showPlaceholder.value}
						class={`absolute-lt w-full h-full ${props.placeholderClass}`}
					>
						<div v-show={props.loading} class='absolute-center'>
							<NSpin show={true} size={props.loadingSize!} />
						</div>
						<div v-show={isEmpty.value} class='absolute-center'>
							<div class='relative'>
								<icon-local-empty-data class={props.iconClass} />
								<p class={`absolute-lb w-full text-center ${props.descClass}`}>{props.emptyDesc}</p>
							</div>
						</div>
						<div v-show={!network} class='absolute-center'>
							<div
								class={`relative ${props.showNetworkReload ? 'cursor-pointer' : ''}`}
								onClick={handleReload}
							>
								<icon-local-network-error class={props.iconClass} />
								<p class={`absolute-lb w-full text-center ${props.descClass}`}>
									{networkErrorDesc.value}
								</p>
							</div>
						</div>
					</div>
				</div>
			) : null
	}
})
