const http = uni.$u.http
//获取 标准品数据
export const getCategory = (data) => http.get('category', data)
//获取 标准品分类列表 --用getCategory
export const getStancate = (data) => http.get('stancate', data)
//获取 标准品列表 参数p、stancate标准品分类id  多一个参数is_market 1市场标准品 0或空 全部
export const getStandard = (data) => http.get('standard', data)


// =====商品信息
// 标准商品： standard *从标准商品列表里选择标准商品引d 
// 商品名称： name 
// 单位： unit 
// 推荐：平方米，立方米，吨，升，米，千克。也可以自定义输入 
// 属性一规格属性： attr_common_12 
// 属性-品牌： attr_common_11 
// 属性-生产商： attr_common_13 
// 属性-质量标准： attr_common_14 
// 自定义属性名-数组： attr_custom_key 多个自定义属性名用，逗号隔开必须与自定义属性值顺序一致 
// 自定义属性值-数组： attr_custom_val 多个自定义属性名用，逗号隔开必须与自定义属性名顺序一致 
// 需求类型： trade_type b-买盘s-卖盘bs-两者皆可 
// 图片： pic1 相册中选择 
// 商品简介： intro
// 我的商品列表 参数p 搜索terms
export const myProduct = (data) => http.get('my_product', data)
// 删除商品 参数id
export const deleteProduct = (data) => http.get('delete_product', data)
// 改变商品状态 参数id state
export const ableProduct = (data) => http.get('able_product', data)
// 创建商品
export const createProduct = (data, config={}) => http.post('create_product', data, config)
//  编辑商品 多一个参数id
export const changeProduct = (data, config={}) => http.post('change_product', data, config)


/**
 * 获取 买盘列表 
 * 页码 p 
 * 客户账号 login   broker01
 * 期货 is_fut 1 0
 * 有效期内 expressed  1 0
 * 分类 catrgory 16
 * 标准品 standard 73
 * 买盘名称 terms 模糊搜索
 * 规格 spec 模糊搜索
 * 价格区间 minp - maxp 元
 * 现货类型 trdtype 1合约2即期
 * 交货地 dplace 地区编码 
 * 
 * 委托撮合 broker_login 
 * 委托客户经理撮合，同时报盘中显示撮合员的联系方式。
 * (只有c开头的账号允许填写)
 * 
 */
//获取 买盘列表 参数p  expressed=1 有效期内 pr: 3
export const getBuy = (data) => http.get('buy', data)
//获取 买盘明细 参数id
export const getBuyDetail = (data) => http.get('buy_detail', data)
//获取 卖盘列表 参数p   expressed=1 有效期内
export const getSell = (data) => http.get('sell', data)
//获取 卖盘明细 参数id
export const getSellDetail = (data) => http.get('sell_detail', data)
//获取 图片上传接口
export const upImg = (data, config = {}) => http.post('upimg', data, config)


//获取 用户买盘清单列表 参数p company_id客户id
export const getBuyShare = (data) => http.get('buy_share', data)
//获取 用户卖盘清单列表 参数p company_id客户id
export const getSellShare = (data) => http.get('sell_share', data)
//获取 商品级市场列表 参数p、pid生意社PID
export const getPidTrade = (data) => http.get('pid_trade', data)

