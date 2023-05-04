import {
	NDialogProvider,
	NLoadingBarProvider,
	NMessageProvider,
	NNotificationProvider,
	useDialog,
	useLoadingBar,
	useMessage,
	useNotification
} from 'naive-ui'
import { defineComponent, h } from 'vue'

export default defineComponent({
	name: 'NaiveProvider',
	setup() {
		return () => (
			<NLoadingBarProvider>
				<NDialogProvider>
					<NNotificationProvider>
						<NMessageProvider>
							<slot></slot>
							<NaiveProviderContent />
						</NMessageProvider>
					</NNotificationProvider>
				</NDialogProvider>
			</NLoadingBarProvider>
		)
	}
})

function registerNaiveTools() {
	window.$loadingBar = useLoadingBar()
	window.$dialog = useDialog()
	window.$message = useMessage()
	window.$notification = useNotification()
}

const NaiveProviderContent = defineComponent({
	name: 'NaiveProviderContent',
	setup() {
		registerNaiveTools()
	},
	render() {
		return h('div')
	}
})
