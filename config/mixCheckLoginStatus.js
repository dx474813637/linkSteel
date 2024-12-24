export default {
	data() {
			
		return {
			couponShareTitle: "",
			loginBind: {
				auth: 0,
				cash_name: ""
			}
		}
	},
	async onLoad() { 
		// let res = await this.checkLogin()	
		// console.log(res)
		// if(res.share_name) this.couponShareTitle = res.share_name
		// this.loginBind.auth = res.auth
		// this.loginBind.cash_name = res.cash_name
		// this.loginBind.order_type = res.order_type
		// if(res.login != 0) {
		// 	uni.setStorageSync('login', res.login)
		// }else {
		// 	uni.setStorageSync('prePage', getCurrentPages()[getCurrentPages().length - 1].$page.fullPath)
		// 	if(getCurrentPages()[0].route != "pages/mine/mine") {
		// 		uni.redirectTo({
		// 			url: '/pages/login/index'
		// 		})
		// 		uni.showToast({
		// 			title: '请登录生意宝账号。',
		// 			icon: 'none'
		// 		})
		// 	}
			
		// }
	},
	methods: {
		async checkLogin() {
			return await this.$api.checkLogin()
		},
	}
}