// ======买盘参数
// 商品ID: product_id *该商品的需求类型必须包括买盘
// 标题： name
// 订单类型： order_type *1-线上支付2-线下支付
// 现货类型： trade_type *1-合约现货2-即期现货
// 意向单价： price *元填0表示点价，请说明点价规则
// 点价规则： dprice
// 数量： amount *(大于0.01的数字)
// 主规格： spec
// 有效时间： express_time *(整数时间) 即期现货有效期最多10天，合约现货有效期最多360天
// 有效时间单位： express_unit d-天h-小时
// 交收期-月份： settle_month 1-12*现货类型为1-合约现货时必输
// 交收期-旬： settle_date td-上旬mtd-中旬td-下旬*现货类型为1-合约现货时必输
// 交货地： delivery_place *地区编码：110102-西城区
// 详细需求： intro
// 报盘企业id: customer_id   brokert填写调用报盘企业列表-broker 
// 报盘企业名：customer_name   brokert填写调用报盘企业列表-broker 
// 企业角色： mdu   broker填写D-经销商U-下游用户 
// 报盘类型： post_type  brokert填写1-替报0-自报
// 我的买盘 参数p
export const myBuy = (data) => http.get('my_buy', data)
// 创建买盘
export const createBuy = (data, config={}) => http.post('create_buy', data, config)
// 修改买盘 多一个参数买盘id
export const changeBuy = (data, config={}) => http.post('change_buy', data, config)
// 修改买盘状态 参数id 买盘id state 1-激活 0-取消激活
export const ableBuy = (data) => http.get('able_buy', data)
// 删除买盘 参数id 买盘id
export const deleteBuy = (data) => http.get('delete_buy', data)

// ======卖盘参数
// 商品D: product_id *该商品的需求类型必须包括卖盘
// 标题： name
// 订单类型： order_type *1-线上支付2-线下支付
// 现货类型： trade_type *1-合约现货2-即期现货
// 单价： price *元填0表示点价，请说明点价规侧
// 点价规则： dprice
// 数量： amount *(大于0.01的数字)
// 有效时间： express_time *(整数时间) 即期现货有效期最多10天，合约现货有效期最多360天
// 有效时间单位： express_unit d-天h-小时
// 交收期-月份： settle_month 1-12*现货类型为1-合约现货时必输
// 交收期-旬： settle_date td-上旬mtd-中旬td-下旬*现货类型为1-合约现货时必输
// 交货地： delivery_place *地区编码：110102-西城区
// 图片： pics 多个图片用，逗▣号隔开
// 备注： remark
// 报盘企业id: customer_id   brokert填写调用报盘企业列表-broker 
// 报盘企业名：customer_name   brokert填写调用报盘企业列表-broker 
// 企业角色： mdu   broker填写D-经销商U-下游用户 
// 报盘类型： post_type  brokert填写1-替报0-自报
 
// ---交易类型为1-竞拍交易时必填---
// 'bid_settle_date' => 交货日：T +

// 'bid_is_part' => '竞拍方式', 1-按手竞拍 2-总量竞拍  
// 'bid_step_amount' => '每手尺寸',
// 'bid_min_amount' => '至少下单', 每手尺寸*至少下单必须小于等于挂牌数量
// 'price' => '起拍价', 这个价格跟原来的单价字段一样的
// 'bid_re_price' => '保留价',优于保留价的才可能成交
// 'bid_step' => '加价幅度',
// 'bid_is_repeat' => '允许多次竞拍', 1-是 0-否
// 'bid_bdate' => '开始时间（日）',
// 'bid_btime' => '开始时间（点）', 竞标开始时间必须大于等于当前时间24小时
// 'bid_edate' => '结束时间（日）', 
// 'bid_etime' => '结束时间（点）', 竞标持续时间必须小于等于1天
// 'bid_is_anonym' => '匿名竞拍',1-是 0-否
// 'bid_is_darkmark' => '是否暗标',1-是 0-否
// 
// ---交易类型为3-基差点价---
// base_contract 基准期货合约 
// base_afterday 点价后最迟交收天数  移除
// 卖盘发布和修改时增加这两个字段
// 1.商品  'is_market' => '1', 时，可以选 trade_mode=3 基差点价
// 2.交易类型  增加 3-基差点价
// 3.增加两个参数：基准期货合约，点价后最迟交收天数  交易类型-基差点价可填
//   交易类型-基差点价时，单价（price）参数名改成基差（price）
//   交易类型-基差点价时，有效时间（express_time）参数名改成截止日（express_time）
// 4.交易类型-基差点价时，交收方式为买家自提
// 
// 我的卖盘 参数p trade_mode  0-议价交易 1-竞拍交易 2-一口价交易   3-基差点价 不传全部
export const mySell = (data) => http.get('my_sell', data)
// 修改卖盘状态 参数id 卖盘id state 1-激活 0-取消激活
export const ableSell = (data) => http.get('able_sell', data)
//  删除卖盘 参数id 卖盘id
export const deleteSell = (data) => http.get('delete_sell', data)
//  创建卖盘
export const createSell = (data, config={}) => http.post('create_sell', data, config)
//  修改卖盘 多一个参数卖盘id
export const changeSell = (data, config={}) => http.post('change_sell', data, config)

