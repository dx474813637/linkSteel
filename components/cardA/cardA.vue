<template>
	<view >
		<view class="d-bk radius text-gray u-font-30 card-w" @click.stop="handleGotoDetail"
			:style="{
				backgroundColor: themeConfig.boxBg,
				color: themeConfig.pageTextSub,
				boxShadow: themeConfig.boxShadow,
				border: themeConfig.pan.border
			}"
		>	
			<view class="u-p-10" :style="{
				backgroundColor: themeConfig.boxBgTop
			}">
				<view class="u-flex u-flex-items-center u-flex-between">
					<view class="u-p-l-20 ppi_gray u-font-34 u-line-1"
						:style="{
							color: themeConfig.baseText,
							whiteSpace: 'nowrap',
							width: '90px',
							flex: '0 0 70px'
						}"
					>
						{{name}}
					</view>
					<view class="u-text-center u-p-20 text-yellow u-font-38 u-line-1"  
						:style="{
							color: themeConfig.dataText,
							whiteSpace: 'nowrap', 
						}">
						<template v-if="origin.trade_mode == '3'">
							{{origin.base_contract}}合约
							<template v-if="origin.price >= 0">+</template>
							{{origin.price}} 元/{{origin.unit}}
						</template>
						<template v-else-if="origin.trade_mode == '5'">
							询价
						</template>
						<template v-else> 
							{{price | price2str(dprice)}}
							<template v-if="price>0">元/{{unit}}</template>
						</template>
					</view>
					<view class="u-flex u-flex-items-center u-flex-end u-p-20"
					:style="{
						color: themeConfig.baseText,
						width: '90px'
					}">
						<!-- <view class="tims-btn"
							:style="{
								borderColor: themeConfig.pageTextSub,
								backgroundColor: themeConfig.pageBg
							}"
							@click.stop="handleTimesBtn"
						>
							<i class="custom-icon-tims custom-icon u-font-28"
								:style="{
									color: typeActive == 'dark'? '#bfc5e4' : '#777'
								}"
							></i>
						</view> -->
						<view class="tims-btn"
							:style="{
								borderColor: themeConfig.pageTextSub,
								backgroundColor: themeConfig.pageBg
							}"
							v-if="origin.weixin_pic"
							@click.stop="handleWxImgBtn"
						> 
							<u-icon name="weixin-fill" :color="typeActive == 'dark'? '#bfc5e4' : '#777'" size="24"></u-icon>
						</view>
						
					</view>
				</view>
				<view class="u-flex u-p-l-20 u-p-r-20 u-p-b-10 u-flex-between u-flex-items-center">
					<view class="">
						{{trade_type | tradeType}}
					</view>
					<view class="u-text-center"
					:style="{
						color: themeConfig.baseText
					}">
						{{amount}}{{unit}}
					</view>
					<view class="u-text-right">
						<template v-if="origin.trade_mode == '3'">
							截止{{express_time}} {{express_unit}}:00
						</template>
						<template v-else>
							{{express_time}}{{express_unit | expressUnit}}有效期
						</template> 
					</view>
				</view>
			</view>
			<view :class="{'u-p-l-20': typeActive == 'white', 'u-p-b-20': typeActive == 'white', 'u-p-r-20': typeActive == 'white', 'radius': typeActive == 'white'}">
				<view class="u-p-10 u-font-28" :style="{
					backgroundColor: themeConfig.boxBgBottom
				}">
					<view class="u-flex">
						<view class="u-flex-1  lbdq">规格</view>
						<view class="u-flex-4 u-m-10 u-line-1 ppi_gray" :style="{
							color: themeConfig.pageText
						}">
							{{spec}}
						</view>
					</view>
					<view class="u-flex" v-if="trade_type == 1">
						<view class="u-flex-1  lbdq">交收期</view>
						<view class="u-flex-4 u-m-10 u-line-1 ppi_gray" :style="{
							color: themeConfig.pageText
						}">
							{{origin.settle_month}}月 {{origin.settle_date | date2szx}}
						</view>
					</view>
					<view class="u-flex">
						<view class="u-flex-1  lbdq">交货地</view>
						<view class="u-flex-4 u-m-10 ppi_gray">
							<view class="u-flex">
								<view class="u-flex-1 u-line-1" :style="{
									color: themeConfig.pageText
								}">
									{{delivery_place}}
								</view>
								<view class="u-p-l-20" :style="{
									color: themeConfig.pageTextSub
								}">
									{{ pubDate | date2timestamp | timeFrom}}发布
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view> 
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name:"cardA",
		props: {
			origin: {
				type: Object,
				default: () => {
					return {}
				}
			},
			pid: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			amount: {
				type: String,
				default: ''
			},
			price: {
				type: String,
				default: ''
			},
			dprice: {
				type: String,
				default: ''
			},
			express_time: {
				type: String,
				default: ''
			},
			express_unit: {
				type: String,
				default: ''
			},
			trade_type: {
				type: String,
				default: ''
			},
			unit: {
				type: String,
				default: ''
			},
			spec: {
				type: String,
				default: ''
			},
			delivery_place: {
				type: String,
				default: ''
			},
			pubDate: {
				type: String,
				default: ''
			},
			tims: {
				type: Object,
				default: () => ({})
			},
			theme: {
				type: String,
				default: ''
			}
			
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
				typeConfig: state => state.theme.typeConfig,
				sh: state => state.user.sh
			}),
			themeConfig() {
				return this.typeConfig[this.theme || this.typeActive]
			},
		},
		data() {
			return {
				wxImgShow: false,
			};
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			handleGotoDetail() {
				this.$emit('detail', {id: this.pid, origin: this.origin})
				
			},
			handleWxImgBtn() { 
				this.$emit('showWxImg', { wx_img: this.origin.weixin_pic })
			},
			handleTimesBtn() {
				this.$emit('tims', {tims: this.tims, id: this.pid, origin: this.origin})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tims-btn {
		// border: 1rpx solid #e7e7e7;
		border-radius: 20rpx;
		padding: 3px 10px;
		
	}
	.radius {
		border-radius: 16rpx;
		overflow: hidden;
	}
	.lbdq {
		text-align: justify;
		text-align-last: justify;
		padding: 10rpx 10rpx 10rpx 20rpx;
	}

	.ppi_gray {
		color: $page-text;
	}

	.text-gray {
		color: $page-text-sub;
	}
	.text-light {
		color: #ccd4d4;
	}

	.text-yellow {
		color: #7eecec;
	}

	.text-red {
		color: #d04343;
	}

	.text-green {
		color: #6fd2a3;
	}
</style>
