import { computed, defineComponent, ref } from 'vue'
import { NBadge, NPopover, NTabPane, NTabs } from 'naive-ui'

import LoadingEmptyWrapper from '@/components/business/LoadingEmptyWrapper'
import { useThemeStore } from '@/store'
import { useBoolean } from '@/hooks'
import { useBasicLayout } from '@/composable'
import { HoverContainer } from '@/components'

import MessageList from './MessageList'

export default defineComponent({
	name: 'SystemMessage',
	setup() {
		const theme = useThemeStore()
		const { isMobile } = useBasicLayout()
		const { bool: loading, setBool: setLoading } = useBoolean()

		const currentTab = ref(0)

		const tabData = ref<App.MessageTab[]>([
			{
				key: 1,
				name: '通知',
				badgeProps: { type: 'warning' },
				list: [
					{ id: 1, icon: 'ri:message-3-line', title: '你收到了5条新消息', date: '2022-06-17' },
					{
						id: 4,
						icon: 'ri:message-3-line',
						title: 'Soybean Admin 1.0.0 版本正在筹备中',
						date: '2022-06-17'
					},
					{
						id: 2,
						icon: 'ri:message-3-line',
						title: 'Soybean Admin 0.9.6 版本发布了',
						date: '2022-06-16'
					},
					{
						id: 3,
						icon: 'ri:message-3-line',
						title: 'Soybean Admin 0.9.5 版本发布了',
						date: '2022-06-07'
					},
					{
						id: 5,
						icon: 'ri:message-3-line',
						title:
							'测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题',
						date: '2022-06-17'
					}
				]
			},
			{
				key: 2,
				name: '消息',
				badgeProps: { type: 'error' },
				list: [
					{
						id: 1,
						title: '项目动态',
						svgIcon: 'avatar',
						description: 'Soybean 刚才把工作台页面随便写了一些，凑合能看了！',
						date: '2021-11-07 22:45:32'
					},
					{
						id: 2,
						title: '项目动态',
						svgIcon: 'avatar',
						description: 'Soybean 正在忙于为soybean-admin写项目说明文档！',
						date: '2021-11-03 20:33:31'
					},
					{
						id: 3,
						title: '项目动态',
						svgIcon: 'avatar',
						description: 'Soybean 准备为soybean-admin 1.0的发布做充分的准备工作！',
						date: '2021-10-31 22:43:12'
					},
					{
						id: 4,
						title: '项目动态',
						svgIcon: 'avatar',
						description: '@yanbowe 向soybean-admin提交了一个bug，多标签栏不会自适应。',
						date: '2021-10-27 10:24:54'
					},
					{
						id: 5,
						title: '项目动态',
						svgIcon: 'avatar',
						description: 'Soybean 在2021年5月28日创建了开源项目soybean-admin！',
						date: '2021-05-28 22:22:22'
					}
				]
			},
			{
				key: 3,
				name: '待办',
				badgeProps: { type: 'info' },
				list: [
					{
						id: 1,
						icon: 'ri:calendar-todo-line',
						title: '缓存主题配置',
						description: '任务正在计划中',
						date: '2022-06-17',
						tagTitle: '未开始',
						tagProps: { type: 'default' }
					},
					{
						id: 2,
						icon: 'ri:calendar-todo-line',
						title: '添加锁屏组件、全局Iframe组件',
						description: '任务正在计划中',
						date: '2022-06-17',
						tagTitle: '未开始',
						tagProps: { type: 'default' }
					},
					{
						id: 3,
						icon: 'ri:calendar-todo-line',
						title: '示例页面完善',
						description: '任务正在计划中',
						date: '2022-06-17',
						tagTitle: '未开始',
						tagProps: { type: 'default' }
					},
					{
						id: 4,
						icon: 'ri:calendar-todo-line',
						title: '表单、表格示例',
						description: '任务正在计划中',
						date: '2022-06-17',
						tagTitle: '未开始',
						tagProps: { type: 'default' }
					},
					{
						id: 5,
						icon: 'ri:calendar-todo-line',
						title: '性能优化(优化递归函数)',
						description: '任务正在计划中',
						date: '2022-06-17',
						tagTitle: '未开始',
						tagProps: { type: 'default' }
					},
					{
						id: 6,
						icon: 'ri:calendar-todo-line',
						title: '精简版(新分支thin)',
						description: '任务正在计划中',
						date: '2022-06-17',
						tagTitle: '未开始',
						tagProps: { type: 'default' }
					}
				]
			}
		])

		const count = computed(() => {
			return tabData.value.reduce((acc, cur) => {
				return acc + cur.list.filter(item => !item.isRead).length
			}, 0)
		})

		const showAction = computed(() => tabData.value[currentTab.value].list.length > 0)

		function handleRead(index: number) {
			tabData.value[currentTab.value].list[index].isRead = true
		}

		function handleAllRead() {
			tabData.value[currentTab.value].list.forEach(item => Object.assign(item, { isRead: true }))
		}

		function handleClear() {
			tabData.value[currentTab.value].list = []
		}

		function handleLoadMore() {
			const { list } = tabData.value[currentTab.value]
			setLoading(true)
			setTimeout(() => {
				list.push(...tabData.value[currentTab.value].list)
				setLoading(false)
			}, 1000)
		}
		return () => (
			<NPopover class='!p-0' trigger='click' placement='bottom'>
				{{
					trigger: () => (
						<HoverContainer
							tooltipContent='消息通知'
							inverted={theme.header.inverted}
							class='relative w-40px h-full'
						>
							{/* 注意 冒号要改成短横线- */}
							<icon-clarity-notification-line class='text-18px' />
							{/* <SvgIcon icon='clarity:notification-line' class='text-18px' /> */}
							<NBadge
								value={count.value}
								max={99}
								class={`absolute top-10px ${count.value < 10 ? '-right-2px' : '-right-10px'}`}
							></NBadge>
						</HoverContainer>
					),
					default: () => (
						<div>
							<NTabs
								v-model:value={currentTab.value}
								class={isMobile.value ? 'w-276px' : 'w-360px'}
								type='line'
								justifyContent='space-evenly'
							>
								{tabData.value.map((item, index) => (
									<NTabPane key={item.key} name={index}>
										{{
											tab: () => (
												<div
													class={`flex-x-center items-center ${
														isMobile.value ? 'w-92px' : 'w-120px'
													}`}
												>
													<span class='mr-5px'>{item.name}</span>
													<NBadge
														{...item.badgeProps}
														value={item.list.filter(message => !message.isRead).length}
														max={99}
														showZero
													/>
												</div>
											),
											default: () => (
												<LoadingEmptyWrapper
													class='h-360px'
													loading={loading.value}
													empty={item.list.length === 0}
													placeholderClass='"bg-$n-color transition-background-color duration-300 ease-in-out'
												>
													<div>
														<MessageList list={item.list} onRead={handleRead} />
													</div>
												</LoadingEmptyWrapper>
											)
										}}
									</NTabPane>
								))}
							</NTabs>
							{showAction.value && (
								<div class='flex border-t border-$n-divider-color cursor-pointer'>
									<div class='flex-1 text-center py-10px' onClick={handleClear}>
										清空
									</div>
									<div
										class='flex-1 text-center py-10px border-l border-$n-divider-color'
										onClick={handleAllRead}
									>
										全部已读
									</div>
									<div
										class='flex-1 text-center py-10px border-l border-$n-divider-color'
										onClick={handleLoadMore}
									>
										查看更多
									</div>
								</div>
							)}
						</div>
					)
				}}
			</NPopover>
		)
	}
})
