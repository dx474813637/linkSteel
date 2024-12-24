/**
 * @description 自定义路由拦截
 */

// import { getAuthorization } from '@/utils/auth'
import {permissionBase} from '@/config/permission/base/index.js'
import {isSubPackages} from '@/utils/isSubPackages.js'
import { current_project } from '@/utils/isProject.js'

 

export default function(vm) {
	console.log(vm)
	const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
	// 用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
	list.forEach(item => {
		uni.addInterceptor(item, {
			invoke(e) {
				let model_name = current_project //isSubPackages(e)
				console.log(model_name)
				if(model_name == 'base') {
					let res = permissionBase(vm, e)
					console.log('ceshi', res)
					if(!res) return false
				}
				else if(model_name == 'chemnet') { 
					
				}
				
				return e
			},
			fail(err) { // 失败回调拦截
				console.log(err)
			}
		})
	})
}
