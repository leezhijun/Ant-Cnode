import {
  SET_TOPOC,
  SET_COLLECT
} from '../actions/actionType'
const topic = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_TOPOC :
      return {
        ...state,
        ...action.data // 有回复时，数据更新
      }
    case SET_COLLECT :
      let isCollect = !Object.assign({}, state).is_collect
      return {
        ...state,
        is_collect: isCollect
      }
    default: return state
  }
}
export default topic
