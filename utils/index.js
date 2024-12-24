export function js2Fixed(target, num) {
	let o = Math.pow(10, num);
	return (Math.round(target * o)/o).toFixed(num)
}

export function phoneHide(phone) {
	if(!phone) return ''
	let reg = /^(1[3-9][0-9])\d{4}(\d{4}$)/; // 定义手机号正则表达式
	phone = phone.replace(reg, '$1****$2');
	return phone; // 185****6696
}
export function emailHide(email) {
	if(!email) return ''
    var avg;
    var splitted;
    var email1;
    var email2;
    splitted = email.split('@');
    email1 = splitted[0];
    avg = email1.length / 2;
    email1 = email1.substring(0, email1.length - avg);
    email2 = splitted[1];
    return email1 + '***@' + email2; // 输出为81226***@qq.com
}

export function cardHide(card) {
	if(!card) return ''
    const reg = /^(.{6})(?:\d+)(.{4})$/; // 匹配身份证号前6位和后4位的正则表达式
    const maskedIdCard = card.replace(reg, '$1******$2'); // 身份证号脱敏，将中间8位替换为“*”
    return maskedIdCard; // 输出：371782******5896
} 
export function nameHide(name) {
	if(!name) return ''
    if (name.length == 2) {
        name = name.substring(0, 1) + '*'; // 截取name 字符串截取第一个字符，
        return name; // 张三显示为张*
    } else if (name.length == 3) {
        name = name.substring(0, 1) + '*' + name.substring(2, 3); // 截取第一个和第三个字符
        return name; // 李思思显示为李*思
    } else if (name.length > 3) {
        name = name.substring(0, 1) + '*' + '*' + name.substring(3, name.length); // 截取第一个和大于第4个字符
        return name; // 王五哈哈显示为王**哈
    }
}