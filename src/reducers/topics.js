import {
  SET_TOPOCS
} from '../actions/actionType'
const topics = (state = [], action = {}) => {
  switch (action.type) {
    case SET_TOPOCS : // 获取话题列表数据
      console.log(action)
      if (action.page > 1) { // 判断是不是翻译
        let tabHave = state.filter(item => item.tab === action.tab.tab) // 判断是第一次请求还是翻页
        let newdata = [
          ...tabHave[0].data,
          ...action.tab.data
        ]
        console.log(newdata)
        let newState = state.map(item => {
          if (item.tab === action.tab.tab) {
            item.data = newdata
          }
          return item
        })
        return newState
      } else {
        let tabHave = state.filter(item => item.tab === action.tab.tab)
        if (tabHave.length) { // goback()返回组件时，避免重复数据
          return [
            ...state
          ]
        }
        return [ // 第一次请求，则添加为新数组
          ...state,
          action.tab
        ]
      }
    default: return state
  }
}
export default topics
