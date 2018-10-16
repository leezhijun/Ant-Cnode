import React, { Component } from 'react'
import { Toast, WhiteSpace, WingBlank, Button, Flex } from 'antd-mobile'
import { connect } from 'react-redux'
import { getLogin } from '../../actions'
import { withRouter } from 'react-router-dom'
import { setAccessToken, setLoginName } from '../../utils/tokenHandle'
import PropTypes from 'prop-types'
import './login.less'
class Login extends Component {
  state = {
    accessToken: ''
  }

  successToast = () => {
    const that = this
    if (this.state.accessToken=='') {
      Toast.info('accessToken not be empty', 1);
      return false
    }
    Toast.loading('Loading...', 1, () => {
      this.props.getLogin(this.state.accessToken)
      .then(()=>{
        // console.log('存accessToken')
        setAccessToken(that.state.accessToken)
        Toast.success('Login success!', 1)
      })
      .catch(function (error) { // 请求话题文章数据，如果有错这抛出错误
        if (error.request.statusText) {
          Toast.fail('Login fail: '+ error.request.statusText, 2)
        }
      })
    })

  }
  changeHandle = (e) => {
    this.setState({
      accessToken: e.target.value
    })
  }
  UNSAFE_componentWillReceiveProps (nextProps) {
    const { login, history } = nextProps
    let loginName = login.loginname
    if (loginName) {
      // console.log('loginName')
      setLoginName(loginName) // 实际上比存贮AccessToken先一步执行
      history.replace('/user')
    }
  }
  render () {
    return (
      <WingBlank>
        <WhiteSpace />
        <Flex direction='column' justify='center' className='login'>
        <input value={this.state.accessToken} onChange={this.changeHandle} placeholder='输入accessToken' />
        <WhiteSpace />
        <WhiteSpace />
        <Button onClick={this.successToast} inline size='small' type='ghost' className='am-button-borderfix'>登陆</Button>
        </Flex>
        <WhiteSpace />
      </WingBlank>
    )
  }
}
if (process.env.NODE_ENV === 'development') {
  Login.propTypes = {
    history: PropTypes.object.isRequired,
    getLogin: PropTypes.func.isRequired
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

export default withRouter(connect(mapStateToProps,{getLogin})(Login))
