import Mock from 'better-mock/dist/mock.mp.js';
Mock.setup({
  timeout: 400
})
//dev2222
//dev111
// 获取消息列表
Mock.mock(/\/api\/getMsgList/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取消息列表',
	'total': 42,
	'list|10': [{
		'id': '@id',
		'name|1': ['@province()@cword(2,5)有限公司', '@cname'],
		'avatar': 'https://cdn.uviewui.com/uview/album/1.jpg',
		'content': '@cparagraph(1, 3)',
		'time': '@datetime()',
		'readed|1': ['0', '1'] 
	}]
})
//获取消息详情
Mock.mock(/\/api\/getMsgDetail/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取消息详情',
	'total': 32,
	'cpy': {
		'name|1': ['@province()@cword(2,5)有限公司', '@cname'],
		'avatar': 'https://cdn.uviewui.com/uview/album/1.jpg',
	},
	'list|10': [{
		'id': '@id',
		'avatar': 'https://cdn.uviewui.com/uview/album/1.jpg',
		'isMe|1': ['1', '0'],
		'content': '@cparagraph(1, 3)',
		'time': '@datetime()',
	}]
})
//获取用户收货地址列表 带分页
Mock.mock(/\/api\/initData/, 'get', {
	'code': 1,
	'msg': 'mock测试',
	'page_total': 2,
	'data|10': [{
		'id': '@id',
		'auto': 1,
		'regional_name': '@city(true)',
		'address|1-2': '拱墅区莫干山路187号MOCK大厦13楼2',
		'name': '@cname',
		'mobile': '@phone'
	}]
})
//获取导航菜单分类列表
Mock.mock(/\/api\/getMenusList/, 'get', {
	'code': 1,
	'msg': 'mock测试 获取导航菜单分类列表',
	'data|10': [{
		'id': '@id',
		'name': 'A级@ctitle(3, 5)',
		'children|10-20': [{
			'id': '@id',
			'name': 'B级@ctitle(3, 5)',
		}]
	}]
})

//添加新的关注
Mock.mock(/\/api\/setNewFollow/, 'get', function(options) {
	console.log(options)
	return Mock.mock({
		'code': 1,
		'msg': 'mock测试 添加新的关注',
	})
})
//移除关注
Mock.mock(/\/api\/removeFollow/, 'get', {
	'code': 1,
	'msg': 'mock测试 移除关注成功',
})


//获取地址城市选择器数据
Mock.mock(/\/api\/regional_list/, 'get', {
	'code': 1,
	'msg': 'mock测试',
	'columns': [
		['中国', '美国'],
		['深圳', '厦门', '上海', '拉萨']
	],
	'columnData': [
		['深圳', '厦门', '上海', '拉萨'],
		['得州', '华盛顿', '纽约', '阿拉斯加']
	]
})
//获取地址城市选择器数据
Mock.mock(/\/api\/address_change/, 'post', {
	'code': 1,
	'msg': 'mock测试，地址提交成功',
})

//获取地址城市选择器数据
Mock.mock(/\/api\/delAddress/, 'get', {
	'code': 1,
	'msg': 'mock测试，删除地址成功',
})

// 获取我的交易商品名列表
Mock.mock(/\/api\/getBrokerProds/, 'get', {
	'code': 1,
	'msg': 'mock测试',
	'page_total': 2,
	'data|10': [{
		'id': '@id',
		'name': '@cword(1, 4)',
		'unit': '@cword(1)',
		'status|1': true,
		'attr_common_12': '@cword(2, 5)',
		'attr_common_11': '@cword(2, 5)',
		'attr_common_13': '@cword(2, 5)',
		'attr_common_14': '@cword(2, 5)',
		'trade_type|1': [ "b", "s", "bs"],
		'img': Mock.Random.image('200x150', '#f8f8f8', '#999', '测试示例图'),
		'intro': '@cparagraph()'
	}]
})
//修改prod状态值
Mock.mock(/\/api\/changeProdStatus/, 'get', {
	'code': 1,
	'msg': 'mock测试，修改prod状态值成功',
})
//编辑prod
Mock.mock(/\/api\/editProd/, 'post', function(options) {
	// console.log(options)
	return Mock.mock({
		'code': 1,
		'msg': `mock测试，${options?.body?.id? '编辑' : '添加'}prod成功`,
	})
})
//删除prod
Mock.mock(/\/api\/deletProds/, 'get', {
	'code': 1,
	'msg': 'mock测试，删除prod成功',
})


