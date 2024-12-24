const type2str = v => {
	if(v == 'B') return '企业用户'
	else if(v == 'C') return '个人用户'
	else return v
}
const orderType2str = v => {
	if(v == '1') return '线上支付'
	else if(v == '2') return '线下支付'
	else return v
}
const settleType2str = v => {
	if(v == 'D_P') return '款到发货'
	// else if(v == 'GRT') return '担保支付'
	else if(v == 'COD') return '货到付款'
	else return v
}
const paymode2str = v => {
	if(!v) return v
	else if(v.includes('NOPAY')) return '线下凭证' 
	else if(v.includes('FUNDPAY')) return '银企付' 
	else if(v.includes('LOANPAY')) return '融资' 
	else if(v.includes('CREDITPAY')) return '赊账' 
	else return v
}
const paystate2str = v => {
	if(v == '0') return '待支付'
	else if(v == '1') return '1' 
	else return v
}
const myCpyAuth2str = v => {
	if(v == '0') return '审核中'
	else if(v == '1') return '审核成功' 
	else if(v == '2') return '平台灭活' 
	else return v
}
const mdu2Str = v => {
	if(v == 'M') return '生产商'
	else if(v == 'D') return '经销商'
	else if(v == 'U') return '下游用户'
	else return v
}
const mduState2Str = v => {
	if(v == '0') return '待确认'
	else if(v == '1') return '已确认'
	else if(v == '2') return '不通过'
	else return v
}
// state 绑定状态（1：等待绑定:2：绑定成功；3：已解除；4：绑定失败）
// auth_state 认证状态（0：未认证: 1：已认证）

const sinoState2str = v => {
	if(v == '1') return '等待绑定'
	else if(v == '2') return '绑定成功'
	else if(v == '3') return '已解除'
	else if(v == '4') return '绑定失败'
	else return v
}
const sinoAuthState2str = v => {
	if(v == '0') return '未认证'
	else if(v == '1') return '已认证' 
	else return v
}

//采购/销售交易订单（order）状态：
const orderState2Str = (v, order_type) => { 
	if(v == '0') return '发起中'
	else if(v == '1') return '已完成'
	else if(v == '2') return '已拒绝'
	else if(v == '3') return '已取消'
	else if(v == '4') return '订立中'
	else if(v == '5') return '已了结'
	else if(v == '6') {
		return '待支付'
		// if(order_type == '1') return '待支付'
		// else return '已订立'
	}
	else if(v == '7') return '支付中'
	else if(v == '8') return '待发货'
	else if(v == '9') return '待收货'
	else if(v == '11') return '待支付尾款' 
	else if(v == '21') return '合同废止中' 
	else if(v == '22') return '合同已废止' 
	else if(v == '31') return '过期未支付取消' 
	else if(v == '40') return '签约待协商'
	else if(v == '41') return '签约协商中'
	else if(v == '42') return '待签约'
	else if(v == '43') return '签约中'
	else if(v == '44') return '签约前锁定'
	else if(v == '49') return '基差待审核'
	else if(v == '48') return '基差审核拒绝'
	else if(v == '47') return '基差待发送' 
	else if(v == '51') return '了结中' 
	else if(v == '89') return '待折扣审核' 
	else if(v == '81') return '锁定中' 
	else return v
}
//现金支付（pay  fund）状态：
const payFundState2Str = v => {
	if(v == '5') return '支付成功'
	else if(v == '6') return '支付失败'
	
	else if(v == '14') return '监管中'   //（直接）
	else if(v == '10') return '待支付'   //（直接）
	else if(v == '11') return '支付中'   //（直接）
	
	else if(v == '13') return '监管中'   //（担保）
	else if(v == '0') return '待支付'   //（担保）
	else if(v == '1') return '支付中'   //（担保）
	else if(v == '3') return '等待收货'   //（担保）
	else if(v == '4') return '确认支付中'   //（担保）
	else if(v == '9') return '已冻结'   //（担保）
	
	else if(v == '2') return '退款中'   //（担保）
	else if(v == '7') return '已全额退款'   //（担保）
	else if(v == '8') return '已部分退款'   //（担保）
	else return v
}

//票据支付（pay  bill）状态：
const payBillState2Str = v => {
	if(v == '0') return '等待支付'
	else if(v == '1') return '票付申请中'
	else if(v == '2') return '财务已确认'
	else if(v == '3') return '财务已拒绝 支付失败可重新发起'
	else if(v == '4') return '票据支付中'
	else if(v == '5') return '票据已取消'
	else if(v == '6') return '票据已锁定'
	else if(v == '13') return '票据可签收'
	else if(v == '8') return '支付已完成 支付成功'
	else if(v == '21') return '支付失败'
	else return v
}

