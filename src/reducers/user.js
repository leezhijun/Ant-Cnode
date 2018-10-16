import {
  SET_USER
} from '../actions/actionType'
const user = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_USER :
      return action.data
    default: return state
  }
}
export default user
