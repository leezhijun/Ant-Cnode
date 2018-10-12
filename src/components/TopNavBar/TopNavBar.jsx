import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import './navbar.css'
export default class TopNavBar extends Component {
  render () {
    return (
      <div style={{ marginTop: '2.89rem' }}>
        <NavBar
          mode='light'
          icon={<Icon type='left' />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key='0' type='ellipsis' />
          ]}
        >Cnode社区(个人版)</NavBar>
      </div>
    )
  }
}
