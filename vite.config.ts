import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'
import path from 'path'

// https://vitejs.dev/config/
const baseConfig: UserConfig = {
	plugins: [vue(), qiankun('viteapp')],
	server: {
		fs: {
			allow: [path.join(process.cwd(), '../../')],
		},
	},
}
export default ({ mode }: any) => {
	baseConfig.base = 'http://127.0.0.1:7101/'
	if (mode === 'development') {
		baseConfig.base = '/'
	}
	return baseConfig
}
