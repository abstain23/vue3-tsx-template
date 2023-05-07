import { NList, NListItem, NScrollbar, NThing, NAvatar, NEllipsis, NTag } from 'naive-ui'
import { FunctionalComponent } from 'vue'
import { SvgIcon } from '@/components'

interface Props {
	list?: App.MessageList[]
}

type Emits = {
	read: (val: number) => void
}

const MessageList: FunctionalComponent<Props, Emits> = (props, { emit }) => {
	function handleRead(index: number) {
		emit('read', index)
	}

	return (
		<NScrollbar class='max-h-360px'>
			<NList>
				{props.list?.map((item, index) => {
					return (
						<NListItem
							key={item.id}
							class='hover:bg-#f6f6f6 dark:hover:bg-dark cursor-pointer'
							onClick={() => handleRead(index)}
						>
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
											{item.description && <NEllipsis lineClamp={2}>{item.description}</NEllipsis>}
											{item.date}
										</>
									)
								}}
							</NThing>
							<div></div>
						</NListItem>
					)
				})}
			</NList>
		</NScrollbar>
	)
}

export default MessageList
