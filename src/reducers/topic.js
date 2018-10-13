import {
  SET_TOPOC
} from '../actions/actionType'
const topic = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_TOPOC :
      return action.data
    default: return state
  }
}
export default topic
