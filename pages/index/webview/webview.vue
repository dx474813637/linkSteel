<template>
	<view>
		<web-view 
			:webview-styles="webviewStyles" 
			:src="webUrl"
		></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webUrl: ''
			};
		},
		computed: {
			webviewStyles() {
				return {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(options) {
			if(options.hasOwnProperty('tims')) {
				let web = 'https://tms.rawmex.cn/'
				this.webUrl = Object.entries(options).filter(ele => ele[0] != 'tims').reduce((pre, cur, index) => {
					return pre += (index == 0 ? '?' :'&') +cur.join('=')
				}, web)
				console.log(this.webUrl)
			}
		}
	}
</script>

<style lang="scss">

</style>
