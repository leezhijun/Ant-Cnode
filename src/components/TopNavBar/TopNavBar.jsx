import React, { Component } from 'react'
import { NavBar, Icon, Popover } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { getAccessToken, removeAccessToken } from '../../utils/tokenHandle'
import PropTypes from 'prop-types'
import './navbar.css'
const Item = Popover.Item
class TopNavBar extends Component {
  state = {
    visible: false,
    selected: '',
    overlay:[
      (<Item key="1" value="reload" icon={<i className='iconfont icon-reload'></i>}>刷新</Item>),
      (<Item key="2" value="login" icon={<i className='iconfont icon-login'></i>}>登陆</Item>)
    ]
  };
  // 气泡点击选中项
  onSelect = (opt) => {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    })
    switch(opt.props.value){
      case 'reload': // 刷新
      this.props.history.go()
      break
      case 'login': // 登陆
      this.props.history.replace('/login')
      break
      case 'logout': // 退出登陆
      removeAccessToken()
      this.props.history.replace('/login')
      break
    }
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  componentDidMount () {
    const accessToken = getAccessToken() ? getAccessToken() : null
    if (accessToken) {
      this.setState({
        overlay:[
          (<Item key="1" value="reload" icon={<i className='iconfont icon-reload'></i>}>刷新</Item>),
          (<Item key="2" value="logout" icon={<i className='iconfont icon-logout'></i>}>退出</Item>)
        ]
      })
    } else {
      this.setState({
        overlay:[
          (<Item key="1" value="reload" icon={<i className='iconfont icon-reload'></i>}>刷新</Item>),
          (<Item key="2" value="logout" icon={<i className='iconfont icon-login'></i>}>登陆</Item>)
        ]
      })
    }
  }
  render () {
    return (
      <div style={{ marginTop: '2.89rem' }}>
        <NavBar
          mode='light'
          icon={<Icon type='left' />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={
          <Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={this.state.overlay}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <Icon type="ellipsis" />
            </div>
          </Popover>
          }
        >Cnode社区(个人版)</NavBar>
      </div>
    )
  }
}

if (process.env.NODE_ENV === 'development') {
  TopNavBar.propTypes = {
    history: PropTypes.object.isRequired
  }
}

export default withRouter(TopNavBar)
