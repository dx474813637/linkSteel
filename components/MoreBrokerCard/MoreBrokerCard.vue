<template>
	<view class="card u-p-20 bg-white" >
		<view class="card-header u-flex u-flex-items-center u-p-l-40 u-p-t-40 u-p-r-20 u-p-b-20">
			<view class="item">
				<view class="u-flex u-flex-items-end u-m-b-15">
					<view class="u-flex u-flex-items-center">
						<i class="u-font-32 custom-icon-my custom-icon"></i>
						<view class="u-font-40 u-p-l-20">{{origin.contact}}</view>
						<view class="tims-btn u-flex u-flex-items-center u-m-l-20 u-m-t-4" @click="handleGoto({url: '/pages/my/msg/msgDetail', params: {login: origin.login}})">
							<i class="custom-icon-tims custom-icon u-font-24"></i>
							<text class="u-font-24 u-m-l-8">在线联系</text>
						</view>
						
					</view>
					
				</view>
				<view class="u-flex u-flex-items-center" @click="copy(origin.name)">
					<i class=" u-font-28 custom-icon-caiyouduo_zhuye-weixuanzhong custom-icon"></i>
					<view class="u-p-l-20 sub">{{origin.name}}</view>
					<i class="custom-icon-fuzhi custom-icon u-m-l-15 u-font-28"></i>
				</view>
			</view>
		</view>
		<view class="card-main u-p-t-20 u-p-b-20 u-p-r-20 u-p-l-40">
			<view class="item u-m-b-15">
				<view class="u-flex u-flex-items-center" v-if="origin.mobile">
					<i class=" u-font-28 custom-icon-dianhua custom-icon"></i>
					<view class="u-p-l-20 sub u-font-30">{{origin.mobile}}</view>
					<i class="custom-icon-iconfonta custom-icon u-m-l-15 u-font-28" @click="makecall(origin.mobile)"></i>
					<i class="custom-icon-fuzhi custom-icon u-m-l-15 u-font-26" @click="copy(origin.mobile)"></i>
				</view>
			</view>
			<view class="item u-m-b-15">
				<view class="u-flex u-flex-items-center" v-if="origin.tel">
					<i class=" u-font-28 custom-icon-dianhua custom-icon"></i>
					<view class="u-p-l-20 sub u-font-30"  @click="makecall(origin.tel)">{{origin.tel}}</view>
					<i class="custom-icon-iconfonta custom-icon u-m-l-15 u-font-28" @click="makecall(origin.tel)"></i>
					<i class="custom-icon-fuzhi custom-icon u-m-l-15 u-font-28" @click="copy(origin.tel)"></i>
				</view>
			</view>
			<view class="item u-m-b-15">
				<view class="u-flex u-flex-items-center" v-if="origin.email" @click="copy(origin.email)">
					<i class=" u-font-28 custom-icon-tubiao209 custom-icon"></i>
					<view class="u-p-l-20 sub u-font-30">{{origin.email}}</view>
					<i class="custom-icon-fuzhi custom-icon u-m-l-15 u-font-28"></i>
				</view>
			</view>
			<view class="item ">
				<view class="u-flex u-flex-items-center" v-if="origin.address" @click="copy(origin.address)">
					<i class=" u-font-28 custom-icon-ziyuan custom-icon"></i>
					<view class="u-p-l-20 sub u-font-30">{{origin.address}}</view>
					<i class="custom-icon-fuzhi custom-icon u-m-l-15 u-font-28"></i>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		props: {
			origin: {
				type: Object,
				default: () =>{
					return {}
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			makecall(obj) {
				uni.makePhoneCall({
					phoneNumber: obj
				})
			},
			copy(obj) {
				uni.setClipboardData({
					data: obj,
					success: function () {
					}
				});
			}
		}
	}
</script>


<style lang="scss" scoped>
	.card {
		border-radius: 20px;
		overflow: hidden;
		background-image: url('https://wx.rawmex.cn/Public/a5.jpg');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		min-height: 150px;
		box-shadow: 0 0 10px rgba(0,0,0,.1);
		color: #fff;
	}
	.custom-icon {
		color: #7d8ece!important;
	}
	.sub {
		color: #c0d1ff;
	}
	.tims-btn {
		border: 1rpx solid #54666f;
		color: #72c8e8;
		padding: 3px 8px;
		border-radius: 20px;
	}
</style>