const bankcardState2Str = v => {
	if(v == '1') return '已绑定'
	else if(v == '2') return '绑定失败'
	else if(v == '3') return '已解绑' 
	else if(v == '0') return '未验证' 
	else return v
}

const tixianState2Str = v => {
	if(v == '0') return '等待提现'
	else if(v == '1') return '提现成功'
	else if(v == '2') return '提现失败' 
	else if(v == '3') return '提现中'  
	else if(v == '4') return '已取消'
	else if(v == '6') return '已过期' 
	else if(v == '10') return '等待审核' 
	else return v
} 
const wyczState2Str = v => {
	if(v == '0') return '未提交'
	else if(v == '1') return '充值成功'
	else if(v == '2') return '充值失败' 
	else if(v == '3') return '充值中'  
	else if(v == '4') return '订单异常'
	else if(v == '5') return '订单冲正' 
	else if(v == '10') return '预约充值中' 
	else return v
}
const zzState2Str = v => {
	if(v == '0') return '等待转账'
	else if(v == '1') return '转账成功'
	else if(v == '2') return '转账失败' 
	else if(v == '3') return '转账中'  
	else if(v == '4') return '已取消' 
	else if(v == '9') return '等待提交' 
	else return v
}



//时间简写 转 中文  'd'==>'天'  'h'==>'小时'
const expressUnit = v => {
	if(v == 'd') return '天'
	else if(v == 'h') return '小时'
	else return v
}
//过滤商品属性值用于显示
const filterAttributes = v => {
	if(!v || v.length == 0) return ''
	return v.filter(ele => ele.code == 'attr_common_11' || ele.code == 'attr_common_12')
			.reduce((pre, item, index) => {
				let str = '';
				if(item.code == 'attr_common_12') str += '规格属性：'
				else if(item.code == 'attr_common_11') str += '品牌/产地：'
				
				return `${pre}${str}${item.value}。`
			}, '')
}
//时间日期 转 时间戳
const date2timestamp = v => {
	if(!v) return ''
	return new Date(v.replace(/-/g, "/")).getTime()
}
//现货类型 1合约 2即期
const tradeType = v => {
	if(v == '1') return '合约现货'
	else if(v == '2') return '即期现货'
	else return v
}
//现货类型 1合约 2现货
const tradeType2 = v => {
	if(v == '1') return '合约'
	else if(v == '2') return '现货'
	else return v
}
//2 上中下旬
const date2szx = v => {
	if(v == 'ftd') return '上旬'
	else if(v == 'mtd') return '中旬'
	else if(v == 'ltd') return '下旬'
	else return v
}
//B:买家自提 S:卖家送货 BS:买家自提/卖家送货
const settleMode = v => {
	if(v == 'B') return '买家自提'
	else if(v == 'S') return '卖家送货'
	else if(v == 'BS') return '买家自提/卖家送货'
	else return v
}

const postType2fbr = v => {
	if(v == '1') return '撮合员'
	else return '交易商'
}
const auth2str = v => {
	if(v == 1) return '撮合员'
	else if(v == 0)  return '交易商'
	else return ''
}

const price2str = (price, dprice) => {
	if(price != 0) return price;
	if(!dprice) return '议价'
	else return '公式价'
}

const chatTimeFilter = (v, flag) => {
	if(!flag) v = v*1000
	// console.log(v)
	if(!v) return uni.$u.timeFormat(new Date().getTime(), 'yyyy年mm月dd日 hh:MM')
	const yesterday_start = new Date(new Date(new Date() - 24*60*60*1000).toLocaleDateString()).getTime()
	const yesterday_end = new Date(new Date().toLocaleDateString()).getTime()
	const cur_year = new Date(`${new Date().getFullYear()}/01/01`).getTime()
	if(v >= yesterday_end) return uni.$u.timeFormat(v, 'hh:MM')
	else if(v >= yesterday_start) return '昨天 ' + uni.$u.timeFormat(v, 'hh:MM')
	else if(v >= cur_year) return uni.$u.timeFormat(v, 'mm月dd日 hh:MM')
	else  return uni.$u.timeFormat(v, 'yyyy年mm月dd日 hh:MM')
	
	// new Date().getTime() - new Date(new Date().toLocaleDateString()).getTime()


}

const tradeM2str = v => {
	if(v == 'abs') return '指数监测'
	else if(v == 'price')  return '价格监测'
	else return v
}
const bidTradeM2str = v => {
	if(v == '0') return '议价'
	else if(v == '1')  return '竞拍'
	else if(v == '2')  return '一口价'
	else if(v == '3')  return '基差'
	else if(v == '5')  return '询价'
	else return v
}

