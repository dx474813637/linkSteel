export const PROJECT = {
	base: {
		name: '网盛原材料撮合交易系统',
		// index: '/pages/index/index',
		value: 'base',
		permission: {
			whiteList: [
				'/',
				'/pages/my/user/index',
				'/pages/my/home/home',
				{
					pattern: /^\/pages\/list.*/
				},
				// { pattern: /^\/pages\/index\/login*/ },
				{
					pattern: /^\/pages\/baojia*/
				},
				{
					pattern: /^\/pages\/index*/
				},
				{
					pattern: /^\/pages\/more*/
				},
				// { pattern: /^\/pages\/index\/(?!attention).*/ },
			],
			// 用户信息未完善 权限列表
			userStateList: [{
					pattern: /^\/pages\/my\/broker\/edit*/
				},
				{
					pattern: /^\/pages\/my\/broker\/prod_edit*/
				},
			],
			// 资金sinopay 白名单列表
			sinopayWhiteList: [{
					pattern: /^\/pages\/my\/money\/index/
				},
				{
					pattern: /^\/pages\/my\/money\/sino_bind/
				},
				{
					pattern: /^\/pages\/my\/money\/sino_reg/
				},
				{
					pattern: /^\/pages\/my\/money\/sino_info/
				},
			],

			sinoTiShiList: [{
					pattern: /^\/pages\/my\/money\/index/
				},
				{
					pattern: /^\/pages\/my\/money\/index_before/
				},
				{
					pattern: /^\/pages\/my\/money\/index_new/
				},
				{
					pattern: /^\/pages\/my\/money\/sino_bind/
				},
				{
					pattern: /^\/pages\/my\/money\/sino_reg/
				},
				{
					pattern: /^\/pages\/my\/money\/card_add/
				},
			]
		},
	},
	chemnet: {
		name: '化工网商城',
		// index: '/pages/chemnet/index',
		value: 'chemnet',
	}
} 

export let current_project = PROJECT.base.value // uni.getStorageSync('current_project') || PROJECT.base.value

export function changeProject (value) {
	current_project = value;
	uni.setStorageSync('current_project', current_project)
}

export function getProject () {
	return PROJECT[current_project]
}

export function getProjectArr () {
	return Array.from(Object.values(PROJECT), ele=> ele);
}

export function saveApiData(data) {
	if(data instanceof Array) {
		for(let key in PROJECT) {
			let name = data.filter(ele => ele.url == PROJECT[key].value)[0].name
			PROJECT[key].name = name
		}
	}
}