import React, { Component } from 'react'
import { Toast, WhiteSpace, WingBlank, Button, Flex } from 'antd-mobile'
import { connect } from 'react-redux'
import { getLogin, setLogin } from '../../actions'
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
    const { setLogin } = this.props
    if (this.state.accessToken=='') {
      Toast.info('accessToken not be empty', 1);
      return false
    }
    Toast.loading('Loading...', 1, () => {
      this.props.getLogin(this.state.accessToken)
        .then(function (response) {
          Toast.success('Login success!', 1, ()=>{
            setAccessToken(that.state.accessToken) // 存token令牌
            setLoginName(response.data.loginname) // 存用户名
            setLogin(response.data) // 用户数据存入redux
          })
        })
        .catch(function (error) { // 请求话题文章数据，如果有错这抛出错误
          Toast.fail('Login fail: '+ error.request.statusText, 1)
        })
    })

  }
  changeHandle = (e) => {
    this.setState({
      accessToken: e.target.value
    })
  }
  UNSAFE_componentWillReceiveProps (nextProps) {
    console.log(123)
    const { login, history } = nextProps
    let loginName = login.loginname
    if (loginName) {
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
    getLogin: PropTypes.func.isRequired,
    setLogin: PropTypes.func.isRequired,
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

export default withRouter(connect(mapStateToProps,{getLogin, setLogin})(Login))
