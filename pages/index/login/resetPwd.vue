<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">登录密码重设</view>
			<u--form 
				labelPosition="top"
				:model="form" 
				ref="uForm" 
			>
				<u-form-item prop="mobile" >
					<u--input 
						v-model="form.mobile" 
						prefixIcon="phone-fill"
						clearable
						prefixIconStyle="color: #999"
						placeholder="请输入手机号" 
					/>
				</u-form-item>

				<u-form-item prop="passwd" >
					<u--input 
						type="password" 
						prefixIcon="lock-fill"
						clearable
						prefixIconStyle="color: #999"
						v-model="form.passwd" 
						placeholder="请输入新密码"
					 />
				</u-form-item>
				<u-form-item prop="passwd2" >
					<u--input 
						type="password" 
						prefixIcon="lock-fill"
						clearable
						prefixIconStyle="color: #999"
						v-model="form.passwd2" 
						placeholder="确认新密码"
					 />
				</u-form-item>
				<u-form-item prop="captcha" >
					<u-input 
						v-model="form.captcha" 
						prefixIcon="tags-fill"
						clearable
						prefixIconStyle="color: #999"
						placeholder="验证码" 
					>
						<template slot="suffix">
							<u-code
								ref="uCode"
								@change="codeChange"
								seconds="60"
								changeText="X秒重新获取"
							></u-code>
							<u-button
								@tap="getCode"
								:text="tips"
								type="warning"
								size="mini"
							></u-button>
						</template>
					</u-input>
				</u-form-item>
			</u--form>
			<u-button type="primary" :ripple="true" @click="submit" :custom-style="inputStyle">提交</u-button>


			<view class="alternative">
				<view class="issue" @click="handleGoto({url:'/pages/index/login/login', type: 'reLaunch'})">返回登录</view>
			</view> 
		</view>
		<view class="buttom safe-area-inset-bottom">
			<view class="hint">
				注册/登录代表同意
				<text class="link">平台用户协议、隐私政策，</text>
				并授权使用您的平台账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
			<u-safe-bottom></u-safe-bottom>
		</view>
		
	</view>
</template>

<script>
	
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				form: {
					mobile: '',
					passwd: '',
					passwd2: '',
					captcha: '',
				},
				tips: '获取验证码',
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
				return {
					mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: ['blur', 'change']
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value)
							},
							message: '请输入正确的11位手机号',
							trigger: ['blur', 'change']
						},
					],
					passwd: [{
							required: true,
							message: '请输入密码',
							trigger: ['blur', 'change']
						},
						{
							validator: (rule, value, callback) => {
								const RegExpObject = /^[0-9A-Za-z]{5,}$/
								return RegExpObject.test(value)
							},
							message: '密码可使用任何英文字母以及阿拉伯数字组合，不得少于5个字符并区分英文大小写',
							trigger: ['blur', 'change']
						},
					],
					passwd2: [{
							required: true,
							message: '请确认密码',
							trigger: ['blur', 'change']
						},
						{
							validator: (rule, value, callback) => {
								return this.form.passwd == value
							},
							message: '密码不一致',
							trigger: ['blur', 'change']
						},
					],
					captcha: {
						required: true,
						message: '请输入验证码',
						trigger: ['blur', 'change']
					}
				}
			}
		},
		onLoad(){
			
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
				this.$refs.uForm.validate().then(valid => {
					if (valid) {
						this.passwdReset()
					} else {
						// console.log('验证失败');
					}
				}).catch(errors => {
					uni.$u.toast('请检查表单内容')
				});
			},
			
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				this.$refs.uForm.validateField('mobile', async (err) => {
					console.log(err)
					if(err && err.length > 0) return
					if (this.$refs.uCode.canGetCode) {
					  // 模拟向后端请求验证码
					  uni.showLoading()
					  const res = await this.$api.passwdReset({
						  params: {
							  ...this.form,
							  flag: 1
						  }
					  })
					  if(res.code == 1) {
						  uni.$u.toast('验证码已发送');
						  this.$refs.uCode.start();
					  }
					} else {
					  uni.$u.toast('倒计时结束后再发送');
					}
				})
				
			},
			async passwdReset() {
				uni.showLoading()
				
				let res = await this.$api.passwdReset({
					params: {
						...this.form,
						flag: 2
					}
				})
				if(res.code == 1) {
					// uni.setStorageSync('login', res.data.back.login)
					// // uni.setStorageSync('mobile', res.data.back.mobile)
					// // uni.setStorageSync('token', res.data.back.token)
					// this.setLogin(1)
					// this.wode()
					this.naviBack()
					 
				}
				
			},
			naviBack() {
				uni.reLaunch({
					url: '/pages/index/login/login',
					success() {
						uni.showToast({
							icon: 'none',
							title: res.msg,
						})
					}
				})
			},
			changeLoginType() {
				
			}
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
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 50rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
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
				padding: 20rpx 34rpx;
				font-size: 24rpx;
				color: $uni-color-warning;

				.link {
					color: $uni-color-warning;
				}
			}
		}
	}
</style>
