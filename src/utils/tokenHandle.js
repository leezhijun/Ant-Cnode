// 将token存入sessionStorage
export const setAccessToken = (param) => {
  sessionStorage.setItem('AccessToken', param)
}
// 将token取出
export const getAccessToken = () => {
  return sessionStorage.getItem('AccessToken')
}
// 将用户名存入sessionStorage
export const setLoginName = (param) => {
  sessionStorage.setItem('LoginName', param)
}
// 将用户名取出
export const getLoginName = () => {
  return sessionStorage.getItem('LoginName')
}
// 清除token
export const removeSessionStorage = (param) => {
  sessionStorage.removeItem(param)
}
