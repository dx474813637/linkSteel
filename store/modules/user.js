
// import * as apis from '@/config/api'
 
let state = {
		configBaseURL: 'https://wx.rawmex.cn/Linksteel/',
		configHeader: {
			'content-type': 'application/x-www-form-urlencoded',
			'appid': 10003,
			'appsecret': '549bj0cf2JiEyrjYRQ5No0GlW3kfB4Ll8R/BtXelppjZuAAkWhMWGBU',
		},
		addressArea: [],
		addressAreaAuth: [],
		addressCity: [],
		menusList: [],
		wode: {},
		login: 0,
		auth: 0,
		dingyue: {},
		bd: 1,
		sh: 1, //接口接收隐藏一些结构用
		ppiCate: [],
		sell_buy_show: 0,
		myCpy: uni.getStorageSync('myCpy') || {},
		myAllCpy: [],
		mduCpy: [],
		myProduct: [],
		fxStandard: [],
		moreMenus: {},
		moreMenusNew: [],
		menus_broker: {},
		menus_wd: [],
		newMsg: 0,
		menusAllData: {},
		tips: {},
		wode_guide: {},
		maxSize: 1000000,
		page: {
			route: '/pages/index/index',
			options: {}
		},
		share_other: '',
		fxhome_info: {},
		baseWebImg: 'https://img-album.rawmex.cn/view/'
	},
	getters = {
	},
	mutations = {
		setFxHome(state, data) {
			state.fxhome_info = data
		},
		setWdMenus(state, data) {
			state.menus_wd = data;
		},
		setShareOther(state, data) {
			// console.log(data)
			// let otherArr = data.split('&')
			// let obj = {}
			// otherArr.forEach(ele => {
			// 	obj[ele.split('=')[0]] = ele.split('=')[1]
			// })
			state.share_other = data;
		},
		setBrokerMenus(state, data) {
			state.menus_broker = data;
		},
		setGuide(state, data) {
			state.wode_guide = data;
		},
		setAddressArea(state, data) {
			state.addressArea = data
		},
		setAddressAreaAuth(state, data) {
			state.addressAreaAuth = data
		},
		setAddressCity(state, data) {
			state.addressCity = data
		},
		setMenusList(state, data) {
			state.menusList = data
		},
		setPPiCate(state, data) {
			state.ppiCate = data
		},
		handleGoto(state, obj) {
			uni.$u.route(obj)
		},
		setLogin(state, data) {
			state.login = data;
		},
		setAuth(state, data) {
			state.auth = data;
		},
		setDingyue(state, data) {
			state.dingyue = data;
		},
		setSh(state, data) {
			state.sh = data;
		},
		setMyCpy(state, data={}) {
			state.myCpy = data;
			if(state.myCpy.pic1) state.myCpy.pic1 = `https://img-album.rawmex.cn/view/${state.myCpy.pic1}` 
			if(state.myCpy.weixin_pic) state.myCpy.weixin_pic = `https://img-album.rawmex.cn/view/${state.myCpy.weixin_pic}` 
			uni.setStorageSync('myCpy', data)
		},
		setAllCpy(state, data) {
			state.myAllCpy = data;
		},
		setFxStandard(state, data) {
			state.fxStandard = data;
		},
		setBuySellShow(state, data) {
			state.sell_buy_show = data;
		},
		setMduCpy(state, data) {
			state.mduCpy = data;
		},
		setMyProduct(state, data) {
			state.myProduct = data;
		},
		setMoreMenus(state, data) {
			state.moreMenus = data;
		},
		setMoreMenusNew(state, data) {
			state.moreMenusNew = data;
		},
		setNewMsg(state, data) {
			state.newMsg = data;
		},
		setBd(state, data) {
			state.bd = data;
			if(data != 1) {
				uni.redirectTo({
					url: '/pages/my/account/bind_phone'
				})
			}
		},
		setTips(state, data) {
			state.tips = data;
		},
		setWode(state, data) {
			state.wode = data;
		},
		setMenusAllData(state, data) {
			state.menusAllData = data;
		},
		setPage(state, data) { 
			// console.log('store', data)
			state.page = data;
		},
		clearLogout(state, data) {
			state.bd = 1
			state.auth = 0
			state.myCpy = {}
			state.dingyue = {}
			uni.setStorageSync('myCpy', {}) 
			uni.setStorageSync('WebSocketInfo', {
				...uni.getStorageSync('WebSocketInfo'),
				login: ''
			})
			state.myAllCpy = []
			state.login = 0
			state.myProduct = []
			state.newMsg = 0
		},
	},
	actions = {
		async getCompanyProduct({commit, state}, data={}) {
			const res = await this._vm.$api.getCompanyProduct({params: {login: state.login, p: 1, ...data}});
			if(res.code == 1) {
				commit('setMyProduct', res.list)
			}
		},
		async getFxStandard({commit, state}) {
			const res = await this._vm.$api.getFxStandard();
			if(res.code == 1) {
				commit('setFxStandard', [{name: '全部', id: -1, pid: ''}, ...res.list.list_standard])
			}
		},
		async getAllCompany({commit, state}) {
			const res = await this._vm.$api.getAllCompany();
			if(res.code == 1) {
				commit('setAllCpy', res.list)
			}
		},
		async getMduCompany({commit, state}) {
			const res = await this._vm.$api.mdu_broker();
			if(res.code == 1) {
				commit('setMduCpy', res.list)
			}
		},
		async myCompany({commit, state}) {
			const res = await this._vm.$api.myCompany();
			if(res.code == 1) {
				commit('setMyCpy', res.list)
			}
		},
		async wode({commit, state}, data={}) {
			const res = await this._vm.$api.wode({params: data})
			
			commit('setWode', res.list)
			commit('setGuide', {
					list: res.guideList,
					yd: res.yd
				})
			if(res.yd == 1) uni.removeStorageSync('wode_guide')
			commit('setLogin', res.list.login)
			commit('setAuth', res.list.auth)
			commit('setSh', res.list.sh)
			if(res.list.login) commit('setBd', res.list.bd)
			commit('setTips', {
				tips_info: res.list.tips_info,
				tips_title: res.list.tips_title,
				tips_url: res.list.tips_url
			})
			uni.setStorageSync('WebSocketInfo', {
				...uni.getStorageSync('WebSocketInfo'),
				login: res.list.login
			})
		},
		async getAddressArea({commit, state}) {
			//获取地区toCode 数据 存入vuex
			if (state.addressArea.length != 0) {
				return
			}
			const res = await this._vm.$api.addressArea()
			// const resList = JSON.parse(res.list)
			// const list = listMethods(resList)
			// console.log(res)
			commit('setAddressArea', res.list)
			let arr = uni.$u.deepClone(res.list) 
			let data2 = filterQuYuData(arr) 
			commit('setAddressCity', data2)
		
		},
		async getAddressAreaAuth({commit, state}) {
			//获取地区toCode 数据 存入vuex
			if (state.addressAreaAuth.length != 0) {
				return
			}
			const res = await this._vm.$api.ESIGN_regional_json()
			// const resList = JSON.parse(res.list)
			const list = listMethods(res.list)
			// console.log(list)
			commit('setAddressAreaAuth', list) 
		
		},
		async getMenusList({commit, state}) {
			
			const res = await this._vm.$api.getCategory()
			// console.log(res)
			const arr = []
			for(let key in res.list) {
				arr.push(res.list[key])
			}
			commit('setMenusList', arr)
			// commit('setMenusList', [
			// 	{id: 'dxdx', name: 'A级测试固定菜单名', children: [{id: 'dxdxb', name: 'B级测试固定菜单名1'}, {id: 'dxdxbb', name: 'B级测试固定菜单名2'}]}, 
			// 	...res.data
			// 	]
			// )
		
		},
		async getPPiCate({commit, state}) {
			
			const res = await this._vm.$api.getPpiCateList()
			if(res.code == 1) {
				res.list.forEach(ele => {
					ele.list.forEach(item => {
						item.dir = ele.id
					})
				})
				commit('setPPiCate', res.list)
			}
		},
		async getImageBase64_readFile({commit, state}, tempFilePath) {
			console.log(tempFilePath)
			  return await new Promise(resolve => {
					//获取全局唯一的文件管理器 
					uni.getFileSystemManager().readFile({ //读取本地文件内容
					  filePath: tempFilePath, // 文件路径
					  encoding: 'base64', // 返回格式
					  success: ({
						data
					  }) => {
						// return resolve('data:image/png;base64,' + data);
						return resolve( data);
					  }
					});
			  });
		}, 
		async sendDingyue() {
			wx.getSetting({
				withSubscriptions: true,
				success: async res => {
					console.log(res)
					const r = await this._vm.$api.get_tmp_id_time({
						params: {
							str: JSON.stringify(res)
						}
					});
				}
			})
		},
		async getHomeInfo({commit, state}) {
			const res = await this._vm.$api.homepage_info();
			if(res.code == 1) {
				let fxImg = res.list.detail.url_img
				res.list.detail.da_pic = fxImg + res.list.detail.da_pic
				commit('setFxHome', res.list.detail) 
			}
		}
	}
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}

function filterQuYuData(data) {
	let arr = []; 
	data.forEach(ele => {
		let obj = {
			...ele
		} 
		if(obj.hasOwnProperty('children')) {
			if(!obj.children[0].hasOwnProperty('children')) {
				delete obj.children
			}
			else {
				obj.children = filterQuYuData(obj.children)
			} 
			
		}
		arr.push(obj)
	}) 
	return arr
	
}
function listMethods(list) {
	return list.items.map(ele => {
		let obj = {
			value: ele.code,
			text: ele.name,
		}
		let children = list[`items${ele.code}`]
		if (children && children.length > 0) {
			obj.children = children.map(item => {
				let obj2 = {
					value: item.code,
					text: item.name
				}
				let children2 = list[`items${item.code}`]
				if (children2 && children2.length > 0) {
					obj2.children = children2.map(item2 => {
						return {
							value: item2.code,
							text: item2.name
						}
					})
				} else {
					obj2.children = [{
						value: item.code,
						text: item.name,
					}]
				}
				return obj2
			})
		}
		return obj
	})
}
