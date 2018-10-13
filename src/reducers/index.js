import { combineReducers } from 'redux'
import topics from './topics' // 话题列表
import topic from './topic' // 话题文章
export default combineReducers({
  topics,
  topic
})
