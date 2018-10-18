import {
  SET_MESSAGE
} from '../actions/actionType'
const message = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_MESSAGE :
      return action.data
    default: return state
  }
}
export default message