// 获取我的订阅消息列表
Mock.mock(/\/api\/getSubscribeMsgList/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取我的订阅消息列表',
	'page_total': 2,
	'data|10': [{
		'id': '@id',
		'type|1': ['b', 's'],
		'pid': '@id',
		'pdate': '@datetime()',
		'pname': '@cword(2, 5)',
		'msg_status|1': ['1', '0'],
	}]
})

// 获取我的客户列表
Mock.mock(/\/api\/getCustomerList/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取我的客户列表',
	'page_total': 2,
	'data|10': [{
		'id': '@id',
		'c_account': '@word(8)',
		'c_pwd': '@word(8)',
		'c_name|1': ['', '@province()@cword(2,5)有限公司'],
		'c_contact|1': ['', '@cname()'],
		'c_phone|1': ['', '@phone'],
		'c_email|1': ['', '@email'],
		'c_status|1': ['1', '0'],
	}]
})

//编辑客户信息
Mock.mock(/\/api\/editCostomDetail/, 'post', {
	'code': 1,
	'msg': 'mock测试，保存成功',
})

//修改登录密码
Mock.mock(/\/api\/changeLoginPwd/, 'get', {
	'code': 1,
	'msg': 'mock测试，修改登录密码成功',
})
//修改sino登录密码
Mock.mock(/\/api\/changeSinoLoginPwd/, 'get', {
	'code': 1,
	'msg': 'mock测试，修改sinopay登录密码成功',
})
//更新sino支付登录密码
Mock.mock(/\/api\/updatePayPwd/, 'get', {
	'code': 1,
	'msg': 'mock测试，更新sino支付登录密码成功',
})
//忘记sino支付登录密码
Mock.mock(/\/api\/forgetPayPwd/, 'get', {
	'code': 1,
	'msg': 'mock测试，设置sino支付登录密码成功',
})


//获取手机验证码
Mock.mock(/\/api\/getPhoneCode/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取验证码成功',
})

//验证手机验证码
Mock.mock(/\/api\/valPhoneCode/, 'get', {
	'code': 1,
	'msg': 'mock测试，验证码验证成功',
})

// 获取我的账号登录历史列表
Mock.mock(/\/api\/getLogList/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取我的账号登录历史列表',
	'page_total': 2,
	'data|10': [{
		'id': '@id',
		'date': '@datetime()',
		'ip': '@ip()',
		'status|1': ['1', '0'],
		'bz': '备注内容text'
	}]
})


// 获取我的订单列表
Mock.mock(/\/api\/getOrderList/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取我的订单列表',
	'page_total': 2,
	'data|10': [{
		'id': '@id',
		'seller': '@province()@cword(2,5)有限公司',
		'buyer': '@province()@cword(2,5)有限公司',
		'prod': '@integer(1000, 10000)@cword(3,6)',
		'prices': '@integer(1000, 10000000)',
		'price': '@integer(1000, 100000)',
		'num': '@integer(1, 10000)',
		'unit|1': ['吨', '千克', '平方', '份', '个'],
		'pay_type': '非支付',
		'trans_type|1': ['zt', 'sh'],
		'addr': '@county(true)',
		'date': '@datetime()',
		'ht_status': '订立中',
		'js_status': '未交收',
	}]
})

// 获取我的买卖盘列表
Mock.mock(/\/api\/getBrokerList/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取我的买卖盘列表',
	'page_total': 2,
	'data|10': [{
		'id': '@id',
		'name|1': ['铜', '柴油', '玉米', '大麦', '小麦', '西红柿', '铁'],
		'pp|1': ['进口'],
		'type|1': ['即期', '合约'],
		'date': '@datetime()',
		'price': '@integer(1000, 100000)',
		'unit|1': ['吨', '平方', '米', '千克', '克'],
		'status|1': ['0', '1'],
	}]
})

// 获取买卖盘中心列表
Mock.mock(/\/api\/getPanList/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取买卖盘中心列表',
	'page_total': 2,
	'data|10': [{
		'id': '@id',
		'name': '螺纹钢',
		'price': '5000',
		'unit': '元/吨',
		'is_zd': '15.56',
		'cname': '中天',
		'intro': '品种:Ⅲ级螺纹钢;牌号:HRB400;规格:Φ16',
		'place_company': '杭州瓯坤实业有限公司',
		'reg_name': '浙江省/杭州市',
		'pubDate': '2022-5-6',
		'color': 'text-green'
	}]
})

// 获取商品市场价格列表
Mock.mock(/\/api\/getMarketList/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取商品市场价格列表',
	'page_total': 20,
	'data|10': [{
		'id': '@id',
		'name': '甲醇',
		'price': '议价',
		'type|1': ['b', 's'],
		'num': '100',
		'unit': '吨',
		'intro': '品种:Ⅲ级螺纹钢;牌号:HRB400;规格:Φ16',
		'reg_name': '浙江省/杭州市',
		'pubDate': '2022-5-6',
	}]
})

