<template>
	<view>
		<u-popup 
			:show="show" 
			mode="bottom"  
			@close="close" 
			@open="open" 
			:overlayStyle="overlayStyle"
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
						<view class="item u-flex-1">
							<text class="u-info" @click="close">取消</text>
						</view>
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-34">高级筛选</text>
						</view>
						<view class="item u-flex-1 u-text-right">
							<text class="u-primary" @click="refresh" >刷新数据</text>
						</view>
					</view>
					<view class="u-flex u-flex-items-center"  v-if="!loading"> 
						<view class="search-bar u-flex-1">
							<u-search 
								placeholder="导航关键字" 
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
					<template v-else>
						<u-list height="100%">
							<template v-if="keyword">
								<template v-if="searchRes.length > 0">
									<view class="searchRes-content u-p-20 u-flex u-flex-wrap u-flex-items-center">
										<view class="card-label u-line-1 u-m-b-12 rows"
											v-for="(ele, i) in searchRes"
											:key="ele.id"
											:class="{ 
												'normal_white':  theme == 'white',
												'normal_dark':  theme == 'dark',  
											}"
											@click="selectLabel(ele)"
										>
											<text>{{ele.name.slice(0, ele.pp[0])}}</text>
											<text class="u-error">{{ele.name.slice(ele.pp[0], ele.pp[0]+ele.pp[1])}}</text>
											<text>{{ele.name.slice(ele.pp[0]+ele.pp[1])}}</text> 
										</view>
									</view>
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
							<template v-else > 
								<view class="item-card u-p-10 u-p-l-20 u-p-r-20"> 
									<view class="card-content u-p-20 u-flex u-flex-wrap u-flex-items-center"  
										:style="{
											backgroundColor: themeConfig.boxBg,
										}"
									>
										<view class="card-label u-line-1 u-m-b-12 rows u-p-20"
											v-for="(ele, i) in list"
											:key="ele.id"
											:class="{
												'normal_white':  theme == 'white',
												'normal_dark':  theme == 'dark', 
											}"
											@click="selectLabel(ele)"
										>
											{{ele.name}}
										</view>
									</view>
								</view>  
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
		name:"menusPopupMyStandard",
		props: { 
			overlayStyle: {
				type: Object,
				default: () => {
					return {}
				}
			}, 
			theme: {
				type: String,
				default: 'white'
			},
			show: {
				type: Boolean,
				default: false
			},  
		},
		async mounted() {},
		data() {
			return {
				keyword: '',
				menusList2: [],
				searchRes: [],
				searchFocus: false, 
				loading: false,
				list: []
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
				fxStandard: state => state.user.fxStandard, 
				typeConfig: state => state.theme.typeConfig,
			}),
			themeConfig() {
				return this.typeConfig[this.theme]
			}, 
			btnDis() {
				return this.loading
			}, 
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({ 
				getFxStandard: 'user/getFxStandard', 
			}), 
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
				await this.getData()  
			},
			async open() { 
				this.keyword = ''
				// if(this.fxStandard.length != 0) return
				await this.getData()
			},
			async getData() {
				this.loading = true
				// await this.getFxStandard()
				const res = await this.$api.jyfw_list_all();
				this.loading = false; 
				if(res.code == 1) {
					this.list = [{name: '全部品类', id: ''}, ...res.list.list]
				}
			},
			close() {
				this.$emit('close') 
			},
			selectLabel(menu) {
				console.log(menu)
				this.$emit('confirm', {...menu})
				
			}, 
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
				// height: 30px;
				line-height: 30px;
				transition: all .3s;
				font-size: 14px;
				text-align: center;
				border-radius: 8rpx;
				position: relative;
				border: 1rpx solid #eee;
				box-sizing: border-box;
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
