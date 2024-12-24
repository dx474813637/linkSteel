
const http = uni.$u.http
// https://api.rawmex.cn/gw/demo/
// all_api token=1需要login token
// export const all_api = (data) => http.request({url: 'all_api', method: 'GET', ...data})

export const all_api = (data, methods = 'GET', config = {}) => {
	if (methods == 'GET') {
		return http.get('all_api', data)
	} else if (methods == 'POST') {
		return http.post('all_api', data, config)
	}
}
//授权获取用户信息 ？
export const login = (data, config = {}) => http.post('login', data, config)

//获取菜单
export const getMenus = (data) => http.get('memu', data)

//获取 首页整合信息
// pid:标准品PID
// pname:标准品名称
// ppid:生意社品种ID
// name:生意社品种名称
// ave:价格
// amp:日涨跌幅
// pubDate:日期
export const getHome = (data) => http.get('home', data)
//首页推荐配置 参数plate1 plate2 plate3
export const setHomeConfig = (data, config = {}) => http.post('set_home_config', data, config)

//获取 userid 
export const loginCancel = (data, config = {}) => http.post('login_cancel', data, config)
//获取 商品单位列表
export const getUnit = (data) => http.get('unit', data)

/**
 * 
 * 账号 login 账号是以字母开头的任何英文字母以及阿拉伯数字组合，不得少于5个字符
 * 手机号 mobile
 * 密码 passwd 密码可使用任何英文字母以及阿拉伯数字组合，不得少于5个字符并区分英文大小写
 * 手机验证码 captcha
 * 操作标志 flag 1获取手机验证码 2校验并注册
 */
// 注册时搜索手机号是否已经注册 参数mobile
export const searchMobile = (data) => http.get('search_mobile', data)
// 注册账号和注册账号获取验证码
export const register = (data) => http.get('register', data)
// 账号登录 参数login  passwd
export const sunsirsLogin = (data) => http.get('sunsirs_login', data)
// 手机登录 参数mobile captcha flag* 1为获取手机验证码 2为校验并登录
export const loginMobile = (data) => http.get('login_mobile', data)
// 手机短信修改密码 参数mobile passwd新密码 captcha flag* 1为获取手机验证码 2为校验并登录
export const passwdReset = (data) => http.get('passwd_reset', data)
// 修改密码 参数opasswd原密码 npasswd新密码
export const passwdResetA = (data) => http.get('passwd_reseta', data)

// denglu_info 返回的 info1账号登录页说明 info2手机登录页说明 info3注册页说明
export const denglu_info = (data) => http.get('denglu_info', data)

//  我的接口，通过list.login有值登录，0未登录。未登录状态，
// 点一般的都跳转登录，除非是一些帮助说明的链接。
// auth权限 现在就0和1,0交易商 1broker 
// 现在区别就是客户管理这块和发布的时候多几个表单选项。0的时候隐藏。
export const wode = (data) => http.get('wode', data)
//登出
export const logout = (data) => http.get('logout', data)

// =======客户信息
// 用户类型： type *B-企业C-个人 
// 名称/姓名： name 
// 联系人： contact *用户类型为企业时必输 
// 电话： tel 
// 传真： fax 
// 邮编： zip 
// 邮箱： email 
// 联系手机： mobile 不传默认为注册手机号 
// 手机是否前台显示： mobile_show 1-显示 
// 所在地： regional 地区代码，如：110101 
// 详细地址： address 
// 统一社会信用代码/身份证号： credit_code
// 营业执照图片地址： pic1 第一次传图片的时候不用填用户信息里的图片地址（上传后平台系统自动生成的地址） 
// 营业执照图片（内容base64): pic1_base64 传这个参数，图片上传 
// 营业执照图片名称： pic1_name 营业执照图片（内容base64)传时必输比如测试jpg
// 获取我的客户信息
export const myCompany = (data) => http.get('my_company', data)
// 创建/修改客户信息
export const editCompany = (data, config={}) => http.post('edit_company', data, config)


// =====地址信息
// 收/发地址： type *R-收S-发RS-收发 
// 地区： regional  地区编码：110102-西城区 
// 详细地址： address 
// 联系人： contact 
// 电话： tel 
// 备注： remark
//  我的地址 参数p
export const myAddress = (data) => http.get('my_address', data)
//  删除地址 参数id
export const deleteAddress = (data) => http.get('delete_address', data)
//  创建地址
export const createAddress = (data, config={}) => http.post('create_address', data, config)
//  修改地址，比创建多参数id 和to_def 设为默认：1-默认
export const changeAddress = (data, config={}) => http.post('change_address', data, config)
//  地址编码
export const addressArea = (data) => http.get('address_area', data)




