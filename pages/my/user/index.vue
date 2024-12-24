<template>
	<view class="wrapper u-p-l-20 u-p-r-20 ">
		<u-navbar
			title="个人中心"
			bgColor="transparent"
			:fixed="false"
		>
			<view class="u-flex u-flex-items-center" slot="left">
				<view @click="handleGoto('/pages/my/user/settings')" class="step1 item u-p-10">
					<i class="custom-icon-shezhi1 custom-icon u-font-38"></i>
				</view>
				<view @click="handleGoto('/pages/my/msg/msg')" class="step2 item u-p-10" style="position: relative;">
					<i class="custom-icon-comment custom-icon u-font-40"></i>
					<u-badge absolute :offset="[5,3]" isDot :show="newMsg == '1'" bgColor="#ff2225"></u-badge>
				</view>
			</view>
		</u-navbar>
		<view class="step3 user u-flex u-flex-items-start u-p-20 u-p-t-50 u-m-b-26">
			
			<view class="user-img u-flex u-flex-items-center u-flex-center" @click="handleGoto('/pages/my/user/info')">
				<i class="custom-icon-myfill custom-icon"></i>
			</view>
			<view class="user-info u-flex-1" @click="handleGoto('/pages/my/user/info')">
				<template v-if="loading">
					<u-loading-icon></u-loading-icon>
				</template>
				<template v-else-if="login || myCpy.mobile">
					<view class="item u-flex u-flex-items-center">
						<view class="name u-line-1 u-font-38 step7">{{login || myCpy.mobile}}</view>
						<view v-if="myCpy.type" class="step8 sub text-white u-font-24 u-flex u-flex-items-center u-p-4 u-p-l-10 u-p-r-16 u-m-l-20">
							<text >{{myCpy.type | type2str}}</text>
						</view>
						<view 
							style="background: #f90;"
							v-if="myCpy.state == 0" class="sub text-white u-font-24 u-flex u-flex-items-center u-p-4 u-p-l-10 u-p-r-16 u-m-l-20">
							<text>{{myCpy.state | myCpyAuth2str}}</text>
						</view>
						<view 
							style="background: #d43a3a;"
							v-else-if="myCpy.state == 2" class="sub text-white u-font-24 u-flex u-flex-items-center u-p-4 u-p-l-10 u-p-r-16 u-m-l-20">
							<text>{{myCpy.state | myCpyAuth2str}}</text>
						</view>
					</view>
					<view class="item">
						<view class="sub2 u-font-28 step9 text-light u-flex u-flex-items-center">
							<text v-if="myCpy.name">{{myCpy.name}}</text>
							<text v-else>点击完善用户信息</text>
							<i class="custom-icon-edit custom-icon u-font-28 text-light u-m-l-10"></i>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="item u-flex u-flex-items-center">
						<view class="name u-line-1 u-font-38 step7">请先注册/登录</view>
					</view>
				</template>
				
			</view>
			<view>
				<view class="u-p-l-10 u-m-b-10 u-flex text-dark" @click="handleGoto('/pages/my/account/change_account')">
					<view class="u-p-r-10 ">切换</view>
					<u-icon name="arrow-right" color="#222" size="17"></u-icon>
				</view>
				<view class="dingyue-wrap " v-if="dingyue.zt == '1'">
					<u-button type="primary" plain shape="circle" @click="dingyueEvent" size="mini">{{dingyue.title}}</u-button>
				</view>
			</view>
			
		</view>
		
		<view class="user-item-box u-p-28 u-p-b-38 bg-white u-m-b-26 step4" v-if="menusAllData.role == 1">
			<view class="set-sub u-flex u-flex-items-center u-m-b-30 step10">
				<view class="sub-title u-flex u-flex-items-center u-p-l-16 u-p-r-16 bg-primary">
					<i class="text-white custom-icon-warn custom-icon"></i>
					<text class="text-white u-font-24 u-p-l-10">{{tips.tips_title}}</text>
				</view>
				<view @click="handleGoto(tips.tips_url)" class="sub-main u-flex u-flex-items-center u-flex-between u-p-l-10 u-p-r-10 u-flex-1">
					<text class="u-font-24">{{tips.tips_info}}</text>
					<i class="custom-icon-roundadd custom-icon"></i>
				</view>
			</view>
			<view class="set-main u-flex u-flex-between u-flex-items-center u-p-l-10 u-p-r-10">
				<view @click="handleGoto({url: '/pages/my/broker/edit', params: {pan: 'b'}})" class=" step11 item u-flex u-flex-between u-flex-items-center u-flex-1 u-p-r-40">
					<view class="item">
						<view class="u-font-34 u-p-b-4">发布买盘</view>
						<view class="u-font-26 text-light">挂牌采购商品</view>
					</view>
					<view class="item">
						<image class="mm-img" src="http://dingxiang.netsun.testwebsite.cn/public/img/icon2.png" mode=""></image>
					</view>
				</view>
				<view @click="handleGoto({url: '/pages/my/broker/edit', params: {pan: 's'}})" class=" step12 item u-flex u-flex-between u-flex-items-center u-flex-1 u-p-l-40 u-border-left" style="border-color: #f8f8f8!important;">
					<view class="item">
						<view class="u-font-34 u-p-b-4">发布卖盘</view>
						<view class="u-font-26 text-light">挂牌供应商品</view>
					</view>
					<view class="item">
						<image class="mm-img" src="http://dingxiang.netsun.testwebsite.cn/public/img/icon1.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 客户管理 远程控制 --> 
		<view class="user-item-box u-p-24 bg-white u-m-b-26 step5" v-if="menus_broker.hasOwnProperty('list') && menus_broker.list.length > 0">
			<view @click="handleGoto('/pages/my/customer/customer')" class="u-flex u-flex-items-center u-p-t-6 u-p-b-30  u-border-bottom" style="border-color: #dadbde!important;">
				<image style="width: 35px;height: 35px;" :src="menus_broker.icon" mode="scaleToFill"></image>
				<view class="item u-p-l-20">
					<view class="u-font-36">{{menus_broker.name}}</view>
					<view class="text-light u-font-26">{{menus_broker.title}}</view>
				</view>
			</view>
			<view class="step25 u-m-t-20">
				<u-scroll-list> 
					<view 
						v-for="(item, index) in menus_broker.list"
						:key="index"
						@click="handleMenusClick(item)" 
						class="item-broker u-p-10 u-p-l-20 u-p-r-20"
						>
						<image style="width: 40px;height: 40px;" :src="item.icon" mode="scaleToFill"></image> 
						<view class="u-p-t-15 u-font-26 " style="white-space: nowrap;color: #4d525d;">{{item.name}}</view>
					</view> 
				</u-scroll-list>
			</view> 
		</view>  
		<!-- 我的菜单列表 远程控制 -->
		<template v-if="menus_wd && menus_wd.length > 0">
			<view class="user-item-box u-p-t-30 u-p-b-20 bg-white u-m-b-26" v-for="(ele, i) in menus_wd" :key="i">
				<view class="box-header u-border-bottom u-flex u-flex-between u-p-b-14 u-p-l-30 u-p-r-30">
					<view class=" u-flex u-flex-items-end u-flex-items-center">
						<view class="u-font-34 u-flex u-flex-items-center">
							<image v-if="ele.icon" class="u-m-r-5" style="width: 15px;height:15px;" :src="ele.icon" mode=""></image>
							<text>{{ele.name}}</text>
						</view>
						<view class="text-light u-font-26 u-p-l-10" v-if="ele.title">{{ele.title}}</view>
					</view>
					<view class=" u-flex u-flex-items-center u-flex-items-center" v-if="ele.right_icon && ele.right_url">
						<image style="width: 20px;height:20px;" :src="ele.right_icon" mode="" @click="handleGoto(ele.right_url)"></image>
					</view>
				</view>
				<view class="box-row other-menus u-flex u-flex-wrap u-flex-items-center u-p-t-20 ">
					<view 
						class="item u-text-center u-m-t-15" 
						v-for="(item, index) in ele.list" 
						:key="index"
						@click="handleMenusClick(item)"
						>
						<image class="icon-img" :src="item.icon" mode=""></image>
						<text class="u-font-26 u-p-b-10 u-line-1 menus-name">{{item.name}}</text>
					</view>
				</view>
			</view>
		</template>
		
		<!-- 其他公告列表 远程控制 -->
		<template v-if="moreMenusNew && moreMenusNew.length > 0">
			<view class="user-item-box u-p-t-30 u-p-b-20 bg-white u-m-b-26" v-for="(ele, i) in moreMenusNew" :key="i">
				<view class="box-header u-border-bottom u-flex u-flex-items-end u-p-b-14 u-p-l-30 u-p-r-30">
					<view class="u-font-34">{{ele.name}}</view>
				</view>
				<view class="box-row other-menus u-flex u-flex-wrap u-flex-items-center u-p-t-20 ">
					<view 
						class="item u-text-center u-m-t-15" 
						v-for="(item, index) in ele.list" 
						:key="index"
						@click="handleMenusClick(item)"
						>
						<image class="icon-img" :src="item.icon" mode=""></image>
						<text class="u-font-26 u-p-b-10 u-line-1 menus-name">{{item.name}}</text>
					</view>
				</view>
			</view>
		</template>
		
		<xky-guideStep :step="step" :otherHeight="$u.sys().safeAreaInsets.top"></xky-guideStep>
		<u-safe-bottom></u-safe-bottom>
		<menusBar tabbar theme="white" :activeIndex="5" border></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import mixCheckLoginStatus from '@/config/mixCheckLoginStatus'
	export default {
		// mixins: [mixCheckLoginStatus],
		data() {
			return {
				loading: false,
				step:{
				    name:'wode_guide',
				    guideList: []
				},
				brokerList: [
					{
						title: '客户列表',
						icon: 'custom-icon-sort',
						url: '/pages/my/customer/customer',
						params: {},
						class: 'step13',
					},
					{
						title: '领取账号',
						icon: 'custom-icon-friendadd',
						flag: 1,
						func: 'handleTakeAccount',
						class: 'step14',
					},
					{
						title: '委托卖盘',
						icon: 'custom-icon-weituobiangeng',
						url: '/pages/my/broker/auth_list',
						params: {pan: 's'},
						class: 'step15',
					},
					{
						title: '委托买盘',
						icon: 'custom-icon-weituobiangeng',
						url: '/pages/my/broker/auth_list',
						params: {pan: 'b'},
						class: 'step16',
					},
					{
						title: '自主卖盘',
						icon: 'custom-icon-zu555',
						url: '/pages/my/customer/customer_pan_zz',
						params: {pan: 's'},
						class: 'step21',
					},
					{
						title: '自主买盘',
						icon: 'custom-icon-jinhuoqu',
						url: '/pages/my/customer/customer_pan_zz',
						params: {pan: 'b'},
						class: 'step22',
					},
					{
						title: '销售订单',
						icon: 'custom-icon-zu558',
						url: '/pages/my/customer/customer_order',
						params: {ordertype: 'S'},
						class: 'step23',
					},
					{
						title: '采购订单',
						icon: 'custom-icon-zu556',
						url: '/pages/my/customer/customer_order',
						params: {ordertype: 'B'},
						class: 'step24',
					},
					{
						title: '营销推送',
						icon: 'custom-icon-forward',
						url: '/pages/my/user/subscribe',
						params: {},
						class: 'step25',
					},
				], 
			};
		},
		computed: {
			...mapState({
				menusAllData: state => state.user.menusAllData, 
				myCpy: state => state.user.myCpy,
				login: state => state.user.login,
				auth: state => state.user.auth,
				dingyue: state => state.user.dingyue,
				sh: state => state.user.sh,
				sell_buy_show: state => state.user.sell_buy_show,
				moreMenus: state => state.user.moreMenus,
				moreMenusNew: state => state.user.moreMenusNew, 
				menus_broker: state => state.user.menus_broker, 
				menus_wd: state => state.user.menus_wd, 
				newMsg: state => state.user.newMsg, 
				bd: state => state.user.bd, 
				tips: state => state.user.tips, 
				wode_guide: state => state.user.wode_guide, 
				sino: state => state.sinopay.sino,
				sinoFundLoading: state => state.sinopay.sinoFundLoading,
			}),
		},
		async onLoad() {
			await this.wode()
			this.step.guideList = this.wode_guide.list
			if(!this.login) return
			if(!this.myCpy.id) {
				this.loading = true
				uni.showLoading({
					title: '获取最新用户信息中'
				})
				await this.myCompany()
				this.loading = false
			}else {
				this.myCompany()
			} 
			this.sendDingyue()
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				myCompany: 'user/myCompany',
				wode: 'user/wode',
				getSinoAccount: 'sinopay/getSinoAccount',
				sendDingyue: 'user/sendDingyue',
			}),
			async handleTakeAccount() {
				uni.showLoading()
				const res = await this.$api.addCustomer();
				if(res.code == 1) {
					uni.showToast({
						title: '成功领取账号'
					})
				}
				
			},
			async dingyueEvent() {
				uni.showLoading()
				const res = await this.$api.tmp_id_list();
				if(res.code == 1) {
					// this.tmp_id_list = res.list ;
					this.subApi(res.list)
					
				}
			},
			subApi(list) {
				wx.requestSubscribeMessage({
					tmplIds: list,
					success: async (res)=>{
						if(res.KIRbQmobnZlPo5OTgaMq6kHRI_zhpwVphn0mY42NeW8 == 'reject') return
						uni.showLoading()
						const res2 = await this.$api.tmp_id_back({
							params: {
								str: JSON.stringify(res)
							}
						})
						if(res2.code == 1) {
							uni.showToast({
								title: res2.msg,
								icon: 'none'
							})
						}
					}
				})
			},
			scrollListItemClick(item) {
				if(item.hasOwnProperty('url')) {
					this.handleGoto({
						url: item.url,
						params: item.params
					})
				}else if(item.flag == 1) {
					this[item.func]()
				}
			},
			handleMenusClick(item) {
				console.log(item)
				if(item.type == 1 ){
					uni.reLaunch({
						url: item.url
					})
				}
				else if(item.type == 2 ){
					uni.redirectTo({
						url: item.url
					})
				}
				else if(item.type == 3 ){
					uni.navigateTo({
						url: item.url
					})
				}
				
				
				
			}
		}
	}
