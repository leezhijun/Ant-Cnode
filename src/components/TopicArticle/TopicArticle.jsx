import React, { Component, Fragment } from 'react'
import { getTopic, getCollect, getDeCollect, setCollect } from '../../actions'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ActivityIndicator, WhiteSpace, WingBlank, Flex, Toast } from 'antd-mobile'
import CommentList from '../Comments/CommentList'
import { getDateTimeStamp, timeago } from '../../utils/timeHandle'
import { getAccessToken } from '../../utils/tokenHandle'
import 'github-markdown-css'
import './topic-article.less'
class TopicArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading : true,
      topic: {},
      animating: false,
      error: null
    }
  }

  componentDidMount () {
    const { match, getTopic } = this.props
    const that = this
    // console.log(this.props)
    let id = match.params.id
    getTopic(id).catch(function (error) { // 请求话题文章数据，如果有错这抛出错误
      that.setState({
        loading: false,
        error: error.request.statusText
      })
    })
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { topic } = nextProps
    this.setState({
      loading: false,
      topic: topic
    })
  }

  componentWillUnmount() {
    clearTimeout(this.closeTimer)
  }

  showToast = () => {
    this.setState({ animating: !this.state.animating })
    this.closeTimer = setTimeout(() => {
      this.setState({ animating: !this.state.animating })
    }, 1000)
  }

  collectHandle = () => {
    const { getCollect, getDeCollect, setCollect, topic } = this.props
    let topic_id = topic.id
    let is_collect = topic.is_collect
    let accessToken = getAccessToken()
    if (is_collect) {
      getDeCollect(accessToken,topic_id)
        .then(function (response) {
          Toast.success('取消收藏成功!', 1, ()=>{
            setCollect()
          })
        })
        .catch(function (error) {
          Toast.fail('Login fail: '+ error.request.statusText, 1)
        })
    } else {
      getCollect(accessToken,topic_id)
        .then(function (response) {
          Toast.success('收藏成功!', 1, ()=>{
            setCollect()
          })
        })
        .catch(function (error) {
          Toast.fail('Login fail: '+ error.request.statusText, 1)
        })
    }
  }

  renderCollect = (is_collect) => {
    if (is_collect) {
      return <div className='inline star' onClick={this.collectHandle} ><i className='iconfont icon-star-fill'></i>取消</div>
    } else {
      return <div className='inline star' onClick={this.collectHandle} ><i className='iconfont icon-star'></i>收藏</div>
    }
  }

  render () {
    const { topic, error, loading } = this.state
    const accessToken = getAccessToken()
    let tab = {}
      tab['share'] = '分享'
      tab['ask'] = '问答'
      tab['job'] = '招聘'
      tab['good'] = '精华'
      tab['dev'] = '客户端'
    return (
      <Fragment>
        { loading ? // 判断是否正在加载...
        <div className='loading-container'>
        <WhiteSpace />
        <WingBlank>
          <div className='loading-example'>
            <div className='align'>
              <ActivityIndicator size='large' />
              <span style={{ marginTop: 8 }}>Loading...</span>
            </div>
          </div>
        </WingBlank>
        <WhiteSpace />
        </div> :
          !!error ? // 加载完成后判断是否成功请求到数据
          <div>
            <WhiteSpace />
            <WingBlank>
              {error}
            </WingBlank>
            <WhiteSpace />
          </div>
           :
          <article className='topic-article'>
            <WhiteSpace />
            <WingBlank>
            <h1>{ topic.top ? <i className='iconfont icon-crown' style={{ color: '#108ee9' }}></i> : '' }{topic.title}</h1>
            <Flex justify='between' className='changes'>
              <Flex wrap='wrap'>
                <div className='inline'>
                  <i className='iconfont icon-user'></i>
                  <Link to={'/user/'+ topic.author.loginname}>{topic.author.loginname}</Link>
                </div>
                <div className='inline'><i className='iconfont icon-time-circle'></i>{timeago(getDateTimeStamp(topic.last_reply_at))}</div>
                <div className='inline'><i className='iconfont icon-eye'></i>{topic.visit_count}</div>
                <div className='inline'><i className='iconfont icon-folder-open'></i>{tab[topic.tab]}</div>
              </Flex>
              {
                accessToken ? this.renderCollect(topic.is_collect) : ''
              }
            </Flex>
            <WhiteSpace />
            <article className='markdown-body' dangerouslySetInnerHTML = {{ __html: topic.content }}></article>
            <CommentList replyCount={topic.reply_count} replies={topic.replies} topicId={topic.id}/>
            { accessToken ? '' : <Link to='/login'><div style={{textAlign: 'center'}}>您没有登录,请先登录</div></Link>}
            <WhiteSpace />
            </WingBlank>
            <WhiteSpace />
          </article>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topic: state.topic
  }
}

if (process.env.NODE_ENV === 'development') {
  // 类型校验
  TopicArticle.propTypes = {
    getTopic: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    getCollect: PropTypes.func.isRequired,
    getDeCollect: PropTypes.func.isRequired,
    topic: PropTypes.object.isRequired,
    setCollect: PropTypes.func.isRequired,
  }
}

export default withRouter(connect(mapStateToProps, { getTopic, getCollect, getDeCollect, setCollect })(TopicArticle))
