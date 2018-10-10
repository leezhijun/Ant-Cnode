import React, { Component } from 'react'
import { List } from 'antd-mobile'
import { getTopics } from '../../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
const Item = List.Item
const Brief = Item.Brief

class ListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toplist:[]
    }
  }

  componentDidMount () {
    this.props.getTopics(this.props.tab.tab)
  }

  componentWillReceiveProps (nextProps){
    console.log(nextProps)
    // let tab = this.props.tab.tab
    // let toplist =  nextProps.topics.topics.filter(item => item.tab !== tab)
    // console.log(toplist)
    // this.setState({
    //   toplist: toplist.data.data
    // })
    // console.log(this.state.toplist)
  }

  render () {
    const toplist = this.state.toplist
    return (
      <List className='my-list'>
        { !!toplist ? <Item>loading</Item> : <Item>loading123</Item>}
        {/* {toplist.map( item => <Item extra={item.create_at} align='top' wrap='true' thumb={item.author.avatar_url} multipleLine>
          {item.title} <Brief>{item.tab}</Brief>
        </Item> )} */}
        {/* <Item extra='10:30' align='top' wrap='true' thumb='https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png' multipleLine>
          TitleTitleTitleTitleTitleTitleTitleTitle <Brief>subtitle66</Brief>
        </Item> */}
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
    topics: PropTypes.object.isRequired
  }
}
export default connect(
  mapStateToProps,
  { getTopics }
)(ListItem)
