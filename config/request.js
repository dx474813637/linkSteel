import {tim_online_login} from '@/utils/tims_login.js'
import store from '@/store'


const sys = uni.getSystemInfoSync();
const duration = sys.osName == 'ios' ? 2000 : 3000 

export default function(vm) {
	const http = uni.$u.http
	// import md5Libs from "@/utils/md5";
	const getTokenStorage = () => {
		let token = ''
		try {
			token = uni.getStorageSync('userid')
		} catch (e) {
			//TODO handle the exception
		}
		return token
	}
	let md5flag = false
	let requests = [] // 存储无token的请求队列
	let isRefreshing = false //正在刷新token
	http.setToken = (obj, md5flag) => {
		http.config.header = {
			...http.config.header,
			...obj
		}
		// http.config.header['userid'] = token
		if(!md5flag) {
			// 不存在md5时保存userid
			uni.setStorageSync('userid', obj.userid) 
		}
		
	}
	function get_xcx_code() {
		return new Promise((resolve, rejected) => {
			uni.login({
				success: function (res){
					resolve(res.code);
				},
				fail: err => {
					md5flag = true
					rejected(err)
				}
			});
		});
	}
	
	async function refreshToken() {
		// token接口获取token值
		try{
			let code = await get_xcx_code();
			console.log('code打印:',code)
			return http.post('login_cancel',{code:code})
		}catch(e){
			return e
		}
		
	}
	// 初始化请求配置
	http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = vm.$store.state.user.configBaseURL; /* 根域名 */
		config.header = {
			...config.header,
			...vm.$store.state.user.configHeader
		}
		return config
	})

	// 请求拦截
	http.interceptors.request.use(async (config) => { // 可使用async await 做异步操作
		// console.log(config)
		const token = getTokenStorage()
		config.header = {
			...config.header,
			// 'shareid': vm.$store.state.user.shareid,
			'userid': token
		}
		config.params = {
			...config.params,
			share_other: store.state.user.share_other
		}
		 
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	http.interceptors.response.use((response) => {
		uni.hideNavigationBarLoading();
		uni.hideLoading()
		if (response.hasOwnProperty('data')) {
			if (response.data.code != 1) {
				if (response.data.msg) {
					uni.showToast({
						title: response.data.msg,
						icon: 'none',
						mask: true,
						duration: duration
					})
				}
			}
		} 
		return response.data
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		console.log(response)
		return Promise.reject(response)
	})
}
