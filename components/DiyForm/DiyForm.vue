<template>
	<view>
		<u--form
			labelPosition="top"
			:model="formData" 
			:ref="refName"
			labelWidth="100%"
		>
			<view
				v-for="(item, index) in form"
				:key="item.id"
			> 
				<DiyFormItems
					:idata="formData"
					:el="item"
					:isView="isView"
					@change="handleChange"
				></DiyFormItems>
			</view>
			<view class="u-p-20" v-if="showSure">
				<u-button type="primary" @click="submit">{{sureText}}</u-button>
			</view> 
		</u--form>
	</view>
</template>
<script>  
	import DiyFormItems from '@/components/DiyForm/DiyFormItems.vue'
	export default {
		name: "diy-form",
		components: {
			DiyFormItems
		},
		props: {
			sureText: {
				type: String,
				default: "确 定"
			},
			cancelText: {
				type: String,
				default: "取 消"
			},
			showSure: {
				type: Boolean,
				default: true
			},
			showCancel: {
				type: Boolean,
				default: true
			},
			showClear: {
				type: Boolean,
				default: false
			},
			refName: {
				type: String,
				default: "FormRef"
			},
			ddata: {
				type: Object,
				default: () => {}
			},
			form: {
				type: Array,
				default: () => []
			},
			name: {
				type: String,
				default: ""
			},
			flex: {
				type: String,
				default: "col"
			},
			align: {
				type: String,
				default: "center"
			},
			isView: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				formData: {},
				FormRef: '',
				rules: {}, 
			}
		},
		created() {
			// console.log(this.form, 'c') 
			this.init()
		},
		mounted() { 
		},
		watch: {
			formData: {
				handler(n) {  
					this.$nextTick(() => {
						this.$refs[this.refName]
							.validate()
							.then(async r => { 
								this.$emit('updateFormData', {formData: n, validate: r}) 
							})
							.catch(errors => {
								this.$emit('updateFormData', {formData: n, validate: false, errors}) 
							})
					})
					 
					
				},
				deep: true
			}
		},
		computed: {
			
		},
		methods: { 
			getRules(){
				let rules = {}
				this.form.forEach(items => {
					let {
						type,
						required, 
						name,
						parameter_name
					} = items;
					if(required == '1') {
						let message = `请${type && type.includes("text") ? "输入" : "选择"}${name || "内容"}`;
						rules[parameter_name] = [{
							required: true,
							message,
							trigger: ["blur", "change"]
						}];
					} 
				})  
				return rules
			}, 
			removeBtn(){
				this.$ref[this.FormRef].resetFields()
				this.$emits('remove')
			},
			init() { 
				this.initFormData()
			}, 
			initFormData() {
				this.form.forEach(ele => {
					this.$set(this.formData, ele.parameter_name, ele.parameter_value)
				})
				let rules = this.getRules() 
				this.$nextTick(() => {
					this.$refs[this.refName].setRules(rules)	 
				})
				
			},
			submit() {
				console.log(this.formData)
				this.$refs[this.refName]
					.validate()
					.then(async r => {
						console.log(r)
					}) 
			},
			handleChange(data) {
				console.log(data)
				let {res, el} = data;
				this.formData[el.parameter_name] = res
			}
		}
	};
</script> 
<style scoped lang="scss">
	.condition {
		min-width: 100%;
	}

	.tip {
		p {
			color: #f00;
			font-size: 10px;
			transform: scale(0.9);
			position: absolute;
			margin-left: 68px !important;
			margin-top: 5px;
		}
	}

	.flex-col-start {
		>div {
			width: 100%;
		}
	}

	.el-form {
		padding-bottom: 10px;

		>div {
			::v-deep .el-form-item {

				// width: 100%;
				.el-form-item__content {
					>div {
						>p {
							margin-left: 20px;
						}
					}
				}
			}
		}

		.handle {
			width: 100%; //!important;

			&.row {
				width: auto;
				flex: 0 0 auto;
			}
		}

		>div {
			// flex: 0 0 50%;
			flex: 0 0 100%;
			// margin-top: 10px;
			align-items: center;

			&.width-auto {
				flex: 0 0 auto;
				width: auto;
				padding-right: 10px;
			}

			// background: #f00;
			>h4 {
				margin-bottom: 10px;
				font-size: 15px;

				>i {
					color: #f00;
					margin-right: 4px;
				}
			}

			>div {
				.el-form-item {
					margin-bottom: 15px;

					>div {
						>div {}
					}

					::v-deep .el-form-item__error {
						// top: 105%;
						left: 10px;
					}
				}
			}
		}

		>.handle {
			flex: 0 0 100%; //!important;
			text-align: left;
		}
	}
</style>