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
							<text class="u-font-34">创建群名片</text>
						</view>
						<view class="item u-flex-1 u-text-right"> 
						</view>
					</view> 
					
				</view>
				<view class="main" >
					<u-list height="100%">
						<view class="u-p-10 u-p-l-30 u-p-r-30" >
							<u--form
								labelPosition="left"
								:model="form"
								ref="form"
								:rules="rules"
								labelWidth="60px" 
								>
								<u-form-item label="姓名" prop="name" required >  
									<u--input
										v-model="form.name"  
										placeholder="请输入姓名"
									></u--input> 
								</u-form-item> 
								<u-form-item label="公司" prop="company" required >  
									<u--input
										v-model="form.company"  
										placeholder="请输入公司"
									></u--input> 
								</u-form-item> 
								<u-form-item label="职位" prop="position" >  
									<u--input
										v-model="form.position"  
										placeholder="请输入职位"
									></u--input> 
								</u-form-item> 
								<u-form-item label="手机" prop="phone" required >  
									<u--input
										v-model="form.phone"  
										placeholder="请输入手机"
									></u--input> 
								</u-form-item> 
								<u-form-item v-if="cate == 3" label="验证码" prop="captcha" required >
									<u-input 
										v-model="form.captcha" 
										clearable
										placeholder="请输入验证码"
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
								<!-- <u-form-item label="电话" prop="tel" >  
									<u--input
										v-model="form.tel"  
										placeholder="请输入电话"
									></u--input> 
								</u-form-item> 
								<u-form-item label="邮箱" prop="email" >  
									<u--input
										v-model="form.email"  
										placeholder="请输入邮箱"
									></u--input> 
								</u-form-item> 
								<u-form-item label="地址" prop="address" >  
									<u--input
										v-model="form.address"  
										placeholder="请输入地址"
									></u--input> 
								</u-form-item> -->
							</u--form>
							
						</view>
						
					</u-list>
					
				</view>
				<view class="confirm-rows u-p-20" :style="{
					backgroundColor: themeConfig.navBg,
				}">
					<u-button :customStyle="{backgroundColor: themeConfig.badgeBg, color: '#fff', border: 'none'}" shape="circle" @click="handleConfirm">提 交</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name:"menusPopupAddGroup",
		props: { 
			theme: {
				type: String,
				default: 'white'
			}, 
			overlayStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			show: {
				type: Boolean,
				default: false
			},
			cate: {
				type: String,
				default: '2'
			}, 
		},
		async mounted() {
			this.$refs.form.setRules(this.rules)
		},
		data() {
			return {
				tips: '获取验证码',
				form: {
					name: '',
					position: '',
					company: '',
					phone: '',
					tel: '',
					email: '',
					address: '',  
					captcha: ''
				}
			};
		},
		watch: { 
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				wode: state => state.user.wode,
				
			}),
			themeConfig() {
				return this.typeConfig[this.theme]
			}, 
			rules() {
				let baseRules = {
					'name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					// 'position': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请填写职位',
					// 	trigger: ['blur', 'change']
					// },
					'company': {
						type: 'string',
						required: true,
						message: '请填写公司',
						trigger: ['blur', 'change']
					},
					'phone': [
						{
							required: true, 
							message: '请输入手机号',
							trigger: ['change','blur'],
						},
						{ 
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确', 
							trigger: ['change','blur'],
						}
					],
				}
				let cate3Rule = {
					'captcha': {
						type: 'string',
						required: true,
						message: '请填写验证码',
						trigger: ['blur', 'change']
					},
				}
				let rule = {...baseRules}
				
				if(this.cate == 3) {
					rule = {
						...rule,
						...cate3Rule
					} 
				}
				
				if(this.$refs.form && this.$refs.form.setRules) {
					this.$nextTick(() => {
						this.$refs.form.setRules(rule)	 
					})
					
				}
				return rule
			}
		},
		mounted() {
			if(this.wode?.mobile) {
				this.form.phone = this.wode.mobile
			}
			
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),  
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				this.$refs.form.validateField('phone', async (err) => {
					console.log(err)
					if(err && err.length > 0) return
					if (this.$refs.uCode.canGetCode) {
					  // 模拟向后端请求验证码
					  uni.showLoading()
					  const res = await this.$api.loginMobile({
						  params: {
							  mobile: this.form.phone,
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
			close() {
				this.$emit('close') 
			},
			async open() {
				this.$nextTick(() => {
					this.$refs.form.setRules(this.rules)	 
				})
			}, 
			async handleConfirm() {
				
				this.$refs.form.validate().then(async res => { 
					this.$emit('confirm', {data: this.form})
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('校验失败')
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
