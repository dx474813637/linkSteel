<template>
	<view class="u-flex u-flex-items-center u-flex-between  u-p-l-20 u-p-r-20 u-p-b-20 u-p-t-10">
		<view class="item-logo">
			<u--image 
				 @click="handleGoto({url: '/pages/index/index', type: 'reLaunch' })"
				src="https://wx.rawmex.cn/Public/chemnetlogo.png" mode="heightFix" width="30vw" height="30px"></u--image>
		</view>
		<view class="search-w u-flex-1 u-p-l-10" @click="handleGoto({url: '/pages/chemnet/search/search' })">
			<u-search placeholder="请输入商品中文名、CAS NO." shape="square" :showAction="false" 
				:bgColor="themeConfig.pageBg" disabled></u-search>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions 
	} from 'vuex'
	export default {
		name:"chementSearch",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState({
				menusList: state => state.chemnet.menusList,
				typeActive: state => state.theme.typeActive,
				typeConfig: state => state.theme.typeConfig,
			}),
			...mapGetters({
				// themeConfig: 'theme/themeConfig', 
				sys: 'theme/sys'
			}),
			themeConfig() {
				return this.typeConfig.chemnet
			}, 
			
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			
		}
	}
</script>

<style lang="scss" scoped>
.search-w {
		position: relative;
		z-index: 5;
	}
</style>