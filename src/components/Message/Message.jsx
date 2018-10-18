import React, { Component, Fragment } from 'react'
import { Accordion, List, Toast, Badge } from 'antd-mobile'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { getMessage, getMessageMark } from '../../actions'
import { getAccessToken } from '../../utils/tokenHandle'
import PropTypes from 'prop-types'
class Message extends Component {
  state = {
    has_read_messages: [],
    hasnot_read_messages: []
  }

  componentDidMount () {
    const  { getMessage } = this.props
    const assessToken = getAccessToken()
    getMessage(assessToken).catch((error)=>{
      Toast.info('请求失败' + error.request.statusText, 1.5)
     })
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { message } = nextProps
    this.setState({
      has_read_messages: message.has_read_messages,
      hasnot_read_messages: message.hasnot_read_messages
    })
  }

  markHandle = (id) => {
    const  { getMessageMark } = this.props
    const assessToken = getAccessToken()
    getMessageMark(assessToken,id).catch((error)=>{
      // console.log('massage mark fail!')
     })
  }

  render () {
    const { has_read_messages, hasnot_read_messages } = this.state
    return (
      <Fragment>
          <Accordion defaultActiveKey='1' onChange={this.onChange}>
            <Accordion.Panel header={<div>未读消息&nbsp;&nbsp;<Badge text={77} overflowCount={hasnot_read_messages.length} /></div>}>
              <List>
                {hasnot_read_messages.map(item => <List.Item key={item.id} onClick={e => {this.markHandle(item.id)}} ><Link to={'/topic/' + item.topic.id + '#' + item.reply.id}>{item.topic.title}</Link></List.Item>)}
              </List>
            </Accordion.Panel>
          </Accordion>
          <Accordion defaultActiveKey='1' onChange={this.onChange}>
            <Accordion.Panel header={<div>已读消息&nbsp;&nbsp;<Badge text={77} overflowCount={has_read_messages.length} /></div>}>
              <List>
                {has_read_messages.map(item => <List.Item key={item.id}><Link to={'/topic/' + item.topic.id + '#' + item.reply.id}>{item.topic.title}</Link></List.Item>)}
              </List>
            </Accordion.Panel>
          </Accordion>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

if (process.env.NODE_ENV === 'development') {
  // 类型校验
  Message.propTypes = {
    getMessage: PropTypes.func.isRequired,
    getMessageMark: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
}

export default withRouter(connect(mapStateToProps,{ getMessage, getMessageMark })(Message))
