import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

import path from 'path'

function getSrcPath() {
	return `${path.resolve(process.cwd())}/src`
}

export default defineConfig(configEnv => {
	const viteEnv = loadEnv(configEnv.mode, process.cwd())
	const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv

	const srcPath = getSrcPath()
	const localIconPath = `${srcPath}/assets/svg-icon`

	/** 本地svg图标集合名称 */
	const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '')
	console.log('collectionName', collectionName)
	console.log('VITE_ICON_PREFIX', VITE_ICON_PREFIX)
	return {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "./src/styles/scss/global.scss" as *;`
				}
			}
		},
		plugins: [
			vue(),
			vueJsx(),
			UnoCSS(),
			Icons({
				compiler: 'vue3',
				customCollections: {
					[collectionName]: FileSystemIconLoader(localIconPath, svg => {
						return svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
					})
				},
				scale: 1,
				defaultClass: 'inline-block'
			}),
			Components({
				include: ['/.vue$/', /\.tsx$/],
				dts: 'src/typings/components.d.ts',
				resolvers: [
					IconsResolver({ customCollections: [collectionName], componentPrefix: VITE_ICON_PREFIX })
				]
			}),
			createSvgIconsPlugin({
				iconDirs: [localIconPath],
				symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
				inject: 'body-last',
				customDomId: '__SVG_ICON_LOCAL__'
			})
		],
		resolve: {
			alias: {
				'@': srcPath
			}
		},
		server: {
			host: '0.0.0.0'
		}
	}
})
