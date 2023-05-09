import { defineComponent } from 'vue'
import { NDivider, NSpace } from 'naive-ui'

import { useThemeStore } from '@/store'

import LayoutCard from './LayoutCard'

export default defineComponent({
	name: 'LayoutMode',
	setup() {
		const theme = useThemeStore()
		return () => (
			<>
				<NDivider titlePlacement='center'>布局模式</NDivider>
				<NSpace justify='space-around' wrap size={24} class='px-12px'>
					{theme.layout.modeList.map(item => (
						<div key={item.value} onClick={() => theme.setLayoutMode(item.value)}>
							<LayoutCard
								mode={item.value}
								label={item.label}
								checked={item.value === theme.layout.mode}
							>
								{item.value === 'vertical' && (
									<>
										<div class='w-18px h-full bg-primary:50 rd-4px'></div>
										<div class='flex-1 flex-col gap-6px'>
											<div class='h-16px bg-primary rd-4px'></div>
											<div class='flex-1 bg-primary:25 rd-4px'></div>
										</div>
									</>
								)}
								{item.value === 'vertical-mix' && (
									<>
										<div class='w-8px h-full bg-primary:50 rd-4px'></div>
										<div class='w-16px h-full bg-primary:50 rd-4px'></div>
										<div class='flex-1 flex-col gap-6px'>
											<div class='h-16px bg-primary rd-4px'></div>
											<div class='flex-1 bg-primary:25 rd-4px'></div>
										</div>
									</>
								)}
								{item.value === 'horizontal' && (
									<>
										<div class='h-16px bg-primary rd-4px'></div>
										<div class='flex-1 flex gap-6px'>
											<div class='flex-1 bg-primary:25 rd-4px'></div>
										</div>
									</>
								)}
								{item.value === 'horizontal-mix' && (
									<>
										<div class='h-16px bg-primary rd-4px'></div>
										<div class='flex-1 flex gap-6px'>
											<div class='w-18px bg-primary:50 rd-4px'></div>
											<div class='flex-1 bg-primary:25 rd-4px'></div>
										</div>
									</>
								)}
							</LayoutCard>
						</div>
					))}
				</NSpace>
			</>
		)
	}
})
