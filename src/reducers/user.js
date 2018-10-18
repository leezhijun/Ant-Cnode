import {
  SET_USER,
  CLEAR_USER
} from '../actions/actionType'
const user = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_USER :
      return action.data
    case CLEAR_USER:
      return {}
    default: return state
  }
}
export default user
