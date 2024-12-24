<template>
	<view class="card-wrapper" v-if="show == 1">
		<view class="card-title u-flex u-flex-items-center u-flex-between u-p-10 u-m-b-12">
			<view class="item u-flex u-flex-items-center">
				<i class="custom-icon u-font-40" :class="[icon]" :style="{color: themeConfig.followCard.iconText}"></i>
				<text class="u-p-l-10" :style="{color: themeConfig.followCard.titleText}">{{textConfig.name1}}</text>
			</view>
			<view @click="handleClickSetting"  class="item u-flex u-flex-items-center" :style="{color: themeConfig.followCard.subText}">
				<text class="u-font-28 u-p-r-10">更多</text>
				<i class="custom-icon custom-icon-category u-font-28" ></i>
			</view>
		</view>
		<view class="card-content" :style="{
			boxShadow: themeConfig.boxShadow
		}">
			<view class="u-p-20" :style="{
					backgroundColor: themeConfig.followCard.boxTopBg
				}">
				<view class="card-tabs">
					<u-tabs
						:list="tabs"
						:current="tabs_current"
						lineHeight="0"
						:activeStyle="{...activeTabsStyle, color: themeConfig.tabTextActive}"
						:inactiveStyle="{ color: themeConfig.tabTextInactive}"
						:itemStyle="itemTabsStyle"
						@change="handleTabsChange"
					></u-tabs>
				</view>
				<template v-if="loading">
					<view class="u-p-20">
						<u-loading-icon
							mode="circle" 
							size="28" 
							text="获取数据中..."
							:color="themeConfig.followCard.indicatorColor" 
							:inactiveColor="themeConfig.followCard.indicatorActiveColor" 
							vertical
						></u-loading-icon>
					</view>
				</template>
				<view v-else-if="content && content.length > 0" class="u-s-l-wrap">
					<view class="s-l-label u-font-26 u-flex u-flex-items-center u-flex-center"
						:style="{
							background: themeConfig.followCard.labelBg,
							color: themeConfig.followCard.labelColor
						}"
					>
						<view class="l-text">向左滑动</view>
					</view>
					<u-scroll-list
						:indicatorColor="themeConfig.followCard.indicatorColor"
						:indicatorActiveColor="themeConfig.followCard.indicatorActiveColor"
						>
						<view class="card-tabs-list u-flex u-flex-items-center">
							<view class="item-card u-p-20 u-p-l-30 u-p-r-30 u-m-r-20"
								v-for="(item, index) in content"
								:key="item.id"
								:style="{
									backgroundColor: themeConfig.followCard.boxCardBg
								}"
								@click="handleGoto({url: '/pages/index/pan/panDetail', params: {pan: item.trade == 'sell'? 's': 'b', id: item.id}})"
							>
								<view class="u-flex u-flex-items-baseline u-m-b-10">
									<text class="u-font-30" :style="{color: item.trade == 'sell'? themeConfig.warn: themeConfig.error}">{{item.trade == 'sell'? '卖': '买'}}</text>
									<text class="u-font-30 u-line-1 u-p-l-10" :style="{color: themeConfig.followCard.baseText}">{{item.name}}</text>
									<text class="u-font-26 u-p-l-10" :style="{color: themeConfig.followCard.subText, whiteSpace: 'nowrap'}">{{item.trade_type | tradeType2}}</text>
								</view> 
								<view class="u-font-32 u-m-b-10 u-line-1" :style="{color: item.trade == 'sell'? themeConfig.warn: themeConfig.error}" >
									
									<!-- <template v-if="item.trade_mode == '3'">
										<text>基差</text> 
									</template>
									<template v-else>
										<text>{{item.price | price2str(item.dprice)}}</text>
										<text class="u-font-28 u-p-l-10" v-if="item.price>0">元/{{item.unit}}</text>
									</template> -->
									
									<text class="u-font-28">
										{{item.base_contract}}
										<template v-if="item.price >= 0">+</template>
									 	{{item.price}} 
									</text>
								</view>
								<view class="u-p-4 u-p-r-16 u-p-l-16 u-font-22" :style="{
									color: themeConfig.followCard.btnText,
									backgroundColor: themeConfig.followCard.btnBg,
									borderRadius: '30rpx',
									display: 'inline-block'
								}">查看详情</view>
							</view>
							
						</view>
					</u-scroll-list>
				</view>
				
				<template v-else>
					<u-empty
						mode="data"
						:icon="themeConfig.empty"
						width="80"
						height="80"
						:textColor="themeConfig.followCard.indicatorColor"
					>
					</u-empty>
				</template>
			</view>
			<!-- <view class="u-p-20 " :style="{
				borderTop: typeActive == 'white' ?'1rpx solid #f8f8f8': '',
				backgroundColor: typeActive == 'white' ? '#fff' : themeConfig.followCard.boxBottomBg
				}" >
				<view class="u-flex u-flex-items-center" @click="handleGoSubmitPan"
					:style="{
						color: themeConfig.followCard.boxBottomText
					}"
				>
					<i class="custom-icon-roundadd custom-icon u-font-28"></i>
					<text class="u-font-28 u-p-l-10">{{textConfig.name2}}</text>
				</view>
			</view> -->
		</view>
		 
	
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name:"panBaseCard",
		props: {
			name: {
				type: String,
				default: 'name'
			},
			list: {
				type: Array,
				default: () => []
			},
			icon: {
				type: String,
				default: ''
			},
			pan: {
				type: String,
				default: 's'
			},
			show: {
				type: String | Number,
				default: 0
			},
			jpList: {
				type: Array,
				default: () => []
			}, 
			textConfig: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				tabs: [],
				tabs_current: 0,
				activeTabsStyle: {
					fontSize: '30rpx',
					color: '#fff',
					fontWeight: 'bold',
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px'
				},
				loading: false,
			};
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				echartsConfig: 'theme/echartsConfig',
				sys: 'theme/sys'
			}),
			content() {
				return this.tabs[this.tabs_current]?.children
			},
		},
		watch: {
			list: {
				immediate: true,
				handler(n, o) {
					this.tabs = this.list.map(ele => {
						return {
							name: ele.name,
							id: ele.id,
							disabled: false,
							children: []
						}
					})
					
				}
			},
			tabs: {
				handler(n) {
					if(n.length > 0) {
						this.getData()
					}
				}
			},
			
		}, 
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			ceshi() {
				console.log(this.$refs)
			},
			async getData() {
				this.loading = true
				const res = await this.$api.list_basis({
					params: {
						standard: this.tabs[this.tabs_current].id,
						p: 1,
						index: 1
					}
				})
				this.loading = false
				if(res.code == 1) {
					this.tabs[this.tabs_current].children = res.list
				}
			},
			handleTabsChange(obj) {
				this.tabs_current = obj.index;
				this.getData()
			},
			handleGoSubmitPan() {
				uni.navigateTo({
					url: `/pages/my/broker/edit?pan=${this.pan}`
				})
			},
			handleClickSetting() {
				// this.$emit('settingClick', {pan: this.pan})
				this.handleGoto('/pages/index/pan/panBasis')
			},
			onChange(e, item) { 
				this.$emit('changeTimeData', {data: e, item})
				
			},
			onJpTimeFinish(item, refs_name) {
				this.$emit('finishTime', {data: item, refs_name}) 
			},
		}
	}
</script>

<style lang="scss">
	.card-tabs-list {
		.item-card {
			min-width: 160px;
			border-radius: 10rpx;
		}
	}
	
</style>
<style lang="scss" scoped>
	.jp-list {
		.jp-time-box {
			border-radius: 10px;
			
		}
	}
	.time {
	    @include flex;
	    align-items: center;
	
	    &__item { 
	         font-size: 15px;
	         text-align: center;
	     }
	}
	.u-s-l-wrap {
		position: relative;
		.s-l-label {
			position: absolute;
			right: 0;
			top: 0;
			height: 90px;
			width: 25px;
			z-index: 10;
			color: #ccc;
			border-radius: 5px 0 0 5px;
			// background: linear-gradient(to right, rgb(16 17 35 / 58%), #111224);
			.l-text {
				writing-mode: vertical-rl;
				letter-spacing: 2px;
			}
		}
	}
	.card-content {
		overflow: hidden;
		border-radius: 20rpx;
	}
	
</style>
