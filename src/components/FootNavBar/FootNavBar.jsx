import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
/* eslint-disable react/self-closing-comp */
class FootNavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: true
    }
  }

  render () {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', width: '100%', bottom: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor='#949494'
          tintColor='#33A3F4'
          barTintColor='white'
          hidden={this.state.hidden}
          tabBarPosition='bottom'
        >
          <TabBar.Item
            title='首页'
            key='首页'
            icon={
              <i className='iconfont icon-home' style={{ fontSize: '22px' }}></i>
            }
            selectedIcon={
              <i className='iconfont icon-home' style={{ fontSize: '22px' }}></i>}
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab'
              })
              // this.context.router.history.replace('/')
              this.props.history.replace('/')
            }}
            data-seed='logId'
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <i className='iconfont icon-edit' style={{ fontSize: '22px' }}></i>
            }
            selectedIcon={
              <i className='iconfont icon-edit' style={{ fontSize: '22px' }}></i>
            }
            title='发表'
            key='发表'
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab'
              })
              this.props.history.replace('/topic')
            }}
            data-seed='logId1'
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <i className='iconfont icon-bell' style={{ fontSize: '22px' }}></i>
            }
            selectedIcon={
              <i className='iconfont icon-bell' style={{ fontSize: '22px' }}></i>
            }
            title='消息'
            key='消息'
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab'
              })
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <i className='iconfont icon-user' style={{ fontSize: '22px' }}></i>
            }
            selectedIcon={
              <i className='iconfont icon-user' style={{ fontSize: '22px' }}></i>
            }
            title='我的'
            key='我的'
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab'
              })
              this.props.history.replace('/user')
            }}
          >
          </TabBar.Item>
        </TabBar>
      </div>
    )
  }
}

if (process.env.NODE_ENV === 'development') {
  // 类型校验
  FootNavBar.propTypes = {
    history: PropTypes.object.isRequired
  }
}

export default withRouter(FootNavBar)