// change_bind 修改绑定手机号 
// 原手机号： old_mobile 
// 原手机验证码： old_mobile_code 
// 新手机号： new_mobile 
// 新手机验证码： new_mobile_code 
// flag *1-原手机号获取短信2-提交原手机号验证码3-新手机号获取短信4-提交新手机号验证码 
// 操作： (这里需要前台控制，顺序是先调用1和2，成功后才允许3和4)
export const changeMobile = (data) => http.get('change_bind', data)

// jiebang_mob 解绑手机接口  
// 参数mobile_code（flag=2时必填） 验证码  
// flag 1-手机号获取短信 2-提交手机号验证码并解绑
export const jiebangMob = (data) => http.get('jiebang_mob', data)

// bangding 绑定手机号/修改绑定手机号 
// 参数：mobile flag1-获取短信 2-提交验证码 captcha
export const bindMobile = (data) => http.get('bangding', data)
// agreement 协议
export const agreement = (data) => http.get('agreement', data)

// notice_list 最新公告列表 参数p
export const noticeList = (data) => http.get('notice_list', data)

// notice_detail 公告详情 参数id
export const noticeDetail = (data) => http.get('notice_detail', data)

// my_ewm 二维码
export const myEwm = (data) => http.get('my_ewm', data)

// 访问我的记录   login_view_log 参数p
export const loginViewLog = (data) => http.get('login_view_log', data)

// guanzhu
export const guanzhu = (data) => http.get('guanzhu', data)



// 积分 我的积分  参数p zt zt不传或0  全部  zt=1 获取积分记录 zt=2 使用积分记录
export const my_score = (data) => http.get('my_score', data) 
// 指南
export const zhinan = (data) => http.get('zhinan', data) 
// 企业专区公司信息和商品接口  参数login=manmlt
export const mancust_info_category = (data) => http.get('mancust_info_category', data) 
// prefecture_list
export const prefecture_list = (data) => http.get('prefecture_list', data) 


//  订阅模板 type=0默认订阅  1订单状态订阅
export const tmp_id_list = (data) => http.get('tmp_id_list', data) 
//  订阅成功后把返回的TEMPLATE_ID 已json格式  提交到str
export const tmp_id_back = (data) => http.get('tmp_id_back', data) 
// wx.getSetting把始终订阅的数据 json格式 提交到str
export const get_tmp_id_time = (data) => http.get('get_tmp_id_time', data) 

// login_manage_list 身份切换列表
export const login_manage_list = (data) => http.get('login_manage_list', data) 
// login_manage_change 身份切换 参数id
export const login_manage_change = (data) => http.get('login_manage_change', data) 
// login_manage_del  删除身份 参数id
export const login_manage_del = (data) => http.get('login_manage_del', data) 

 // future_trade 期货商品 参数pid 期货id p页
export const future_trade = (data) => http.get('future_trade', data) 

// haibao_list
export const haibao_list = (data) => http.get('haibao_list', data)
// haibao_sc 参数id
export const haibao_sc = (data) => http.get('haibao_sc', data)

// homepage 我的主页 参数login
export const homepage = (data) => http.get('homepage', data)
// page_info 我的信息接口
export const page_info = (data) => http.get('page_info', data)
// save_page_info 保存我的信息接口 参数pic 完整图片地址 name昵称  attestation认证信息 rz=0未认证 1认证 info个人介绍
// 		rz=0未认证 1认证 这个只是字段说明，不接受参数的。这个是管理员审核的。
//		switch1分销卖盘开关 switch2我的卖盘开关 switch3我的名片开关
export const save_page_info = (data, config={}) => http.post('save_page_info', data, config)

// uid_share_index 分享主页接口 参数login  必填
export const uid_share_index = (data) => http.get('uid_share_index', data)
// uid_share_all 分享记录接口 参数url  必填
export const uid_share_all = (data) => http.get('uid_share_all', data)

// WEB_COMPANY_DETAIL 分享记录接口 参数url  必填
export const WEB_COMPANY_DETAIL =  (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'WEB_COMPANY', Action: 'DETAIL' }}, data))