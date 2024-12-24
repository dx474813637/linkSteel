
// import * as apis from '@/config/api'
import darkConfig from './themeConfig/theme_dark_config'
import whiteConfig from './themeConfig/theme_white_config'
import chemnetConfig from './themeConfig/theme_chemnet_config'
import {darkSeries, darkBaseOptions} from './themeConfig/theme_dark_echarts'
import {whiteSeries, whiteBaseOptions} from './themeConfig/theme_white_echarts'
console.log(chemnetConfig)
let state = {
		typeActive: uni.getStorageSync('themeActive') || 'white',
		typeConfig: {
			dark: darkConfig,
			white: whiteConfig,
			chemnet: chemnetConfig
		},
		echarts: {
			dark: {
				series: darkSeries,
				base: darkBaseOptions,
			},
			white: {
				series: whiteSeries,
				base: whiteBaseOptions,
			},
		},
	},
	getters = {
		sys() {
			return uni.getSystemInfoSync()
		},
		themeConfig(state) {
			return state.typeConfig[state.typeActive]
		},
		echartsConfig(state) {
			return state.echarts[state.typeActive]
		},
	},
	mutations = {
		setTheme(state, type) {
			state.typeActive = type
			uni.setStorageSync('themeActive', type)
		},
		setNavColor(state) {
			uni.setNavigationBarColor({
				frontColor: state.typeConfig[state.typeActive].frontColor,
				backgroundColor: state.typeConfig[state.typeActive].navBg
			})
		}
	},
	actions = {
		
	}
	
	
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}