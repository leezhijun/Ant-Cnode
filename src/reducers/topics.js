import {
  SET_TOPOCS
} from '../actions/actionType'
const topics = (state = [], action = {}) => {
  switch (action.type) {
    case SET_TOPOCS :
      return [
        ...state,
        action.tab
      ]
    default: return state
  }
}
export default topics
