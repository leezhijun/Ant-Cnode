import {
  SET_TOPOCS,
  SET_TOPOC
} from './actionType'
import axios from 'axios'

export /**
 * @method getTopics 请求主题数据
 * @param {string} tab 主题分类
 * @param {number} page 当前页码
 * @param {number} limit 请求条数
 * @returns
 */
const getTopics = (tab, page, limit) => { // 通过API请求，获取话题数据
  return dispatch => {
    // console.log(page)
    return axios.get('/api/v1/topics', {
      params: {
        tab,
        page,
        limit
      }
    })
      .then(function (response) {
        // console.log(response)
        dispatch(setTopics(tab, response.data.data, page))
      })
  }
}

export /**
 * @method setTopics 处理主题分类
 * @param {string} tab 主题分类
 * @param {array} data 主题分类数据
 * @param {string} page 主题页码
 * @returns
 */
const setTopics = (tab, data, page) => {
  return {
    type: SET_TOPOCS,
    tab: {
      tab,
      data
    },
    page
  }
}

export /**
 * 文章请求
 * @param {string} id 文章id
 * @returns promise
 */
const getTopic = (id) => { // 通过API请求，获取话题数据
  return dispatch => {
    // console.log(page)
    return axios.get(`/api/v1/topic/${id}`)
      .then(function (response) {
        // console.log(response)
        dispatch(setTopic(response.data.data))
      })
  }
}

export /**
 * 将获取的文章数据存放到redux
 * @param {object} data 话题文章内容
 * @returns
 */
const setTopic = (data) => {
  return {
    type: SET_TOPOC,
    data
  }
}
