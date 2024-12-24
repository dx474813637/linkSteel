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
							<text class="u-primary" v-if="isMyProduct" @click="handleGoto('/pages/my/broker/prod_set')">商品管理</text>
							<text class="u-primary" v-else-if="isMyAllCpy || isMduCpy" @click="handleGoto('/pages/my/customer/customer')">客户管理</text>
							<text class="u-primary" @click="refresh" v-else >刷新数据</text>
						</view>
					</view>
					<view class="u-flex u-flex-items-center"  v-if="!loading">
						<view class="u-flex u-flex-items-center u-p-10 u-p-r-30"
							style="color: #999"
							@click="changeAllHide"
							v-if="showMode == 'grid'"
						>
							<i class="custom-icon "
							:class="{
								'custom-icon-piliangshouqi': allHide,
								'custom-icon-piliangzhankai': !allHide
							}"
							></i>
						</view>
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
										<view class="card-label u-line-1 u-m-b-12"
											v-for="(ele, i) in searchRes"
											:key="ele[mainkey]"
											:class="{
												'rows': isMduCpy || isMyAllCpy || isMyProduct,
												'normal_white':  theme == 'white',
												'normal_dark':  theme == 'dark',
												'active_white': theme == 'white' && ele.active,
												'active_dark': theme == 'dark' && ele.active,
												'disabled_white': theme == 'white' && ele.disabled,
												'disabled_dark': theme == 'dark' && ele.disabled,
											}"
											@click="selectLabel(ele)"
										>
											<text>{{ele.name.slice(0, ele.pp[0])}}</text>
											<text class="u-error">{{ele.name.slice(ele.pp[0], ele.pp[0]+ele.pp[1])}}</text>
											<text>{{ele.name.slice(ele.pp[0]+ele.pp[1])}}</text>
											<text class="u-p-l-20 text-base" v-if="isMyProduct">{{ele.attributes | filterAttributes}}</text>
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
							<template v-else>
								<u-list-item
								v-for="(item, index) in menusList2"
								:key="item[mainkey]">
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
											<text class="u-p-l-10" :style="{
												color: themeConfig.pageTextSub
											}">(
												<template v-if="multiple">
													{{item.num}}/
												</template>
												{{item.list.length}})</text>	
											<!-- <view class="u-m-l-20" v-if="item.num> 0">
												<u-badge :bgColor="themeConfig.badgeBg" max="99" :value="item.num"></u-badge>
											</view> -->
											
										</view>
										<view class="card-content u-p-20 u-flex u-flex-wrap u-flex-items-center" 
											v-if="item.show"
											:style="{
												backgroundColor: themeConfig.boxBg,
											}"
										>
											<view class="card-label u-line-1 u-m-b-12"
												v-for="(ele, i) in item.list"
												:key="ele[mainkey]"
												:class="{
													'normal_white':  theme == 'white',
													'normal_dark':  theme == 'dark',
													'active_white': theme == 'white' && ele.active,
													'active_dark': theme == 'dark' && ele.active,
													'disabled_white': theme == 'white' && ele.disabled,
													'disabled_dark': theme == 'dark' && ele.disabled,
												}"
												@click="selectLabel(ele)"
											>
												{{ele.name}}
											</view>
										</view>
									</view>
								</u-list-item>
							</template>
							
						</u-list>
					</template>
				</view>
				<view class="confirm-rows u-p-20" v-if="multiple" :style="{
					backgroundColor: themeConfig.navBg,
				}">
					<u-button :customStyle="{backgroundColor: themeConfig.badgeBg, color: '#fff', border: 'none'}" shape="circle" :disabled="btnDis" @click="handleConfirm">确 定（{{multipleList.length}}）</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name:"menusPopup",
		props: {
			pan: {
				type: String,
				default: 's'
			},
			overlayStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			minNum: {
				type: Number,
				default: 0
			},
			maxNum: {
				type: Number,
				default: 999
			},
			theme: {
				type: String,
				default: 'white'
			},
			show: {
				type: Boolean,
				default: false
			},
			isPPI: {
				type: Boolean,
				default: false
			},
			multiple: {
				type: Boolean,
				default: false
			},
			isMyProduct: {
				type: Boolean,
				default: false
			},
			isMyAllCpy: {
				type: Boolean,
				default: false
			},
			isMduCpy: {
				type: Boolean,
				default: false
			},
			showMode: {
				type: String,
				default: 'grid' //grid or list
			},
			mainkey: {
				type: String,
				default: 'id'
			},
			selectedList: {
				type: Array,
				defualt: () => []
			},
		},
		async mounted() {},
		data() {
			return {
				keyword: '',
				menusList2: [],
				searchRes: [],
				searchFocus: false,
				multipleList: [],
				loading: false
			};
		},
		watch: {
			menusList: {
				deep: true,
				immediate: true,
				handler(n, o) {
					this.initMenusStatus()
					
				}
			},
			ppiCate: {
				deep: true,
				immediate: true,
				handler(n, o) {
					this.initMenusStatus()
					
				}
			},
			selectedList: {
				deep: true,
				immediate: true,
				handler(n, o) {
					this.resetSelect()
					this.initMenusStatus()
				}
			},
			isPPI: {
				handler(n, o) {
					this.resetSelect()
					this.initMenusStatus()
				}
			},
			multipleList(n) {
				this.initSelectStaus()
				
			},
			keyword:{
				handler() {
					uni.$u.debounce(this.searchMenus, 500)
				}
			}
		},
		computed: {
			...mapState({
				menusList: state => state.chemnet.menusList,
				ppiCate: state => state.chemnet.ppiCate, 
				myProduct: state => state.chemnet.myProduct, 
				myAllCpy: state => state.chemnet.myAllCpy,
				mduCpy: state => state.chemnet.mduCpy, 
				typeConfig: state => state.theme.typeConfig,
			}),
			themeConfig() {
				return this.typeConfig[this.theme]
			},
			idKey() {
				return this.isPPI? 'ppid' :'id'
			},
			btnDis() {
				return this.loading
			},
			allHide() {
				return !this.menusList2.some(ele => ele.show)
			},
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				getMenusList: 'chemnet/getMenusList',
				// getPPiCate: 'chemnet/getPPiCate',
				// getCompanyProduct: 'chemnet/getCompanyProduct',
				// getAllCompany: 'chemnet/getAllCompany',
				// getMduCompany: 'chemnet/getMduCompany'
			}),
			initSelect() {
				this.multipleList = []
			},
			initSelectStaus() {
				//初始化标签选中状态
				this.menusList2 = this.menusList2.map(ele => {
					ele.num = 0;
					ele.list.forEach(item => {
						if(this.multipleList.map(m => m.id).includes(item[this.mainkey])) {
							ele.num += 1
							item.active = true
						}else {
							item.active = false
						}
					})
					return ele
				})
			},
			initMenusStatus() {
				if(this.isMyProduct || this.isMyAllCpy || this.isMduCpy) return
				//初始化菜单所有状态
				// console.log(this.isPPI)
				let arr = uni.$u.deepClone(this.isPPI ? this.ppiCate : this.menusList);
				// console.log(arr)
				arr.forEach(ele => {
					ele.show = true;
					ele.num = 0
					if(ele.list.length == 0) {
						ele.show = false
					}else {
						
						ele.list.forEach(item => {
							if(this.multipleList.map(m => m.id).includes(item[this.mainkey])) {
								item.active = true
								// item.disabled = true
								ele.num += 1
							}else {
								item.active = false
								item.disabled = false
							}
						})
					}
					
				})
				this.menusList2 = arr
			},
			resetSelect() {
				this.multipleList = uni.$u.deepClone(this.selectedList)
			},
			handleConfirm() {
				this.$emit('confirm', {arr: this.multipleList})
				this.multiple && this.initMenusStatus()
			},
			searchMenus() {
				this.searchRes = []
				let k = this.keyword.toUpperCase()
				let str = ''
				if(this.isMyProduct) {
					this.myProduct.forEach(ele => {
						str = ele.name.toUpperCase()
						let i = str.indexOf(k)
						if(i > -1) {
							ele.pp = [i, k.length]
							this.searchRes.push(ele)
						}
					})
				}else if(this.isMyAllCpy) {
					this.myAllCpy.forEach(ele => {
						ele.name = ele.to_name + '-' + ele.to_contact
						str = ele.name.toUpperCase()
						let i = str.indexOf(k)
						if(i > -1) {
							ele.pp = [i, k.length]
							this.searchRes.push(ele)
						}
					})
				}else if(this.isMduCpy) {
					this.mduCpy.forEach(ele => {
						ele.name = ele.Company.name + '-' + ele.Company.contact
						str = ele.name.toUpperCase()
						let i = str.indexOf(k)
						if(i > -1) {
							ele.pp = [i, k.length]
							this.searchRes.push(ele)
						}
					})
				}else {
					this.menusList2.forEach(ele => {
						ele.list.forEach(item => {
							str = item.name.toUpperCase()
							let i = str.indexOf(k)
							if(i > -1) {
								item.pp = [i, k.length]
								this.searchRes.push(item)
							}
						})
						return ele
					})
				}
				
			},
			async refresh() {
				if(this.loading) return
				this.loading = true
				this.isPPI ? await this.getPPiCate() : await this.getMenusList()
				this.loading = false
			},
			async open() {
				if(this.isMyProduct) {
					this.loading = true
					await this.getCompanyProduct({type: this.pan == 'b'? '1' : '2'})
					this.loading = false;
				}
				else if(this.isMyAllCpy) {
					this.loading = true
					await this.getAllCompany()
					this.loading = false;
				}
				else if(this.isMduCpy) {
					this.loading = true
					await this.getMduCompany()
					this.loading = false;
				}
				else if(this[this.isPPI ? 'ppiCate': 'menusList'].length == 0) {
					this.refresh()
				}
			},
			close() {
				this.$emit('close')
				this.multiple && this.resetSelect()
			},
			selectLabel(menu) {
				console.log(menu)
				if(!this.multiple) {
					this.$emit('confirm', {...menu})
					return
				}
				// if(menu.disabled) {
				// 	uni.showToast({
				// 		title: '已关注类请在关注列表中移除',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				let i = this.multipleList.map(ele => ele.id).indexOf(menu[this.mainkey])
				if(i == -1) {
					if(this.multipleList.length >= this.maxNum) {
						uni.showToast({
							title: `最多选择${this.maxNum}个标签`,
							icon: 'none'
						})
						return
					}
					this.multipleList.push({
						id: menu[this.mainkey],
						name: menu.name
					})
				}else  {
					if(this.multipleList.length <= this.minNum) {
						uni.showToast({
							title: `最少选择${this.minNum}个标签`,
							icon: 'none'
						})
						return
					}
					this.multipleList.splice(i, 1)
				}
			},
			handleChangeShow(item) {
				let i
				this.menusList2.some((ele, index) => {
					if(ele.id == item.id) {
						i = index
					}
					return ele.id == item.id
				})
				this.menusList2[i].show = !item.show
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