const bid_subscribe2Str = v => {
	if(v == '0') return '待审核'
	else if(v == '1')  return '预约成功'
	else if(v == '2')  return '预约成功（有保证金）'
	else if(v == '3')  return '已取消'
	else if(v == '4')  return '审核拒绝'
	else return v
}
const bid_join2Str = (v, data) => {
	if(v == '0') return '待审核'
	else if(v == '1')  {
		if(data.hasOwnProperty('order_id') && data.order_id) return '竞拍成功'
		else return '竞拍失败'
	}
	else if(v == '2')  return '审核拒绝'
	else if(v == '3')  return '取消'
	else if(v == '4')  {
		if(data.Trade.Bid_role.is_bid_end == '1') return '竞拍结束'
		if(data.Trade.Bid_role.is_biding == '1') return '竞拍中'
		if(data.Trade.Bid_role.is_bid_begin == '1') return '竞拍中'
		return '待竞拍'
	}
	else return v
}
// state=0  
//    待审核
// state=1 
//    如果order_id存在：竞拍成功
//    如果order_id为空：竞拍失败
// state=2
//    审核拒绝
// state=3
//    取消
// state=4
//    如果Trade数组里的Bid_role数组的is_bid_end=1：竞拍结束
//    如果Trade数组里的Bid_role数组的is_biding=1：竞拍中
//    如果Trade数组里的Bid_role数组的is_bid_begin=1：竞拍中
//    否则：待竞拍


const bidState2Str = (v, data, panData) => {
	// if(data.is_success == 1) return '成交'
	// else if(data.is_valid == 1) return '领先'; 
	// else return '失效' 
	if(v == 1) {
		if(panData.Bid_role.is_darkmark) {
			if(panData.Bid_role.left_etime < 0) {
				if(data.order_id) return '成交' 
				else return '失效' 
			}
			else return '竞价中'  
		} 
		else {
			if(data.order_id) {
				return '成交' 
			}
			else if(data.is_valid) {
				return '领先' 
			}
			else return '失效' 
		}
	}
	else return '失效' 
}


const order_settle_pay_user = v => {
	if(v == '1') return '买方'
	else if(v == '2')  return '卖方' 
	else return v
}

const diffRes = v => {
	if(v > 0) return '买方补交'
	else if(v < 0)  return '卖方退还' 
	return '无'
}

const esignAgentState = v => {
	if(v == '1') return '未认证'
	else if(v == '2')  return '已认证' 
	else if(v == '4')  return '已失效' 
	return v
}

const esignOrganizationsState = v => {
	if(v == '1') return '未认证'
	else if(v == '2')  return '已认证' 
	else if(v == '4')  return '已失效' 
	return v
}

const esignType2Str = v => {
	if(v == '0') return '不允许签约'
	else if(v == '1')  return '线上签约' 
	else if(v == '2')  return '自动签约' 
	return v
}
const esignState2Str = v => {
	if(v == '0') return '未提交'
	else if(v == '1')  return '已创建' 
	else if(v == '2')  return '已开启' 
	else if(v == '3')  return '已签约' 
	else if(v == '4')  return '签约协商中' 
	else if(v == '5')  return '协商失败'  
	return v
} 
const esignAutoState2Str = v => {
	if(v == '0') return '待确认'
	else if(v == '1')  return '待开启' 
	else if(v == '2')  return '授权中' 
	else if(v == '3')  return '已授权' 
	else if(v == '4')  return '失败' 
	else if(v == '5')  return '已过期'  
	return v
} 

export default {
	esignAutoState2Str,
	esignState2Str,
	type2str,
	expressUnit,
	date2timestamp,
	tradeType,
	tradeType2,
	settleMode,
	date2szx,
	postType2fbr,
	auth2str,
	price2str,
	filterAttributes,
	chatTimeFilter,
	orderState2Str,
	orderType2str,
	bankcardState2Str,
	payFundState2Str,
	payBillState2Str,
	settleType2str,
	paymode2str,
	paystate2str,
	tixianState2Str,
	wyczState2Str,
	zzState2Str,
	mdu2Str,
	mduState2Str,
	sinoAuthState2str,
	sinoState2str,
	myCpyAuth2str,
	tradeM2str,
	bid_subscribe2Str,
	bid_join2Str,
	bidTradeM2str,
	bidState2Str,
	order_settle_pay_user,
	diffRes,
	esignAgentState,
	esignOrganizationsState,
	esignType2Str
}