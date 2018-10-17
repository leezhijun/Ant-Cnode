import {
  SET_TOPOCS,
  SET_TOPOC,
  SET_LOGIN,
  SET_USER,
  SET_COLLECT
} from './actionType'
import axios from 'axios'
import { getAccessToken } from '../utils/tokenHandle'
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
    const accessToken = getAccessToken()
    if (accessToken) {
      return axios.get(`/api/v1/topic/${id}`, {
        accesstoken: accessToken
      })
        .then(function (response) {
          // console.log(response)
          dispatch(setTopic(response.data.data))
        })
    } else {
      return axios.get(`/api/v1/topic/${id}`)
        .then(function (response) {
          // console.log(response)
          dispatch(setTopic(response.data.data))
        })
    }
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

export /**
* 登录验证
* @param {object} accessToken 令牌
* @returns
*/
const getLogin = (accessToken) => {
  return dispatch => {
    return axios.post('/api/v1/accesstoken', {
      accesstoken: accessToken
    })
    // .then(function (response) { // 为了先执行Toast效果，所以提出去
    //   // console.dir(response)
    //   dispatch(setLogin(response.data))
    // })
  }
}

export /**
 * 获得请求用户登录数据
 *
 * @param {object} data 用户数据
 * @returns
 */
const setLogin = (data) => {
  return {
    type: SET_LOGIN,
    data
  }
}

export /**
 * 请求用户个人数据
 *
 * @param {string} loginname 用户名
 * @returns
 */
const getUser = (loginname) => {
  return dispatch => {
    return axios.get(`/api/v1/user/${loginname}`)
      .then(function (response) {
        // console.log(response)
        dispatch(setUser(response.data.data))
      })
  }
}

export /**
 * 将获取的用户数据存入redux
 *
 * @param {object} data 用户数据
 * @returns
 */
const setUser = (data) => {
  return {
    type: SET_USER,
    data
  }
}

export /**
 * 话题发布发送数据
 *
 * @param {string} accesstoken 用户令牌
 * @param {string} title 文章标题
 * @param {string} tab 文章分类
 * @param {string} content 文章内容
 * @returns
 */
const getPublish = (accesstoken, title, tab, content) => {
  return dispatch => {
    return axios.post('/api/v1/topics', {
      accesstoken,
      title,
      tab,
      content
    })
  }
}

export /**
 * 文章收藏
 *
 * @param {*} accesstoken 用户令牌
 * @param {*} topic_id 文章id
 * @returns
 */
const getCollect = (accessToken, topicid) => {
  return dispatch => {
    return axios.post('/api/v1/topic_collect/collect', {
      accesstoken: accessToken,
      topic_id: topicid
    })
  }
}

export /**
 * 文章收藏取消
 *
 * @param {*} accesstoken 用户令牌
 * @param {*} topic_id 文章id
 * @returns
 */
const getDeCollect = (accessToken, topicId) => {
  return dispatch => {
    return axios.post('/api/v1/topic_collect/de_collect', {
      accesstoken: accessToken,
      topic_id: topicId
    })
  }
}

export /**
 * 执行收藏或取消收藏操作
 *
 * @returns
 */
const setCollect = () => {
  return {
    type: SET_COLLECT
  }
}

export /**
 * 用户评论点赞
 *
 * @param {string} accessToken 用户令牌
 * @param {string} replyId 回复id
 * @returns
 */
const getUps = (accessToken, replyId) => {
  return dispatch => {
    return axios.post(`/api/v1/reply/${replyId}/ups`, {
      accesstoken: accessToken
    })
  }
}

export const getReply = (accessToken, content, topicId, replyId) => {
  return dispatch => {
    return axios.post(`/api/v1/topic/${topicId}/replies`, {
      accesstoken: accessToken,
      content,
      reply_id: replyId
    })
  }
}
