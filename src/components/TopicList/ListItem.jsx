import React, { Component } from 'react'
import { List, PullToRefresh } from 'antd-mobile'
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
      limit: 12
    }
  }

  componentDidMount () {
    const { page, limit } = this.state
    this.props.getTopics(this.props.tab.tab, page, limit)
    // console.log(this.props.tab.tab)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    // console.log(nextProps)
    let { tab, topics } = nextProps
    let data = topics.filter(item => item.tab === tab.tab) // 由于不是按需加载，nextProps(Topics)会首其他初始化影响
    // console.log(nextProps,tab,data)
    if (data.length) {
      this.setState({
        toplist: data[0].data
      })
    }
  }
  render () {
    const { toplist, page, limit } = this.state
    const { tab, getTopics } = this.props
    const that = this
    return (
      <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true })
          that.setState({ page: page + 1 })
          getTopics(tab.tab, page + 1, limit)
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 1000);
        }}
      >
        <List className='my-list'>
          { !toplist.length ? <Item>loading</Item> : toplist.map(item => <Item key={item.id} extra={moment(new Date(item.create_at)).fromNow()} align='top' wrap='true' thumb={item.author.avatar_url} multipleLine>
            <Link to={`/topic/${item.id}`} style={{ display: 'block' }}>{item.title}</Link><Brief>{item.reply_count}/{item.visit_count}</Brief>
          </Item>) }
        </List>
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
