import {
  SET_TOPOCS
} from '../actions/actionType'
const topics = (state = [], action = {}) => {
  switch (action.type) {
    case SET_TOPOCS :
      let tabHave = state.filter(item => item.tab === action.tab.tab)
      console.log(tabHave)
      if (tabHave.length) {
        let newdata = [
          ...tabHave[0].data,
          ...action.tab.data
        ]
        // console.log(newdata)
        state.map(item => {
          if (item.tab === action.tab.tab) {
            item.data = newdata
          }
        })
        return [
          ...state
        ]
      } else {
        return [
          ...state,
          action.tab
        ]
      } break
    default: return state
  }
}
export default topics
