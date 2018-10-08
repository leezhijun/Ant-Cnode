import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
export default class TopNavBar extends Component {
  render () {
    return (
      <NavBar
        mode='light'
        icon={<Icon type='left' />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <Icon key='0' type='ellipsis' />
        ]}
      >Cnode社区</NavBar>
    )
  }
}
