import React, { Component } from 'react'
import { getTopic } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ActivityIndicator, WhiteSpace, WingBlank } from 'antd-mobile'
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
    return (
      <div>
        <WhiteSpace />
        <WingBlank>
        { loading ? // 判断是否正在加载...
        <div className="loading-container">
          <div className="loading-example">
            <div className="align">
              <ActivityIndicator size="large" />
              <span style={{ marginTop: 8 }}>Loading...</span>
            </div>
          </div>
        </div> :
          !!error ? <div>{error}</div> : // 加载完成后判断是否成功请求到数据
          <div>{topic.title}</div>
        }

        </WingBlank>
        <WhiteSpace />
      </div>
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
