import { current_project } from '@/utils/isProject.js'

const model = {
	base:[ 
		{
			pattern: /^\/pages\/index\/*/
		},
		{
			pattern: /^\/pages\/more*/
		},
		{
			pattern: /^\/pages\/my*/
		},
		{
			pattern: /^\/pages\/baojia*/
		}
	],
	chemnet: [
		{
			pattern: /^\/pages\/chemnet*/
		}
	]
}

export function isSubPackages(e) {
	const url = e.url.split('?')[0]
	let key = '' 
	if(url == '/pages/index/index') {
		return current_project
	} 
	for(let model_name in model) {
		let flag = model[model_name].some((item) => {
			if (typeof(item) === 'object' && item.pattern) {
				return item.pattern.test(url)
			}
			return url === item
		})
		
		if(flag) key =  model_name 
	}
	return key
	
}