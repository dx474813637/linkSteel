<template>
	<view class="wrap u-p-20 u-p-t-10 u-p-b-10 u-font-28"
		:style="{
			backgroundColor: themeConfig.pan.boxBg, 
			color: configColor.baseText
		}"
	>
		<view class="u-flex u-flex-between u-flex-items-start u-p-20 u-p-t-10 u-p-b-10" >
			<view>{{item.Company.name}} - {{item.Company.contact}}</view>
			<view
				class="u-m-l-10"
				:style="{ 
					color: configColor.stateText,
					'white-space': 'nowrap'
				}"
			>{{pw_curr_page | bidState2Str(item, panData)}}</view>
		</view>
		<view class="u-flex u-flex-between u-flex-items-center u-p-20 u-p-t-10 u-p-b-10">
			<view>单：{{item.unit_price1}}元/{{unit}}</view>
			<view>量：{{item.amount}}{{unit}}</view>
			<view>总：{{item.price1}}元</view>
		</view> 
		<view class="u-flex u-flex-between u-flex-items-center u-p-20 u-p-t-10 u-p-b-10">
			<view :style="{
			color: themeConfig.pan.pageTextSub,  
		}">{{item.ctime}}</view> 
		</view> 
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name:"jpCard",
		props: {
			item: {
				type: Object,
				default: () => {
					return {}
				}
			},
			panData: {
				type: Object,
				default: () => {
					return {}
				}
			},
			theme: {
				type: String,
				default: ''
			},
			unit: {
				type: String,
				default: 'unit'
			},
			pw_curr_page: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
				typeConfig: state => state.theme.typeConfig,
			}),
			...mapGetters({ 
				echartsConfig: 'theme/echartsConfig',
				sys: 'theme/sys'
			}), 
			themeConfig() {
				return this.typeConfig[this.theme || this.typeActive] 
			},
			configColor() {
				let config_success = {
					baseText: this.themeConfig.pan.baseText,
					stateText: '#fb4242'
				}
				let config_base = {
					baseText: this.themeConfig.pan.baseText,
					stateText: this.themeConfig.pan.baseText
				}
				let config_fail = {
					baseText: this.themeConfig.pan.pageTextSub,
					stateText: this.themeConfig.pan.baseText
				}
				if(this.pw_curr_page == 1) {
					if(this.panData.Bid_role.is_darkmark) {
						if(this.panData.Bid_role.left_etime < 0) {
							if(this.item.order_id) return config_success
							else return config_fail
						}
						else return config_base
					} 
					else {
						if(this.item.order_id) {
							return config_success
						}
						else if(this.item.is_valid) {
							return config_success
						}
						else return config_fail
					}
				}
				else return config_fail
			}
		},
	}
</script>

<style lang="scss" scoped>
	.wrap {
		box-shadow: 0 0 10px rgba(0,0,0,.1);
	}
</style>