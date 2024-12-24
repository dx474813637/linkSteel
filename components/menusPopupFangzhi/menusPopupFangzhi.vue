<template>
	<view>
		<u-popup 
			:show="show" 
			mode="bottom"  
			@close="close" 
			@open="open"
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
							
						</view>
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-34">高级筛选</text>
						</view>
						<view class="item u-flex-1 u-text-right">
							<text class="u-error" @click="close">取消</text>
						</view>
					</view>
					
				</view>
				<view class="main" :style="{
					backgroundColor: themeConfig.pageBg,
				}">
					<u-list height="100%" >
						<u-list-item
							v-for="(item, index) in menusList"
							:key="item.key">
							<view class="item-card u-p-10 u-p-l-20 u-p-r-20">
								<view class="card-title u-flex u-flex-items-center u-p-10 u-font-30"
									@click="handleChangeShow(item)"
									:style="{
										color: themeConfig.pageText
									}"
								>
									<i class="custom-icon u-font-28"
										:class="{
											'custom-icon-jiahao1': !item.show,
											'custom-icon-jianhao': item.show
										}"
									></i>
									<text class="u-p-l-10">{{item.name}}</text>
								</view>
								<view class="card-content u-p-20 u-flex u-flex-wrap u-flex-items-center" 
									v-if="item.show"
									:style="{
										backgroundColor: themeConfig.boxBg,
									}"
								>
									<view class="card-label u-line-1 u-m-b-12"
										v-for="(ele, i) in item.list"
										:key="ele.key"
										:class="{
											'normal_white':  theme == 'white',
											'normal_dark':  theme == 'dark',
											'active_white': theme == 'white' && ele.active,
											'active_dark': theme == 'dark' && ele.active,
										}"
										@click="selectLabel({indexs: [index, i], key: item.field, value: ele.name})"
									>
										{{ele.name}}
									</view>
								</view>
							</view>
						</u-list-item>
						
					</u-list>
					
				</view>
				<view class="confirm-rows u-p-20" v-if="multiple" :style="{
					backgroundColor: themeConfig.navBg,
				}">
					<u-button :customStyle="{backgroundColor: themeConfig.badgeBg, color: '#fff', border: 'none'}" shape="circle" @click="handleConfirm">筛 选</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name:"menusPopupFangzhi",
		props: {
			theme: {
				type: String,
				default: 'white'
			},
			domain: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
				default: false
			},
			multiple: {
				type: Boolean,
				default: true
			},
			menus: {
				type: Array,
				defualt: () => []
			},
		},
		async mounted() {},
		data() {
			return {
				loading: false,
				menusList: [],
				selected: []
			};
		},
		watch: {
			menus: {
				immediate: true,
				handler(n) {
					console.log('w', n)
					this.initMenusStatus(n)
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
			// allHide() {
			// 	return !this.menusList2.some(ele => ele.show)
			// },
		},
		methods: {
			initMenusStatus(arr) {
				this.menusList = arr.map(ele => {
					ele.list = ele.list.map(item => {
						return {
							name: item,
							active: false,
							key: this.domain + ele.field
						}
					})
					return {
						...ele,
						show: true,
						key: this.domain + ele.field
					}
				})
				console.log(this.menusList)
			},
			handleChangeShow(data) {
				this.menusList.some((ele, index) => {
					if(ele.field == data.field) {
						ele.show = !ele.show
						return true
					}
					return false
				})
				
			},
			open() {
				
			},
			close() {
				this.$emit('close')
			},
			selectLabel(data) {
				let item = this.menusList[data.indexs[0]].list[data.indexs[1]]
				item.active = !item.active
			},
			handleConfirm() {
				this.$emit('confirm', {list: this.menusList})
			},
			changeAllHide() {
				let flag = this.allHide
				this.menusList2 = this.menusList2.map(ele => {
					ele.show = flag
					return ele
				})
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