// 获取今日行情列表
Mock.mock(/\/api\/getHqData/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取今日行情列表',
	'data|10': [{
		'id': '@id',
		'name|+1': ['螺纹钢', '甲醇', '大米', '玉米淀粉', '铁', '钢材', '铜'],
		'price': '@float(1000, 100000, 0, 2)',
		'zdf|-100-100.2': 1,
	}]
})
// 获取关注列表信息
Mock.mock(/\/api\/getAttentionList/, 'get', {
	'code': 1,
	'msg': 'mock测试，关注列表',
	'data|5-20': [{
		'id': '@id',
		'name|+1': ['螺纹钢', '甲醇', '大米', '玉米淀粉', '铁', '钢材', '铜'],
	}]
})

// 获取关注的买卖盘信息
Mock.mock(/\/api\/getFollowPanList/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取关注的买卖盘信息',
	'page_total': 2,
	'data': {
		'list1|5':[
			{
				'name|+1': ['苯乙烯', '环氧氯丙烷', '角钢', '氢溴酸'],
				'id': '@id',
				'children|10': [
					{
						'id': '@id',
						'name': '原料名',
						'price': '@integer(1000, 100000)',
						'unit|1': ['吨', '平方', '米', '千克', '克'],
						'type|1': ['即期', '合约'],
					}
				]
			}
		],
		'list2|3':[
			{
				'name|+1': ['乙二胺', '硝酸钾', '葡萄糖酸钠', '炭黑'],
				'id': '@id',
				'children|10': [
					{
						'id': '@id',
						'name': '原料名',
						'price': '@integer(1000, 100000)',
						'unit|1': ['吨', '平方', '米', '千克', '克'],
						'type|1': ['即期', '合约'],
					}
				]
			}
		],
	}
})

// 获取我的充提列表
Mock.mock(/\/api\/getCzList/, 'get', function(options){
	
	const type = options.url.substr(-1);
	return Mock.mock({
		'code': 1,
		'msg': 'mock测试，获取我的充提列表',
		'page_total': 2,
		'data|10': [{
			'id': '@id',
			'pid': '@id',
			'type': type,
			'price': '@integer(1000, 100000)',
			'date': '@datetime()',
			'status|1': ['1', '0'],
		}]
	})
	
})
// 获取我的账单列表
Mock.mock(/\/api\/getBillList/, 'get', function(options){
	
	return Mock.mock({
		'code': 1,
		'msg': 'mock测试，获取我的账单列表',
		'page_total': 2,
		'data|10': [{
			'id': '@id',
			'name': '@province()@cword(2,5)有限公司',
		}]
	})
	
})

// 获取我的银行卡列表
Mock.mock(/\/api\/getBankcardList/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取我的银行卡列表',
	'page_total': 2,
	'data|10': [{
		'id': '@id',
		'bank_class|+1': ['ny', 'zg', 'gs', 'js', 'jt', 'gd', ''],
		'bank_name|+1': ['农业银行', '中国银行', '工商银行', '建设银行', '交通银行', '光大银行', '']
	}]
})


// 绑定银行卡 提交银行卡信息表单获取验证码
Mock.mock(/\/api\/bindBankCard/, 'post',{
	'code': 1,
	'msg': 'mock测试，验证码已发送',
})

// 充提申请接口
Mock.mock(/\/api\/czApply/, 'post',{
	'code': 1,
	'msg': 'mock测试，充提申请成功',
})

// 匹配银行信息
Mock.mock(/\/api\/searchBank/, 'get', function(options){
	if(Math.random() > 0.2) {
		return Mock.mock({
			'code': 1,
			'msg': 'mock测试，匹配银行信息发送',
			'data|1': [
				{
					logo: 'http://static1.showapi.com/app2/banklogo/ceb.png',
					name: '中国光大银行'
				},
				{
					logo: 'http://static1.showapi.com/app2/banklogo/abc.png',
					name: '中国农业银行股份有限公司'
				},
				{
					logo: 'http://static1.showapi.com/app2/banklogo/icbc.png',
					name: '中国工商银行'
				},
			]
		})
	}else {
		return Mock.mock({
			'code': 0,
			'msg': 'mock测试，无匹配银行的信息',
		})
	}
	
})

// 获取Ec data
Mock.mock(/\/api\/getEcData/, 'get', {
	'code': 1,
	'msg': 'mock测试，获取Ec data',
	'data': {
		'xdata|10': ['@date("M-d")'],
		'ydata|10': ['@integer(10, 100)']
	}
})