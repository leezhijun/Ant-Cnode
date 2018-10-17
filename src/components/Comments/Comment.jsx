import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Flex, WhiteSpace, Toast, TextareaItem, Button } from 'antd-mobile'
import { getAccessToken } from '../../utils/tokenHandle'
import { getUps, getReply } from '../../actions'
import PropTypes from 'prop-types'
/* eslint-disable react/self-closing-comp */
class Comment extends Component {
  state = {
    ups: null,
    reply: false,
    replyContent: ''
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
    let replyContent = '@' + this.props.author.loginname + ' '
    this.setState({
      ups: this.props.ups.length,
      replyContent: replyContent
    })
    this.scrollToAnchor(this.props.location.hash.replace(/#/, ""))
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
    let reply = this.state.reply
    this.setState({
      reply: !reply
    })
  }

  changeValueContent = (val) => {
    this.setState({
        replyContent: val
      })
  }

  replyContentHandle = () => {
    if (!this.state.replyContent) {
      Toast.info('回复不能为空', 1)
      return false
    } else {
      let accessToken = getAccessToken()
      let content = this.state.replyContent
      let topicId = this.props.topicId
      let replyId = this.props.id
      this.props.getReply(accessToken, content, topicId, replyId)
       .then((response)=>{
         let reply_id = response.data.reply_id
         this.props.history.go(`/topic/${topicId}#${reply_id}`)
       })
       .catch((error)=>{
        Toast.info('操作失败'+error.request.statusText, 1)
       })
    }
  }

  renderReplyEdit = () => {
    return (
      <Fragment>
        <TextareaItem className='reply'
              placeholder='回复'
              data-seed="logId"
              rows={4}
              autoHeight
              ref={el => this.customFocusInst = el}
              value={this.state.replyContent}
              onChange={this.changeValueContent}
            />
        <WhiteSpace />
        <Flex justify='end'>
          <Button type="ghost" size="small" onClick={this.replyContentHandle} inline className="am-button-borderfix">回复</Button>
        </Flex>
        <WhiteSpace />
      </Fragment>
    )
  }

  render () {
    const ups = this.state.ups
    return (
      <li>
        <WhiteSpace />
        <Flex className='comment-title' justify='between' align='baseline'>
          <div className='comment-title-left'>
            <img src={this.props.author.avatar_url} id={this.props.id} />
            <Link to={'/user/' + this.props.author.loginname}>{this.props.author.loginname}</Link>
          </div>
          <Flex className='comment-title-right'>
            {
              ups ? <div onClick={this.upsHandle}><i className='iconfont icon-like'></i>{ups}&nbsp;&nbsp;</div> : ''
            }
            <div onClick={this.replyHandle}><i className='iconfont icon-chehuisekuai'></i></div>
          </Flex>
        </Flex>
        <WhiteSpace />
        <article className='markdown-body' dangerouslySetInnerHTML={{ __html: this.props.content }}></article>
        { this.state.reply ? this.renderReplyEdit() : '' }
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
    topicId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }
}

export default withRouter(connect(null, { getUps, getReply })(Comment))
