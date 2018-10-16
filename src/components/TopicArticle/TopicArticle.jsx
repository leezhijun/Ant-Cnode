import React, { Component, Fragment } from 'react'
import { getTopic } from '../../actions'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ActivityIndicator, WhiteSpace, WingBlank, Flex } from 'antd-mobile'
import CommentList from '../Comments/CommentList'
import { getDateTimeStamp, timeago } from '../../utils/timeHandle'
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
    clearTimeout(this.closeTimer);
  }

  showToast = () => {
    this.setState({ animating: !this.state.animating });
    this.closeTimer = setTimeout(() => {
      this.setState({ animating: !this.state.animating });
    }, 1000);
  }

  render () {
    const { topic, error, loading } = this.state
    let tab = {}
      tab['share'] = '分享'
      tab['ask'] = '问答'
      tab['job'] = '招聘'
      tab['good'] = '精华'
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
            <Flex wrap='wrap' className='changes'>
              <div className='inline'>
                <i className='iconfont icon-user'></i>
                <Link to={'/user/'+ topic.author.loginname}>{topic.author.loginname}</Link>
              </div>
              <div className='inline'><i className='iconfont icon-time-circle'></i>{timeago(getDateTimeStamp(topic.last_reply_at))}</div>
              <div className='inline'><i className='iconfont icon-eye'></i>{topic.visit_count}</div>
              <div className='inline'><i className='iconfont icon-folder-open'></i>{tab[topic.tab]}</div>
            </Flex>
            <WhiteSpace />
            <article className='markdown-body' dangerouslySetInnerHTML = {{ __html: topic.content }}></article>
            <CommentList replyCount={topic.reply_count} replies={topic.replies} />
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
    match: PropTypes.object.isRequired
  }
}

export default withRouter(connect(mapStateToProps, { getTopic })(TopicArticle))
