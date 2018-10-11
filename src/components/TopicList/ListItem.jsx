import React, { Component } from 'react'
import { List } from 'antd-mobile'
import { getTopics } from '../../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import './listitem.css'
const Item = List.Item
const Brief = Item.Brief

class ListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toplist: []
    }
  }

  componentDidMount () {
    this.props.getTopics(this.props.tab.tab)
    console.log(this.props.tab.tab)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    let { tab, topics } = nextProps
    let data = topics.filter(item => item.tab === tab.tab) // 由于不是按需加载，nextProps(Topics)会首其他初始化影响
    // console.log(nextProps,tab,data)
    if (data.length) {
      this.setState({
        toplist: data[0].data.data
      })
    }
  }
  render () {
    const toplist = this.state.toplist
    return (
      <List className='my-list'>
        { !toplist.length ? <Item>loading</Item> : toplist.map(item => <Item key={item.id} extra={moment(new Date(item.create_at)).fromNow()} align='top' wrap='true' thumb={item.author.avatar_url} multipleLine>
          {item.title} <Brief>{item.reply_count}/{item.visit_count}</Brief>
        </Item>) }
      </List>
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
