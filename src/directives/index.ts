import type { App } from 'vue'
import setupAuthDirective from './auth'

/** setup custom vue directives. - [安装自定义的vue指令] */
export function setupDirectives(app: App) {
	setupAuthDirective(app)
}
