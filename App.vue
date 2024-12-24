<script>
	import routingIntercept from '@/config/permission/index.js'
	import { changeProject } from '@/utils/isProject.js'
	import store from '@/store'
	
	// import {tim_online_login} from '@/utils/tims_login.js'
	export default {
		onLaunch: async function(opt) {
			// console.log(1,opt)
			// let e = uni.getSystemInfoSync();
			if (uni.canIUse('getUpdateManager')) {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							uni.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success: function(res) {
									console.log('success====', res);
									// res: {errMsg: "showModal: ok", cancel: false, confirm: true}
									if (res.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate();
									}
								}
							});
						});
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							uni.showModal({
								title: '已经有新版本了哟~',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
							});
						});
					}
				});
			}
			
			// store.dispatch('user/wode', {bd: 1}) 
			routingIntercept(this)
			
		},
		onShow: function(options) { 
			console.log('opt.query', options.query)
			if(options.query?.project) {
				changeProject(options.query.project)
			}
			if(options.query?.share_other) { 
				store.commit('user/setShareOther', options.query.share_other) 
			}
			// const res = uni.getStorageSync('WebSocketInfo')
			// if(res) this.$ws.init()
			// tim_online_login()
		},
		onHide: function() {
			// console.log('App Hide')
			// uni.closeSocket()
			// this.$ws.completeClose()
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	@import '@/common/ext.scss';
	@import '@/common/iconfont.css';
</style>
