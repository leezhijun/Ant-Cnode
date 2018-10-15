import React, { Component } from 'react'
import { List, PullToRefresh, ActivityIndicator, WhiteSpace, WingBlank } from 'antd-mobile'
import { getTopics } from '../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import './listitem.css'
const Item = List.Item
const Brief = Item.Brief

class ListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      down: false,
      height: document.documentElement.clientHeight,
      toplist: [],
      isLoading: true,
      page: 1,
      limit: 12,
      loading: true,
      animating: false,
    }
  }

  componentDidMount () {
    const { page, limit } = this.state
    const that = this
    this.props.getTopics(this.props.tab.tab, page, limit).catch(function (error) { // 请求话题列表数据，如果有错这抛出错误
      that.setState({
        loading: false,
        error: error.request.statusText
      })
    })
    // console.log(this.props.tab.tab)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    // console.log(nextProps)
    let { tab, topics } = nextProps
    let data = topics.filter(item => item.tab === tab.tab) // 由于不是按需加载，nextProps(Topics)会首其他初始化影响
    // console.log(nextProps,tab,data)
    if (data.length) {
      this.setState({
        toplist: data[0].data,
        loading: false
      })
    }
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
    const { toplist, page, limit, error, loading } = this.state
    const { tab, getTopics } = this.props
    const that = this
    return (
      <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto'
        }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true })
          that.setState({ page: page + 1 }) // 重置页码
          getTopics(tab.tab, page + 1, limit).catch(function (error) { // 请求话题列表数据，如果有错这抛出错误
            that.setState({
              loading: false,
              error: error.request.statusText,
              page: page -1
            })
          })
          setTimeout(() => {
            this.setState({ refreshing: false })
          }, 1000)
        }}
      >
      {
        loading ? // 数据请求加载...
        <div className="loading-container">
        <WhiteSpace />
        <WingBlank>
        <div className="loading-example">
          <div className="align">
            <ActivityIndicator size="large" />
            <span style={{ marginTop: 8 }}>Loading...</span>
          </div>
        </div>
        </WingBlank>
        </div> :
        !!error ? // 加载完成后判断是否成功请求到数据
        <div>
          <WhiteSpace />
          <WingBlank>
          {error}
          </WingBlank>
        </div> :
        <List className='my-list'>
          { toplist.map(item => <Item key={item.id} extra={moment(new Date(item.create_at)).fromNow()} align='top' wrap='true' thumb={item.author.avatar_url} multipleLine>
            <Link to={`/topic/${item.id}`} style={{ display: 'block' }}>{ item.top ? <i className='iconfont icon-crown' style={{ color: '#108ee9' }}></i> : '' }{item.title}</Link><Brief>{item.reply_count}/{item.visit_count}</Brief>
          </Item>) }
        </List>
      }
      </PullToRefresh>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    topics: state.topics
  }
}

if (process.env.NODE_ENV === 'development') {
  ListItem.propTypes = {
    getTopics: PropTypes.func.isRequired,
    tab: PropTypes.object.isRequired,
    topics: PropTypes.array.isRequired
  }
}

export default connect(
  mapStateToProps,
  { getTopics }
)(ListItem)
