import {
  GET_TOPICS
} from './actionType'

export const getTopics = (tab) => {
  return {
    type: GET_TOPICS,
    tab
  }
}