</script>
<style lang="scss">
	page {
		min-height: 100vh;
		background-color: $page-bg2;
	}
</style>
<style lang="scss" scoped>
	.box-row .custom-icon {
		color: #333;
	}
	.t-label {
		font-size: 22px!important;
	}
	.item-broker {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.icon-w {
		width: 40px;
		height: 40px;
		border-radius: 20px;
		background-color: #e4eef9;
		.custom-icon {
			color: #0d266b;
		}
	}
	.other-menus {
		.item {
			flex: 0 0 25%;
			.icon-img {
				width: 22px;
				height: 22px;
			}
		}
	}
	.wrapper {
		padding-bottom: 50px;
		min-height: 100vh;
		box-sizing: border-box;
		background-image: linear-gradient(45deg, #eef1f6 75%, #d5fdf6 95%);
	}
	.menus-name {
		color: #666;
	}
	.ts-bg {
		background-image: linear-gradient(to bottom, #fef9f3, #fef7e3);
	}
	.user-item-box {
		border-radius: 18rpx;
		// box-shadow: 0 5rpx 10rpx rgba(90,90,90,.1);
		.set-sub {
			background-color: #eaf7ff;
			height: 28px;
			border-radius: 6rpx;
			overflow: hidden;
			.sub-title {
				height: 100%;
				border-radius: 0 4rpx 4rpx 0;
			}
			.sub-main {
				height: 100%;
				color: #5a86eb;
			}
		}
		.set-main {
			.mm-img {
				width: 36px;
				height: 36px;
				display: block;
			}
		}
	}
	.user {
		.user-img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 10px;
			background-color: #d0e7ff;
			.custom-icon {
				font-size: 22px;
				color: #86b0f8;
			}
		}
		.user-info {
			.name {
				
			}
			.sub {
				background-color: #7da5e2;
				background-image: linear-gradient(to right, #a1c3f7, #86b0f8);
				border-radius: 6rpx;
				white-space: nowrap;
			}
			.sub2 {
				
			}
		}
	}
	.user-data {
	}
</style>
