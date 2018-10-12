import {
  SET_TOPOCS
} from './actionType'
import axios from 'axios'
export const getTopics = (tab, page, limit) => {
  return dispatch => {
    console.log(page)
    axios.get('/api/v1/topics', {
      params: {
        tab,
        page,
        limit
      }
    })
      .then(function (response) {
        // console.log(response)
        dispatch(setTopics(tab, response.data.data))
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
