import React, { Component } from 'react'
import { Toast, WhiteSpace, WingBlank, Button, Flex } from 'antd-mobile'
import './login.less'
export default class Login extends Component {
  state = {
    accessToken: ''
  }
  successToast = () => {
    Toast.success('登陆成功!', 1);
  }
  changeHandle = (e) => {
    this.setState({
      accessToken: e.target.value
    })
  }
  render () {
    return (
      <WingBlank>
        <WhiteSpace />
        <Flex direction='column' justify='center' className='login'>
        <input value={this.state.accessToken} onChange={this.changeHandle} placeholder='输入accessToken' />
        <WhiteSpace />
        <Button onClick={this.successToast} inline size='small' type='ghost' className='am-button-borderfix'>登陆</Button>
        </Flex>
        <WhiteSpace />
      </WingBlank>
    )
  }
}