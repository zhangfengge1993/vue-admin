import store from '../store/index'
export function buttonPermissions(permissions) {
    const button = store.state.login.buttonPermissions
    return button.indexOf(permissions) >= 0

}