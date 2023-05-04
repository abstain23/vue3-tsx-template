import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

import path from 'path'

export default defineConfig({
	plugins: [vue(), vueJsx(), UnoCSS()],
	resolve: {
		alias: {
			'@': path.join(path.resolve(process.cwd()), 'src')
		}
	}
})
