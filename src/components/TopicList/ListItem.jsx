import React, { Component } from 'react'
import { List } from 'antd-mobile'
import { getTopics } from '../../actions'
import { connect } from 'react-redux'
const Item = List.Item
const Brief = Item.Brief
class ListItem extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    // console.dir(this.props)
    this.props.getTopics(this.props.tab.tab)
  }

  render () {
    return (
      <List className='my-list'>
        <Item extra='10:30' align='top' wrap='true' thumb='https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png' multipleLine>
          TitleTitleTitleTitleTitleTitleTitleTitle <Brief>subtitle66</Brief>
        </Item>
      </List>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    topics: state.topics
  }
}

export default connect(
  mapStateToProps,
  { getTopics }
)(ListItem)
