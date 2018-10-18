import React, { Component, Fragment } from 'react'
import { Flex, TextareaItem, WhiteSpace, Button, Toast } from 'antd-mobile'
import { getAccessToken } from '../../utils/tokenHandle'
import { connect } from 'react-redux'
import { getReply, getTopic } from '../../actions'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
class Reply extends Component {

  state = {
    replyContent: '',
    reply: false
  }

  componentDidMount () {
    let replyAuthor = this.props.replyAuthor ? this.props.replyAuthor : ''
    this.setState({
      replyContent: replyAuthor,
      reply: this.props.reply
    })
    this.scrollToAnchor('5bc80dad9545eaf107b9cc17')
  }

  UNSAFE_componentWillReceiveProps (nextprops) {
    this.setState({
      reply: !!nextprops.reply,
    })
  }

  scrollToAnchor = (anchorName) => {
    if (anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView(); }
    }
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
      let accessToken = getAccessToken() // 用户令牌
      let content = this.state.replyContent // 回复内容
      let topicId = this.props.topicId // 文章id
      let replyId = this.props.replyId ?  this.props.replyId : null // 回复id
      this.props.getReply(accessToken, content, topicId, replyId)
        .then((response)=>{
          let reply_id = response.data.reply_id
          //this.props.history.go(`/topic/${topicId}#${reply_id}`)
          this.props.getTopic(topicId).catch(function (error) { // 请求话题文章数据，如果有错这抛出错误
            this.props.history.go(`/topic/${topicId}#${reply_id}`) // 更新数据失败,则刷新网页
          })
          // console.log(this.props.replyId)
          this.props.replyId ? this.setState({ // 判断是直接回复，还是带有回复id的回复
            reply: !this.state.reply,
            replyContent:''
          }) : this.setState({
            replyContent:''
          })
          // console.log(reply_id)
          this.scrollToAnchor(reply_id) // 跳转至回复锚点
        })
        .catch((error)=>{
          Toast.info('操作失败'+error.request.statusText, 1)
        })
    }
  }

  renderReplyEdit = () => {
    return (
      <Fragment>
        <div>添加回复</div>
        <WhiteSpace />
        <TextareaItem className='reply'
              placeholder='回复'
              data-seed="logId"
              rows={3}
              autoHeight
              ref={el => this.customFocusInst = el}
              value={this.state.replyContent}
              onChange={this.changeValueContent}
            />
        <WhiteSpace />
        <Flex justify='end'>
          <Button type="ghost" size="small" onClick={this.replyContentHandle} inline className="am-button-borderfix">回复</Button>
        </Flex>
      </Fragment>
    )
  }

  render () {
    return (
      <Fragment>
        { this.state.reply ? this.renderReplyEdit() : '' }
      </Fragment>
    )
  }
}

if (process.env.NODE_ENV === 'development') {
  // 类型校验
  Reply.propTypes = {
    getReply: PropTypes.func.isRequired,
    getTopic: PropTypes.func.isRequired,
    topicId: PropTypes.string.isRequired,
    replyId: PropTypes.string,
    history: PropTypes.object.isRequired,
    replyAuthor: PropTypes.string,
    reply: PropTypes.bool.isRequired
  }
}

const mapStateToProps = (state) => {
  return {
    topicId: state.topic.id // 文章id
  }
}

export default withRouter(connect(mapStateToProps, { getTopic, getReply })(Reply))
