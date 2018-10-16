import {
  SET_LOGIN
} from '../actions/actionType'
const login = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_LOGIN :
      return action.data
    default: return state
  }
}
export default login
