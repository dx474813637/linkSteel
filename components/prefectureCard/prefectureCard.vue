<template>
	<view class="card"> 
		<template v-if="cardType == 2">
			<u--image 
			showLoading 
			:src="origin.img" 
			width="100%" 
			height="auto" 
			mode="widthFix"
			radius="6"
			@click="handleCpyClick"
			></u--image>
		</template>
		<template v-else>
			<view class="u-flex u-flex-items-center u-flex-between u-m-b-20 u-p-l-10"
				@click="handleCpyClick"
				:style="{color: themeConfig.tabTextActive}">
				<view class="name   u-line-1 u-font-34">
					{{origin.name}}
				</view>
				<view>
					<i class="custom-icon-fenlei custom-icon u-font-34  "></i>
				</view>
			</view>
			<view class="tabs-w">
				 <u-tabs 
					lineWidth="0"
					lineHeight="0"
					:list="origin.list"  
					:activeStyle="{
						fontSize: '14px',
						color: themeConfig.followCard.baseText
					}"
					:inactiveStyle="{
						fontSize: '14px',
						color: themeConfig.followCard.baseText
					}"
					:itemStyle="{
						background: themeConfig.followCard.boxCardBg,
						lineHeight: '30px',
						marginRight: '10px',
						borderRadius: '4px',
					}"
					@click="handleTabsClick"
				 ></u-tabs>
			</view>
		</template>
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name:"prefectureCard",
		props: {
			origin: {
				type: Object,
				default: () => {
					 return {}
				}
				
			},
			cardType: {
				type: String | Number,
				default: 1
			}
		},
		data() {
			return {};
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig', 
			})
			
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			handleTabsClick({index}) { 
				this.handleGoto({
					url: '/pages/index/prefecture/prefecture',
					params: {
						login:  this.origin.login,
						standard: this.origin.list[index].id,
						pan: 's'
					}
				})
			},
			handleCpyClick() {
				this.handleGoto({
					url: '/pages/index/prefecture/prefecture',
					params: {
						login: this.origin.login,
						pan: 's'
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>