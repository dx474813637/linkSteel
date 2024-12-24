<template>
	<view @click="handleGotoDetail">
		<view class="u-p-10 u-radius-8 " style="background-color: #eaf2ff;">
			<view class="u-flex u-flex-between u-flex-items-center u-font-28 u-p-b-10 u-p-l-20 u-p-r-20 text-thin">
				<view class="item">
					{{trade_type | tradeType}}
				</view>
				<view class="item">
					数量：{{amount}}{{unit}} 
				</view>
			</view>
			<view class="bg-white u-p-10 bg-white u-radius-8">
				<view class="u-p-10 u-flex u-flex-items-center u-border-bottom u-p-b-24" style="border-color: #eee!important">
					<view class="item u-flex-column u-flex-center u-flex-items-center" style="color: #f00; flex: 0 0 80px">
						<template v-if="origin.trade_mode == '3'">
							<view class="u-font-28 u-line-1">{{origin.base_contract}}合约</view>
							<view class="u-font-26">
								<template v-if="origin.price >= 0">+</template>
								{{origin.price}} 元/{{origin.unit}}
							</view> 
						</template>
						<template v-else-if="origin.trade_mode == '5'">
							询价
						</template>
						<template v-else> 
							<view class="u-font-40 u-line-1">{{price | price2str(dprice)}}</view> 
							<view class="u-font-26" v-if="price>0">
								元/{{unit}} 
							</view>
						</template>
					</view>
					<view class="item u-flex-1 u-border-left u-flex-column u-flex-center u-p-l-20 u-m-l-10" style="border-color: #eee!important;">
						<view class="u-font-34 u-m-b-10 u-line-1">{{name}}</view>
						<view class="u-flex u-flex-items-center u-flex-between u-font-28"> 
							<view class="item u-flex-1 u-line-1 text-thin">{{spec}}</view>
							<view class="u-m-l-20"
								:style="{
									color: themeConfig.baseText, 
								}">
								<view class="tims-btn"
									:style="{
										borderColor: '1rpx solid #eee', 
									}"
									@click.stop="handleTimesBtn"
								>
									<i class="custom-icon-tims custom-icon u-font-28"
										:style="{
											color: '#999'
										}"
									></i>
								</view>
								
							</view>
						</view>
					</view>
				</view>
				<view class="u-p-t-10 u-p-l-20 u-p-r-20 u-flex u-flex-items-center u-flex-between u-font-28 text-thin">
					<view class="item">
						交货地：{{delivery_place}}
					</view>
					<view class="item u-flex u-flex-items-center">
						<!-- {{ pubDate | date2timestamp | timeFrom}}发布 -->
						<u-icon name="clock" size="16" color="#04addc"></u-icon>
						<text class="u-m-l-10">
							<template v-if="origin.trade_mode == '3'">
								截止{{express_time}} {{express_unit}}:00
							</template>
							<template v-else>
								{{express_time}}{{express_unit | expressUnit}}有效期
							</template> 
						</text> 
					</view>
				</view>
				<view class="u-p-20 u-flex u-flex-items-center u-flex-between u-font-28 text-thin" v-if="me == 1">
					<view class="item" @click.stop="goto(1)">
						<u-button :customStyle="{width: '150px'}" type="primary" plain v-if="origin.Da_company_trade_mode == '0'">担保交易</u-button>
					</view> 
					<view class="item" @click.stop="goto()">
						<u-button :customStyle="{width: '150px'}" type="primary" plain v-if="origin.Da_company_trade_mode == '1' || origin.Da_company_trade_mode == '0'">直接交易</u-button>
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
			},
			me: {
				type: String | Number,
				default: '0'
			},
			isFx: {
				type: String | Number,
				default: '0'
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
				
			};
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			handleGotoDetail() {
				if(this.isFx == '1') {
					this.goto(1)
					return
				}
				this.$emit('detail', {id: this.pid, origin: this.origin})
				
			},
			handleTimesBtn() {
				this.$emit('tims', {tims: this.tims, id: this.pid, origin: this.origin})
			}, 
			goto(type) { 
				this.handleGoto({
					url: '/pages/index/pan/panDetail',
					params: {
						id: this.origin.sell_id, 
						fxid: this.origin.id, 
						pan:'s',
						trade_mode: type
					}
				})  
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tims-btn {
		border: 1rpx solid #e7e7e7;
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