// 竞价
// bid_subscribe_subscribe_sell 竞价预约 source:订单类型,SELL-采购订单 source_id:订单ID
export const bid_subscribe_subscribe_sell = (data) => http.get('bid_subscribe_subscribe_sell', data)

// bid_subscribe_list_bid_subscribe 预约列表 trade_name:关键词 p:页数 ; source SELL-竞卖 BUY-竞买
export const bid_subscribe_list_bid_subscribe = (data) => http.get('bid_subscribe_list_bid_subscribe', data)

// bid_subscribe_detail_bid_subscribe 预约明细 id:预约ID
export const bid_subscribe_detail_bid_subscribe = (data) => http.get('bid_subscribe_detail_bid_subscribe', data)

// bid_subscribe_cancel_bid_subscribe 取消预约 id:预约ID
export const bid_subscribe_cancel_bid_subscribe = (data) => http.get('bid_subscribe_cancel_bid_subscribe', data)

// bid_subscribe_list_bid 竞价参与列表 trade_name:关键词 p:页数
export const bid_subscribe_list_bid = (data) => http.get('bid_subscribe_list_bid', data)

// bid_subscribe_detail_bid 竞价参与明细 id:竞价参与ID
export const bid_subscribe_detail_bid = (data) => http.get('bid_subscribe_detail_bid', data)

// bid_subscribe_list_subscribe 我发布的竞价-预约列表（挂牌方）
// source:订单类型,SELL-采购订单 source_id:订单ID p:页数
export const bid_subscribe_list_subscribe = (data) => http.get('bid_subscribe_list_subscribe', data)

// list_sell_bid 参数id p 我发布的竞价-竞拍列表（挂牌方） 
export const list_sell_bid = (data) => http.get('list_sell_bid', data)

// bid_subscribe_bid_trade 竞价出价
// source: 订单类型 SELL
// source_id: 订单ID
// curr_unit_price: 当前价
// bid_price: 加价
// bid_amount: 数量
export const bid_subscribe_bid_trade = (data) => http.get('bid_subscribe_bid_trade', data)

//卖盘详情 竞价列表
// is_success=1 并且pw_curr page = 1状态:成交
// is _valid-1并且pw curr page=1 状态:领先


// sell_buy_share 参数id cate=b/s
export const sell_buy_share = (data) => http.get('sell_buy_share', data)
// create_sell_info 
export const create_sell_info = (data) => http.get('create_sell_info', data)

// list_basis  基差列表 参数p standard
export const list_basis = (data) => http.get('list_basis', data)
// future_basis_cate 
export const future_basis_cate = (data) => http.get('future_basis_cate', data)

// list_order_inquiry 询价订单列表
export const list_order_inquiry = (data) => http.get('list_order_inquiry', data)
// list_buy_inquiry  采购询价列表 terms p role B-买家 S-卖家
export const list_buy_inquiry = (data) => http.get('list_buy_inquiry', data)
// detail_order_inquiry 询价订单信息 id 询价ID role 角色 B-买家 S-卖家
export const detail_order_inquiry = (data) => http.get('detail_order_inquiry', data)
// order_inquiry_create 我要报价-询价
export const order_inquiry_create = (data) => http.get('order_inquiry_create', data)