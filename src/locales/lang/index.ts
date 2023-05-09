import en from './en'
import zhCN from './zh-cn'

const locales = {
	'zh-CN': zhCN,
	en
}

export type LocaleKey = keyof typeof locales

export default locales
