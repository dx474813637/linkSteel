<template>
	<view>
		<u-popup 
			:show="show" 
			mode="bottom"  
			@open="open"  
			@close="close"  
			round="25"
			:bgColor="themeConfig.pageBg"
		>
			<view class="wrapper" :style="{
				backgroundColor: themeConfig.pageBg,
				color: themeConfig.baseText,
			}">
				<view class="header u-p-18" :style="{
					backgroundColor: themeConfig.navBg,
				}">
					<view class="title-bar u-p-20 u-flex u-flex-between u-flex-items-center u-font-30">
						<view class="item ">
							<text class="u-info" @click="close">取消</text>
						</view>
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-34 text-base">选择交易商品</text>
						</view>
						<view class="item u-text-right">
							 <text class="u-primary" @click="refresh"  >刷新</text>
						</view>
					</view>
					<view class="u-flex u-flex-items-center" > 
						<view class="search-bar u-flex-1">
							<u-search 
								placeholder="关键字筛选" 
								v-model="keyword"
								:showAction="false"
								:bgColor="themeConfig.pageBg" 
							></u-search>
						</view>
					</view>
					
				</view>
				<view class="main" :style="{
					backgroundColor: themeConfig.pageBg,
				}">
					<template v-if="loading">
						<view class="load-w u-flex u-flex-items-center u-flex-center" :style="{
							backgroundColor: themeConfig.mask,
						}">
							<u-loading-icon mode="circle" size="36" text="获取最新数据中..." 
							:color="themeConfig.followCard.indicatorColor" 
							:inactiveColor="themeConfig.followCard.indicatorActiveColor" 
							vertical></u-loading-icon>
						</view>
					</template>
					<template v-else >
						<u-list  
							enableBackToTop
							@scrolltolower="scrolltolower"
							:preLoadingScreen="100"
							height="100%">
							<template v-if="keyword">
								<template v-if="searchRes.length > 0">
									<u-list-item
										v-for="(ele, index) in searchRes"
										:key="ele.id">
										<view class="u-p-10">
											<view class="u-p-20 u-flex u-flex-items-center"
												:style="{
													backgroundColor: themeConfig.boxBg,
													borderRadius: '10rpx'
												}"
												@click="selectLabel(ele)"
											>
												<text>{{ele.name.slice(0, ele.pp[0])}}</text>
												<text class="u-error">{{ele.name.slice(ele.pp[0], ele.pp[0]+ele.pp[1])}}</text>
												<text>{{ele.name.slice(ele.pp[0]+ele.pp[1])}}</text>
												<text class="u-p-l-20 text-base u-font-28" >{{ele.attributes | filterAttributes}}</text>
											</view>
										</view>
									</u-list-item> 
								</template>
								<template v-else>
									<u-empty
										marginTop="40"
										mode="data"
										icon="http://cdn.uviewui.com/uview/empty/data.png"
										text="搜索无匹配项，可置空搜索栏列表查看"
									></u-empty>
								</template>
							</template>
							<template v-else>
								<u-list-item
									v-for="(item, index) in list"
									:key="item.id">
									<view class="u-p-10">
										<view class="u-p-20 u-flex u-flex-items-center"
											:style="{
												backgroundColor: themeConfig.boxBg,
												borderRadius: '10rpx'
											}"
											@click="selectLabel(item)"
										>
											<view class="u-font-32"
												:style="{
													color: themeConfig.baseText
												}"
											>{{item.name}}</view>
											<view class="u-font-28 u-p-l-20 u-flex-1 u-line-1"
												:style="{
													color: themeConfig.pageTextSub
												}"
											>{{item.attributes | filterAttributes}}</view>
										</view>
									</view>
								</u-list-item>
								<template name="dataStatus">
									<template v-if="list.length == 0">
										<u-empty
											mode="data"
											:icon="themeConfig.empty"
										>
										</u-empty>
									</template>
									<template v-else>
										<u-loadmore
											:status="loadstatus"
										/>
									</template>
								</template>
							</template>
							
							
						</u-list>
					</template> 
				</view> 
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name:"menusPopupMyProduct",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			theme: {
				type: String,
				default: 'white'
			},
		},
		async mounted() {},
		data() {
			return {
				keyword: '',
				list: [{name: '全部商品', id: ''}],
				searchRes: [],
				curP: 1,
				loadstatus: 'nomore',
				loading: false,
			};
		},
		watch: {
			keyword:{
				handler() {
					uni.$u.debounce(this.searchMenus, 500)
				}
			}
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
			themeConfig() {
				return this.typeConfig[this.theme]
			},
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				getCompanyProduct: 'user/getCompanyProduct',
			}),
			// async initDataList() {
			// 	this.initParamas()
			// 	await this.getData()
			// },
			initParamas() {
				this.curP = 1;
				this.list = [{name: '全部商品', id: ''}];
				this.loadstatus = 'loadmore'
			}, 
			searchMenus() {
				this.searchRes = []
				let k = this.keyword.toUpperCase()
				let str = '' 
				this.list.forEach(ele => {
					str = ele.name.toUpperCase()
					let i = str.indexOf(k)
					if(i > -1) {
						ele.pp = [i, k.length]
						this.searchRes.push(ele)
					}
				})  
			},
			async refresh() {
				if(this.loading) return 
				await this.initDataList() 
			},
			async open() {
				if(this.list.length > 1) return
				this.loading = true
				await this.initDataList()
				this.loading = false;
			}, 
			close() {
				this.$emit('close') 
			},
			selectLabel(menu) {
				this.$emit('confirm', {...menu})
				this.close()
			},  
			async initDataList() {
				this.loading = true
				this.initParamas()
				uni.showLoading()
				await this.getData()
				this.loading = false
			},
			scrolltolower() {
				this.getMoreData()
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},
			async getData() { 
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api.getCompanyProduct({
					params: { 
						p: this.curP
					}
				})
				if(res.code == 1) {
					if(res.list) {
						this.list = [...this.list, ...res.list] 
					}
					if(res.list?.length == 0 || !res.list) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
				}
			}
		}
	}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
	.load-w {
		width: 100%;
		height: 100%;
	}
	.wrapper {
		width: 100%;
		border-radius: 30rpx 30rpx 0 0 ;
		overflow: hidden;
		.header {
		}
		.main {
			background-color: #f8f8f8;
			height: 50vh;
			width: 100%;
			box-sizing: border-box;
			.item-card {
				width: 100%;
				box-sizing: border-box;
				.card-title {
					color: #666;
				}
			}
			.card-content {
				// background-color: #fff;
				border-radius: 10rpx;
				width: 100%;
				box-sizing: border-box;
				
			}
			.card-label {
				flex: 0 0 30%;
				margin-right: 4%;
				height: 30px;
				line-height: 30px;
				transition: all .3s;
				font-size: 14px;
				text-align: center;
				border-radius: 8rpx;
				position: relative;
				border: 1rpx solid #eee;
				&.rows {
					flex: 0 0 100%;
					margin-right: 0;
					text-align: left;
				}
				&.normal_white {
					border-color: #eee;
					color: #666;
				}
				&.normal_dark {
					border-color: #3a3352;
					color: #c8cfff;
				}
				&.active_white {
					border-color: #98c9ff;
					color: #007aff;
					background-color: #e6f2ff;
				}
				&.disabled_white {
					border-color: #c373ff !important;
					color: #7d3df7 !important;
					background-color: #ead9f7 !important;
				}
				&.active_dark {
					border-color: #025688;
					color: #00ffff;
					// background-color: #e6f2ff;
				}
				&.disabled_dark {
					border-color: #503f17 !important;
					color: #f7823d !important;
					// background-color: #ead9f7 !important;
				}
				&:nth-of-type(3n) {
					margin-right: 0;
				}
			}
		}
		.bottom {
			
		}
	}
</style>
