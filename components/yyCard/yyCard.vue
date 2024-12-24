<template>
	<view class="wrap u-p-10 u-p-l-20 u-p-r-20 u-font-28"
		:style="{
			backgroundColor: themeConfig.pan.boxBg, 
			color: item.is_success == '1' ||  item.is_valid == '1'?themeConfig.pan.baseText : themeConfig.pan.pageTextSub
		}"
	>
		<view class="u-flex u-flex-between u-flex-items-start u-p-10 u-p-l-20 u-p-r-20" >
			<view>{{item.Company.name}} - {{item.Company.contact}}</view>
			<view
				class="u-m-l-10"
				:style="{ 
					color: (item.state == '2' || item.state == '3')? '#fb4242' : themeConfig.pan.baseText,
					'white-space': 'nowrap'
				}"
			>{{item.state | bid_subscribe2Str}}</view>
		</view> 
		<view class="u-flex u-flex-between u-flex-items-center u-p-10 u-p-l-20 u-p-r-20">
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
			theme: {
				type: String,
				default: ''
			},
			unit: {
				type: String,
				default: 'unit'
			}, 
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
			themeConfig() {
				return this.typeConfig[this.theme || this.typeActive] 
			}
		},
	}
</script>

<style lang="scss" scoped>
	.wrap {
		box-shadow: 0 0 10px rgba(0,0,0,.1);
	}
</style>