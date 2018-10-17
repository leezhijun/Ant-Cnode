import {
  SET_TOPOC,
  SET_COLLECT
} from '../actions/actionType'
const topic = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_TOPOC :
      return action.data
    case SET_COLLECT :
      let is_collect = !Object.assign({}, state).is_collect
      return {
        ...state,
        is_collect: is_collect
      }
    default: return state
  }
}
export default topic
