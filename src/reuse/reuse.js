// 过滤特殊字符
export function stripscript(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
// 用户邮箱名正则验证
export function regularUsername(val) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (!reg.test(val)) {
        return false
    } else {
        return true
    }
}
// 用户密码正则验证
export function regularPassword(val) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    if (!reg.test(val)) {
        return false
    } else {
        return true
    }
}
// 验证码正则验证
export function regularCsaptcha(val) {
    let reg = /^[a-z0-9]{6}$/;
    if (!reg.test(val)) {
        return false
    } else {
        return true
    }
}