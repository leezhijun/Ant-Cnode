// 将token存入sessionStorage
export const setAccessToken = (token) => {
  sessionStorage.setItem('AccessToken', token)
}
// 将token取出
export const getAccessToken = () => {
  return sessionStorage.getItem('AccessToken')
}
// 清除token
export const removeAccessToken = () => {
  sessionStorage.removeItem('AccessToken')
}
