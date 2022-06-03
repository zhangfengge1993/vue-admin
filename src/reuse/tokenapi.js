import Cookies from "js-cookie";
const adminToken = "admin_token"
export function getToken() {
    return Cookies.get(adminToken)
}
export function setToken(token) {
    return Cookies.set(adminToken, token)
}
export function removeToken() {
    return Cookies.remove(adminToken)

}
export function getUserName() {
    return Cookies.get('username')
}
export function setUserName(val) {
    return Cookies.set('username', val)
}
export function removeUserName() {
    return Cookies.remove('username')

}
export function getiscollapse() {
    return JSON.parse(Cookies.get('iscollapse'))
}
export function setiscollapse(val) {
    return Cookies.set('iscollapse', JSON.stringify(val))
}
export function removeiscollapse() {
    return Cookies.remove('iscollapse')

}