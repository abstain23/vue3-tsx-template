import { NAvatar, NEllipsis, NList, NListItem, NScrollbar, NTag, NThing, NButton } from 'naive-ui'
import { defineComponent, type PropType } from 'vue'

import { SvgIcon } from '@/components'

export default defineComponent({
	name: 'MessageList',
	props: {
		list: {
			type: Array as PropType<App.MessageList[]>,
			default: () => []
		}
	},
	emits: {
		read: (_index: number) => true
	},
	setup(props, { emit }) {
		function handleRead(index: number) {
			emit('read', index)
		}

		return (
			<NScrollbar class='max-h-360px'>
				<NList>
					{props.list?.map((item, index) => {
						return (
							<div onClick={() => handleRead(index)}>
								<NListItem key={item.id} class='hover:bg-#f6f6f6 dark:hover:bg-dark cursor-pointer'>
									<NThing class={`px-15px ${item.isRead ? 'opacity-30' : ''}`}>
										{{
											avatar: () =>
												item.avatar ? (
													<NAvatar src={item.avatar} />
												) : (
													<SvgIcon
														class='text-34px text-primary'
														icon={item.icon}
														localIcon={item.svgIcon}
													/>
												),
											header: () => (
												<NEllipsis lineClamp={1}>
													{item.title}
													{{
														tooltip: () => item.title
													}}
												</NEllipsis>
											),
											'header-extra': () =>
												item.tagTitle && (
													<NTag {...item.tagProps} size='small'>
														{item.tagTitle}
													</NTag>
												),
											description: () => (
												<>
													{item.description && (
														<NEllipsis lineClamp={2}>{item.description}</NEllipsis>
													)}
													{item.date}
												</>
											)
										}}
									</NThing>
									<div></div>
								</NListItem>
							</div>
						)
					})}
				</NList>
			</NScrollbar>
		)
	}
})
