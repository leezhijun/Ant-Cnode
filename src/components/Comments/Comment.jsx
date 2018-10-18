import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Flex, WhiteSpace, Toast } from 'antd-mobile'
import { getAccessToken } from '../../utils/tokenHandle'
import { getUps, getReply, getTopic } from '../../actions'
import Reply from './Reply'
import PropTypes from 'prop-types'
/* eslint-disable react/self-closing-comp */
class Comment extends Component {
  state = {
    ups: null,
    reply: false,
  }

  scrollToAnchor = (anchorName) => {
    if (anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView(); }
    }
  }

  componentDidMount () {
    this.setState({
      ups: this.props.ups.length,
    })
    this.scrollToAnchor(this.props.location.hash.replace(/#/, "")) // 如果有锚点则跳转至锚点
  }

  upsHandle = () => {
    let { id, getUps } = this.props
    let accessToken = getAccessToken()
    if (!accessToken) {
      Toast.fail('请先登录!', 1)
      return false
    }
    getUps(accessToken,id)
     .then((response)=>{
        if (response.data.action==='up') {
          let ups = this.state.ups
          this.setState({
            ups: ups + 1
          })
        } else {
          let ups = this.state.ups
          this.setState({
            ups: ups - 1
          })
        }
     })
     .catch((error)=>{
      Toast.info('操作失败'+error.request.statusText, 1)
     })
  }

  replyHandle = () => {
    let accessToken = getAccessToken()
    if (!accessToken) {
      Toast.fail('请先登录!', 1)
      return false
    }
    this.setState({
      reply: !this.state.reply
    })
  }

  render () {
    const ups = this.state.ups ? this.state.ups : ''
    return (
      <li>
        <WhiteSpace />
        <Flex className='comment-title' justify='between' align='baseline'>
          <div className='comment-title-left'>
            <img src={this.props.author.avatar_url} id={this.props.id} />
            <Link to={'/user/' + this.props.author.loginname}>{this.props.author.loginname}</Link>
          </div>
          <Flex className='comment-title-right'>
            <div onClick={this.upsHandle}><i className='iconfont icon-like'></i>{ups}&nbsp;&nbsp;</div>
            <div onClick={this.replyHandle}><i className='iconfont icon-chehuisekuai'></i></div>
          </Flex>
        </Flex>
        <WhiteSpace />
        <article className='markdown-body' dangerouslySetInnerHTML={{ __html: this.props.content }}></article>
        <Reply replyId={this.props.id} reply={this.state.reply} replyAuthor={'@' + this.props.author.loginname + ' '}/>
      </li>
    )
  }
}

if (process.env.NODE_ENV === 'development') {
  // 类型校验
  Comment.propTypes = {
    author: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    ups: PropTypes.array.isRequired,
    getReply: PropTypes.func.isRequired,
    getUps: PropTypes.func.isRequired,
    getTopic: PropTypes.func.isRequired,
    topicId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }
}

const mapStateToProps = (state) => {
  return {
    topicId: state.topic.id // 文章id
  }
}

export default withRouter(connect(mapStateToProps, { getUps, getReply, getTopic })(Comment))
