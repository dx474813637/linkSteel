<template>
	<view>
		<template v-if="project == 'base'">
			<indexItem 
				@changeProject="changeProject"
				@setOnlineControl="setOnlineControlEvent"
				></indexItem>
		</template> 
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo' 
	import { current_project } from '@/utils/isProject.js' 
	export default {
		mixins: [mixShareInfo],
		data() {
			return { 
				project: ''
			};
		}, 
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
			}), 
		},
		onLoad() {
			console.log(current_project)
			this.project = current_project
		},
		watch: {
			project(n) {
				console.log(n)
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			changeProject() { 
				this.project = current_project
			},
			setOnlineControlEvent(res) {
				console.log(res)
				this.setOnlineControl(res)
			}
		}
	}
</script>

<style lang="scss">
	page {
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	 
</style>
