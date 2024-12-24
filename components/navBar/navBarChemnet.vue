<template>
	<view>
		<u-navbar
			:fixed="fixed"
			:bgColor="themeConfig.navBg" 
		>
			<template v-slot:left>
				<view class="u-flex u-flex-items-center">
					<view class="btn u-m-r-20" @click="handleBack" v-if="backBtn">
						<i class="custom-icon custom-icon-back" style="color: #fff" ></i>
					</view>
					<!-- <view class="btn" @click="handleChangeTheme">
						<i class="custom-icon"
							:class="{
								'custom-icon-yejianmoshi': typeActive == 'dark',
								'custom-icon-baitianmoshi': typeActive == 'white',
							}"
							:style="{color: themeConfig.themeIconColor}"
						></i>
					</view> -->
					<view @click="handleGoto({url: '/pages/index/index', type: 'reLaunch'})" class="btn u-m-l-20">
						<i class="custom-icon custom-icon-zhuye2"
							style="color: #fff"
						></i>
					</view>
					<!-- <view v-if="projectBtn" @click="$emit('projectEvent')" class="btn u-m-l-20 u-font-28" :style="{
						color: themeConfig.navText
					}">
						[切换]
					</view> -->
				</view>
				
			</template>
			<template v-slot:center>
				<slot>
					<text class="u-line-1" :style="[titleStyle]">
						{{title}}
					</text>
				</slot>
			</template>
		</u-navbar>
		<view class="project-btn u-flex u-flex-column">
			<view class="item u-flex u-flex-center u-flex-items-center" 
				v-if="projectBtn"
				@click="$emit('projectEvent')"
				:style="{
					background: themeConfig.themeColor,
					color: themeConfig.navText,
				}">
				<i class="custom-icon-jiaohuan custom-icon u-font-40" :style="{
					color: themeConfig.navText,
				}"></i>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name:"navBar",
		props: {
			fixed: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '',
			},
			backBtn: {
				type: Boolean,
				default: false
			},
			projectBtn: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				
			};
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig
			}),
			...mapGetters({
				// themeConfig: 'theme/themeConfig'
			}),
			themeConfig() {
				return this.typeConfig.chemnet
			},
			titleStyle() {
				return {
					color: this.themeConfig.navText,
				}
			}
		},
		methods: {
			...mapMutations({
				setTheme: 'theme/setTheme',
				setNavColor: 'theme/setNavColor',
				handleGoto: 'user/handleGoto'
			}),
			handleChangeTheme() {
				this.setTheme(this.typeActive == 'dark' ? 'white' : 'dark')
				this.setNavColor()
			},
			handleBack() {
				this.$emit('backEvent')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.project-btn {
		position: fixed;
		right: 20px;
		bottom: 80px;  
		bottom: calc(80px + constant(safe-area-inset-bottom));  
		bottom: calc(80px + env(safe-area-inset-bottom));
		  z-index: 20;
		.item {
			width: 45px;
			height: 45px;
			border-radius: 30px;
		}
	}
</style>
