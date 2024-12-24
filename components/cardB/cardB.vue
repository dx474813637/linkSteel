<template>
	<view>
		<view class="d-bk radius text-gray u-font-30" @click="handleGotoDetail"
			:style="{
				backgroundColor: themeConfig.boxBg,
				color: themeConfig.pageTextSub,
				boxShadow: themeConfig.boxShadow
			}"
		>	
			<view class="u-p-10" :style="{
				backgroundColor: themeConfig.boxBgTop
			}">
				<view class="u-flex u-flex-items-center u-flex-between">
					<view class=" u-p-20 ppi_gray u-font-34 u-line-1"
						:style="{
							color: themeConfig.baseText,
							width: '90px',
							whiteSpace: 'nowrap'
						}"
					>
						{{name}}
					</view> 
					<view class="u-text-center u-p-20 text-yellow u-font-38"  
						:style="{
							color: themeConfig.dataText,
							whiteSpace: 'nowrap', 
						}">
						<template v-if="origin.trade_mode == '3'">
							基差
						</template>
						<template v-else> 
							{{price | price2str(dprice)}}
							<template v-if="price>0">元/{{unit}}</template>
						</template>
					</view>
					<view class="u-flex u-flex-items-center u-flex-end u-p-20" :class="color"
					:style="{
						width: '90px'
					}">
						<template v-if="is_zd>0">+</template>{{is_zd}}
					</view>
				</view>
				<view class="u-flex u-p-l-20 u-p-r-20 u-p-b-10 u-flex-between u-flex-items-center">
					<view class="">
						{{cname}}
					</view>
					<view class=" u-text-center">
						报价
					</view>
					<view class=" u-text-right">
						升贴水
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
							{{intro}}
						</view>
					</view>
					<view class="u-flex">
						<view class="u-flex-1  lbdq u-line-1">报价企业</view>
						<view class="u-flex-4 u-m-10 u-line-1 ppi_gray" :style="{
							color: themeConfig.pageText
						}">
							{{place_company}}
						</view>
					</view>
					<view class="u-flex">
						<view class="u-flex-1  lbdq">交货地</view>
						<view class="u-flex-4 u-m-10 ppi_gray">
							<view class="u-flex">
								<view class="u-flex-1 u-line-1" :style="{
									color: themeConfig.pageText
								}">
									{{reg_name}}
								</view>
								<view :style="{
									color: themeConfig.pageTextSub
								}">
									{{pubDate | date2timestamp | timeFrom}}
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
		name:"cardB",
		props: {
			origin: {
				type: Object,
				default: () => {
					return {}
				}
			},
			cid: {
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
			price: {
				type: String,
				default: ''
			},
			dprice: {
				type: String,
				default: ''
			},
			unit: {
				type: String,
				default: ''
			},
			is_zd: {
				type: String,
				default: ''
			},
			cname: {
				type: String,
				default: ''
			},
			intro: {
				type: String,
				default: ''
			},
			place_company: {
				type: String,
				default: ''
			},
			reg_name: {
				type: String,
				default: ''
			},
			pubDate: {
				type: String,
				default: ''
			},
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
			})
		},
		data() {
			return {
				
			};
		},
		methods: {
			handleGotoDetail() {
				this.$emit('detail', {id: this.cid, type: this.type})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
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
