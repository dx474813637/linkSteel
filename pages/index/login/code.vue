<template>
	<view class="wrap">
		<view class="key-input">
			<view class="title">输入验证码</view>
			<view class="tips text-light">验证码已发送至 +{{login | filterLogin}}</view>
			<u-code-input
				v-model="value" 
				mode="line" 
				:maxlength="maxlength" 
				focus 
				hairline
				@change="change"
				@finish="finish"
			></u-code-input>
			<text :class="{ error: error }">验证码错误，请重新输入</text>
			
		</view>
		<view class="u-flex u-flex-center u-flex-items-center">
			<u-code
				ref="uCode"
				@change="codeChange"
				change-text="XS后重新获取"
				@start="disabled = true"
				@end="disabled = false"
			></u-code>
			<text
				@tap="getCode"
				:text="tips"
				class="u-page__code-text u-m-t-80"
			>{{tips}}</text>
			
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
export default {
	data() {
		return {
			tips: '',
			disabled: false,
			maxlength: 6,
			value: '',
			second: 60,
			show: false,
			error: false,
			login: '',
		};
	},
	computed: {},
	onLoad(opt) {
		if(opt.hasOwnProperty('login')) {
			this.login = opt.login
			this.getCode()
			
		}else {
			uni.redirectTo({
				url: '/pages/index/login/login'
			})
		}
		
	},
	filters: {
		filterLogin(v) {
			return v.replace(/^([1-9]{3})[0-9]{4}([0-9]{4})$/, "$1****$2")
		}
	},
	methods: {
		...mapMutations({
			setLogin: 'user/setLogin',
		}),
		...mapActions({
			wode: 'user/wode'
		}),
		codeChange(text) {
			this.tips = text;
		},
		async getCode() {
			if(this.disabled) return
			this.disabled = true
			uni.showLoading({
				title: '正在获取验证码'
			})
			this.$refs.uCode.start();
			const res = await this.$api.loginMobile({params: {mobile: this.login,flag: 1}})
			if(res.code == 1) {
				uni.showToast({
					title: '验证码已发送'
				})
			}
		},
		// change事件侦听
		change(value) {
			// console.log('change', value);
		},
		// 输入完验证码最后一位执行
		async finish(value) {
			uni.showLoading({
				title: '验证中...'
			})
			let res = await this.$api.loginMobile({params: {mobile: this.login, captcha: value, flag: 2}})
			// uni.hideLoading()
			if(res.code == 1) {
				// uni.setStorageSync('login', res.data.back.login)
				this.setLogin(1)
				await this.wode()
				this.naviBack()
				
			}else {
				this.value = '' 
			}
			
		},
		naviBack() {
			if(uni.getStorageSync('prePage')) { 
				uni.redirectTo({
					url: uni.getStorageSync('prePage'),
					success() {
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						})
					}
				})
				uni.removeStorageSync('prePage')
			}else {
				uni.reLaunch({
					url: '/pages/my/user/index',
					success() {
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						})
					}
				})
			}
		},
	}
};
</script>

<style lang="scss">
	.u-page {
		&__code-text {
			color: $u-primary;
			font-size: 15px;
			padding-top: 10px;
		}
	}
</style>
<style lang="scss" scoped>
.wrap {
	padding: 80rpx 0;
}

.box {
	margin: 30rpx 0;
	font-size: 30rpx;
	color: 555;
}

.key-input {
	padding: 30rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	text {
		display: none;
	}
	.error {
		display: block;
		color: red;
		font-size: 30rpx;
		margin: 20rpx 0;
		padding: 0 80rpx;
	}
}

.title {
	font-size: 50rpx;
	color: #333;
	padding: 0 80rpx;
}

.key-input .tips {
	font-size: 30rpx;
	color: #333;
	margin-top: 20rpx;
	margin-bottom: 60rpx;
	padding: 0 80rpx;
}
.captcha {
	color: $uni-color-warning;
	font-size: 30rpx;
	margin-top: 40rpx;
	padding: 0 80rpx;
	.noCaptcha {
		display: block;
	}
	.regain {
		display: block;
	}
}
</style>
