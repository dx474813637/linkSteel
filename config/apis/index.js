const list = require.context(".", true, /.js$/)

let apis = {}
list.keys().forEach(ele => {
	if(ele != "./index.js") { 
		let obj = list(ele).default || list(ele)
		apis = {
			...apis,
			...obj
		}
	}
})


export default apis