import {
  SET_TOPOCS
} from './actionType'
import axios from 'axios'
export const getTopics = (tab) => {
  return dispatch => {
    axios.get('/api/v1/topics', {
      params: {
        tab: tab
      }
    })
      .then(function (response) {
        // console.log(response)
        dispatch(setTopics(tab, response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const setTopics = (tab, data) => {
  return {
    type: SET_TOPOCS,
    tab: {
      tab,
      data
    }
  }
}
