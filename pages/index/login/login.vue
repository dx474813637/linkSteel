<template>
	<view class="wrap">
		<!-- <view class="top"></view> -->
		<view class="content">
			<view class="title">欢迎登录</view>
			<u--form 
				labelPosition="top"
				:model="form" 
				ref="uForm" 
			>
				<u-form-item prop="login" >
					<u--input 
						v-model="form.login" 
						prefixIcon="account-fill"
						clearable
						prefixIconStyle="color: #999"
						:placeholder="`请输入${logintype == 1? '手机' :'账号/手机'}`" 
					/>
				</u-form-item>

				<template v-if="logintype == 2">
					<u-form-item prop="passwd" >
						<u-input 
							:password="passwordType"
							prefixIcon="lock-fill"
							clearable
							prefixIconStyle="color: #999"
							v-model="form.passwd" 
							placeholder="请输入密码"
						>
							<template slot="suffix">
								<u-icon 
									@click="passwordType = !passwordType"
									:name=" passwordType ? 'eye-off' : 'eye-fill'"
									:color=" passwordType ? '#ccc' : '#007aff'"
									></u-icon>	
							</template>
						</u-input>
					</u-form-item>
				</template>
			</u--form>
			<!-- <view class="tips" v-if="logintype == 1">未注册的手机号验证后将自动注册</view> -->
			<u-button type="primary" :ripple="true" @click="submit" :custom-style="inputStyle">
				{{ logintype == 2 ? '登录' : '获取短信验证码'}}</u-button>


			<view class="alternative">
				<view class="password" @click="changeLoginType">{{ logintype == 1 ? '账号密码登录' : '手机验证码登录'}}</view>
				<view class="issue" @click="handleGoto({url:'/pages/index/login/register'})">注册账号</view>
			</view> 
			
			<view class=" u-m-t-40 u-flex u-flex-end">
				<view>
					<u--text type="warning" decoration="underline" text="忘记密码？" @click="handleGoto('/pages/index/login/resetPwd')"></u--text>
				</view>
				
				
			</view>
		</view>
		<view class="u-p-l-10 u-p-r-10">
			<u-parse :content="denglu_info[logintype == 1? 'info1' : 'info2']"></u-parse>
		</view>
		<!-- <view class="buttom safe-area-inset-bottom ">
			<view class="u-flex u-flex-items-center u-p-20 u-p-l-40">
				<u-checkbox-group 
					v-model="agree"
					placement="row"
					@change="agreeChange"
					>
					<u-checkbox name="agree"></u-checkbox>
				</u-checkbox-group>
				<view class="hint u-flex-1 u-p-l-5">
					注册/登录前请先阅读并勾选同意
					<text @click="handleGoto('/pages/index/login/xieyi')" class="link">《注册服务协议》</text>
				</view>
			</view>
			<u-safe-bottom></u-safe-bottom>
		</view> -->
		
	</view>
</template>

<script>
	
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				logintype: 2,
				form: {
					login: '',
					passwd: '',
				},
				denglu_info: {},
				passwordType: true
				// agree: [],
			}
		},
		onReady() {
			this.handleSetRules()
		},
		computed: {
			inputStyle() {
				return {
					'borderRadius': '10rpx',
					// 'backgroundColor': this.$store.state.theme.themeColor,
					'backgroundColor': '#007aff',
					'marginTop': '40rpx'
				}
			},
			rules() {
				if(this.logintype == 2) {
					return {
						login: [{
							required: true,
							message: '请输入账号/手机号',
							trigger: ['blur', 'change']
						}, ],
						passwd: [{
							required: true,
							message: '请输入密码',
							trigger: ['blur', 'change']
						}, ],
					}
				}
				else if(this.logintype == 1) {
					return {
						login: [{
								required: true,
								message: '请输入手机号',
								trigger: ['blur', 'change']
							},
							{
								validator: (rule, value, callback) => {
									console.log(uni.$u.test.mobile(value))
									return uni.$u.test.mobile(value)
								},
								message: '请输入正确的11位手机号',
								trigger: ['blur', 'change']
							},
						],
					}
				}
			}
		},
		async onLoad(){
			const res = await this.$api.denglu_info()
			if(res.code == 1) {
				this.denglu_info = res.list
			}
		},
		methods: {
			...mapMutations({
				setLogin: 'user/setLogin',
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				wode: 'user/wode'
			}),
			handleSetRules() {
				this.$refs.uForm.setRules(this.rules)
			},
			submit() {
				// if(this.agree.length == 0) {
				// 	uni.showToast({
				// 		title: '请先阅读并勾选底部协议',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				this.$refs.uForm.validate().then(valid => {
					if (valid) {
						// console.log('验证通过');
						if (this.logintype == 1) {
							this.getCode()
						} else {
							this.getLogin()
						}
					} else {
						// console.log('验证失败');
					}
				}).catch(errors => {
					uni.$u.toast('请检查表单内容')
				});
			},
			getCode() {
				uni.navigateTo({
					url: `/pages/index/login/code?login=${this.form.login}`
				})
			},
			async getLogin() {
				uni.showLoading({
					title: '登录信息验证中...'
				})
				// await uni.$u.sleep(1800)
				let res = await this.$api.sunsirsLogin({
					params: this.form
				})
				if(res.code == 1) {
					// uni.setStorageSync('login', res.data.back.login)
					// // uni.setStorageSync('mobile', res.data.back.mobile)
					// // uni.setStorageSync('token', res.data.back.token)
					this.setLogin(1)
					await this.wode()
					this.naviBack()
					 
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
					uni.navigateTo({
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
			changeLoginType() {
				this.logintype == 1 ? this.logintype = 2 : this.logintype = 1
				this.$set(this.form, "login", "")
				this.$refs.uForm.clearValidate()
				this.handleSetRules()
			},
			// agreeChange(e) {
			// 	console.log(e)
			// }
		}
	};
</script>

<style lang="scss" scoped>
	.u-border-bottom {
		border-bottom: 1rpx solid #e7e7e7;
	}

	.login-box {
		display: none;

		&.tel,
		&.pw {
			display: block;
		}
	}

	.inputRow {
		margin-bottom: 30rpx;
	}

	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 20rpx auto 0;

			.title {
				text-align: left;
				font-size: 50rpx;
				font-weight: 500;
				margin-bottom: 50rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: #ffaa00;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $uni-color-warning;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: #666;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;

			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: #666;
					font-size: 28rpx;
				}
			}

			.hint {
				// padding: 20rpx 40rpx;
				font-size: 28rpx;
				color: #333;

				.link {
					color: #007aff;
				}
			}
		}
	}
</style>
