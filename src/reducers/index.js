import { combineReducers } from 'redux'
import topics from './topics' // 话题列表
import topic from './topic' // 话题文章
import login from './login' // 登录
import user from './user' // 用户
import message from './message' // 消息
export default combineReducers({
  topics,
  topic,
  login,
  user,
  message
})
