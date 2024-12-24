
export const RULES = [ 'pic1_c', 'pic1', 'pic2_c', 'pic2']
export function filterData(data, rules, noImage) {
	let filterData = uni.$u.deepClone(data)
	for (let key in filterData) {
		if (key.includes('list_') && (filterData[key] instanceof Array)) {
			// console.log(key)
			filterData[key] = addImageKey(filterData[key], rules, noImage)
		}
	}
	return filterData
}
export function addImageKey(arr, rules, noImage) {
	// 根据规则 添加显示字段 
	arr.forEach(ele => {
		addObjImageKey(ele, rules, noImage)
	})
	// console.log(arr)
	return arr
}

export function addObjImageKey(obj, rules, noImage) {
	let imageItem = ''
	rules.forEach(rule => {
		if (obj[rule]) imageItem = obj[rule]
	})
	obj.image = imageItem || noImage
}