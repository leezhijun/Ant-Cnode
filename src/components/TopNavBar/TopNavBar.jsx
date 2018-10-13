import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import './navbar.css'
class TopNavBar extends Component {
  render () {
    return (
      <div style={{ marginTop: '2.89rem' }}>
        <NavBar
          mode='light'
          icon={<Icon type='left' />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            <Icon key='0' type='ellipsis' />
          ]}
        >Cnode社区(个人版)</NavBar>
      </div>
    )
  }
}
export default withRouter(TopNavBar)
