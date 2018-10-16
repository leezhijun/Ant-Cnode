import React, { Component, Fragment } from 'react'
import { getLoginName } from '../../utils/tokenHandle'
import { withRouter } from 'react-router-dom'
import { ActivityIndicator, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUser } from '../../actions'
import { UserHead } from './UserHead'
import PropTypes from 'prop-types'
class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      user: {}
    }
  }

  componentDidMount () {
    const { match, getUser } = this.props
    let loginName = match.params.loginname // 判断有没有用户名
    const that = this
    if (loginName) {
      getUser(loginName).catch(function (error) {
        that.setState({
          loading: false,
          error: error.request.statusText
        })
      })
    } else {
      loginName = getLoginName() // 判断是否登录
      if (loginName) { // 路由没哟user参数，且已经登录则用登录用户名
        this.props.history.replace(`/user/${loginName}`)
      } else {
        this.props.history.replace('/login') // 没有登录则跳转登录页面
      }
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { user } = nextProps
    this.setState({
      user: user,
      loading: false
    })
  }
  render () {
    const { loading, error, user } = this.state
    return (
      <Fragment>
        { loading ? <div className='loading-container'>
          <WhiteSpace />
          <WingBlank>
            <div className='loading-example'>
              <div className='align'>
                <ActivityIndicator size='large' />
                <span style={{ marginTop: 8 }}>Loading...</span>
              </div>
            </div>
          </WingBlank>
          <WhiteSpace />
        </div> : !!error ? <Fragment>
          <WhiteSpace />
          <WingBlank>
            {error}
          </WingBlank>
          <WhiteSpace />
        </Fragment> : <article className='topic-article'>
          <WhiteSpace />
          <WingBlank>
            <UserHead loginname={user.loginname} avatar_url={user.avatar_url}/>
          </WingBlank>
          <WhiteSpace />
        </article>
        }
      </Fragment>
    )
  }
}
if (process.env.NODE_ENV === 'development') {
  // 类型校验
  User.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, { getUser })(User))
