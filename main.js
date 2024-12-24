import App from './App'
// import './config/mockData.js'
import filters from '@/config/filters.js'
import wxp from '@/utils/toPromise.js' 

const prePage = ()=>{
	let pages = getCurrentPages();
	if(pages.length == 1) return 
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
// #ifndef VUE3
import Vue from 'vue'
import store from './store'
import uView from '@/uni_modules/uview-ui'
import setHttp from '@/config/request.js'
import apis from '@/config/apis/index'
console.log(apis)
Object.keys(filters).forEach(item => Vue.filter(item, filters[item]))
Vue.use(uView)
Vue.config.productionTip = false
Vue.prototype.$store = store 
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
setHttp(app)
Vue.prototype.$http = uni.$u.http
Vue.prototype.$api = apis
Vue.prototype.$wxp = wxp
Vue.prototype.$utils = {prePage};
app.$mount()
// #endif



// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif