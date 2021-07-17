import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
// import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/helper'

export type QiankunProps = {
	container?: HTMLElement
	[x: string]: any
}

export type QiankunLifeCycle = {
	bootstrap: () => void | Promise<void>
	mount: (props: QiankunProps) => void | Promise<void>
	unmount: (props: QiankunProps) => void | Promise<void>
}

export type QiankunWindow = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	__POWERED_BY_QIANKUN__?: boolean
	[x: string]: any
}
//@ts-ignore
export const qiankunWindow: QiankunWindow = window.proxy || window

export const renderWithQiankun = (qiankunLifeCycle: QiankunLifeCycle) => {
	// 函数只有一次执行机会，需要把生命周期赋值给全局 函数只有一次执行机会，需要把生命周期赋值给全局
	if (qiankunWindow?.__POWERED_BY_QIANKUN__) {
		//@ts-ignore
		if (!window.moudleQiankunAppLifeCycles) {
			//@ts-ignore
			window.moudleQiankunAppLifeCycles = {}
		}
		if (qiankunWindow.qiankunName) {
			//@ts-ignore
			window.moudleQiankunAppLifeCycles[qiankunWindow.qiankunName] =
				qiankunLifeCycle
		}
	}
}

export default renderWithQiankun

// let router = null;
let instance: any = null
// let history = null;

function render(props: any = {}) {
	const { container } = props
	// history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue3' : '/');
	// router = createRouter({
	//   history,
	//   routes,
	// });
	instance = createApp(App)
	// instance.use(router);
	// instance.use(store);
	instance.mount(container ? container.querySelector('#app') : '#app')
}

renderWithQiankun({
	mount(props: any) {
		console.log('mount')

		// storeTest(props)
		render(props)
		// instance.config.globalProperties.$onGlobalStateChange =
		// 	props.onGlobalStateChange
		// instance.config.globalProperties.$setGlobalState = props.setGlobalState
	},
	bootstrap() {
		console.log('%c ', 'color: green;', 'vue3.0 app bootstraped')
	},
	unmount(props: any) {
		console.log('unmount')
		const { container } = props
		// const mountRoot = container?.querySelector('#root')
		// ReactDOM.unmountComponentAtNode(
		// 	mountRoot || document.querySelector('#root'),
		// )
		instance.unmount()
		instance._container.innerHTML = ''
		instance = null
		// router = null
		// history.destroy()
	},
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
	render()
}

qiankunWindow.customxxx = 'ssss'
