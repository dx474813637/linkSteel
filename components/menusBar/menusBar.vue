<template>
	<view class="tabbar" :style="{
		'boxShadow':  `0 0 10rpx rgba(${theme == 'white' ? '90,90,90,.4' : '0,0,0,.1'})`
	}">
		<u-tabbar
			:value="active"
			:inactiveColor="themeConfig.tabTextInactive"
			:activeColor="themeConfig.tabTextActive"
			:customStyle="style"
			:border="false"
		>
			
			<u-tabbar-item 
				:text="item.name" 
				:icon="item.icon" 
				v-for="item in list" 
				:key="item.name"
				@click="handleClick"
			>
				<image
					class="u-page__item__slot-icon"
					slot="active-icon"
					:src="item[`${theme}_icon_2`]"
				></image>
				<image
					class="u-page__item__slot-icon"
					slot="inactive-icon"
					:src="item[`${theme}_icon_1`]"
				></image>
			</u-tabbar-item>
				
		</u-tabbar>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		props: {
			theme: {
				type: String,
				default: 'white'
			},
			border: {
				type: Boolean,
				default: false
			},
			activeIndex: {
				type: Number,
				default: -1
			}
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				page: state => state.user.page,
			}),
			themeConfig() {
				return this.typeConfig[this.theme]
			},
			style() {
				return {
					backgroundColor: this.themeConfig.tabBg
				}
				
			},
			active() {
				// console.log(this.page)
				return this.list.findIndex((ele, index) => {
						if(this.page.route == '/pages/index/pan/pan') {
							// console.log(ele.route == this.page.route , ele.options.pan == this.page.options.pan)
							return ele.route == this.page.route && ele.options.pan == this.page.options.pan
						}else {
							return ele.route == this.page.route
						}
						
					})
			}
		},
		data() {
			return {
				list: []
			};
		}, 
		mounted() {
			let routeObj = getCurrentPages()[getCurrentPages().length - 1]
			// console.log(routeObj)
			this.setPage({
				route: uni.$u.page(),
				options: routeObj.options
			})
		},
		created() {
			this.getData();
		},
		methods: {
			...mapMutations({
				setMoreMenus: 'user/setMoreMenus',
				setMoreMenusNew: 'user/setMoreMenusNew',
				setWdMenus: 'user/setWdMenus',
				setBrokerMenus: 'user/setBrokerMenus',
				setDingyue: 'user/setDingyue',
				setNewMsg: 'user/setNewMsg',
				setPage: 'user/setPage',
				setBuySellShow: 'user/setBuySellShow',
				setMenusAllData: 'user/setMenusAllData',
			}),
			async getData() {
				const res = await this.$api.getMenus();
				if(res.code == 1) {
					this.list = res.list.map(ele => {
						let paramsStr = ele.url.split('?')[1] || ''
						let paramsObj = {}
						paramsStr.split('&').forEach(item => {
							paramsObj[item.split('=')[0]] = item.split('=')[1]
						})
						return {
							...ele,
							route: ele.url.split('?')[0],
							options: paramsObj
						}
					})
					this.setMenusAllData(res)
					this.setNewMsg(res.news)
					this.setDingyue(res.dingyue)
					this.setBrokerMenus(res.broker_memu)
					this.setWdMenus(res.new_memu_wd)
					this.setMoreMenusNew(res.new_memu)
					this.setMoreMenus({
						menusList: res.wd_memu,
						menusTitle: res.wd_memu_name,
						menusShow: res.wd_memu_show,
					})
					this.setBuySellShow(res.sell_buy_show)
				}
			},
			handleClick(index) {
				const item = this.list[index]
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
				else if (item.type == 4) {
					uni.navigateToMiniProgram({
						appId: item.url,
						success(res) {
							// 打开成功
						},
						complete(res1) {
							console.log(res1);
						}
					});
				}
				
				
				
			}
		}
	};
</script>
<style lang="scss">
	.tabbar {
		/deep/ .u-tabbar-item__icon {
			width: auto!important;
		}
	}
	
</style>
<style scoped lang="scss">
	.tabbar {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 50;
	}
	.u-page__item__slot-icon {
	    width: 17px;
	    height: 17px;
	}
</style>
