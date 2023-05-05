import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import path from 'path'

function getSrcPath() {
	return path.join(path.resolve(process.cwd()), 'src')
}

export default defineConfig(configEnv => {
	const viteEnv = loadEnv(configEnv.mode, process.cwd())
	const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv

	const srcPath = getSrcPath()
	const localIconPath = `${srcPath}/assets/svg-icon`

	/** 本地svg图标集合名称 */
	const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '')
	return {
		plugins: [
			vue(),
			vueJsx(),
			UnoCSS(),
			Icons({
				compiler: 'vue3',
				customCollections: {
					[collectionName]: FileSystemIconLoader(localIconPath, svg =>
						svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
					)
				},
				scale: 1,
				defaultClass: 'inline-block'
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
