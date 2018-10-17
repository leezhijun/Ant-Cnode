import React, { Component, Fragment } from 'react'
import { WhiteSpace, InputItem, TextareaItem, Picker, List, Button, Toast } from 'antd-mobile'
import { getAccessToken } from '../../utils/tokenHandle'
import { getPublish } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
const tabs = [
  {
    label:
    (<div>
      <span>分享</span>
    </div>),
    value: 'share'
  },
  {
    label:
    (<div>
      <span>问答</span>
    </div>),
    value: 'ask'
  },
  {
    label:
    (<div>
      <span>招聘</span>
    </div>),
    value: 'job'
  },
  {
    label:
    (<div>
      <span>客户端测试</span>
    </div>),
    value: 'dev'
  },
];
function showToast(name) {
  Toast.info(name+'不能为空!', 1);
}
class Publish extends Component {
  state = {
    data: [],
    tab: ['dev'],
    title: '',
    content: '',
    disabled: true
  }
  UNSAFE_componentWillMount () {
    let { history } = this.props
    let accessToken = getAccessToken()
    if (!accessToken) {
      history.replace('/login')
    }
  }
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  handleClick = () => {
    this.inputRef.focus();
  }
  onChangeTab = (tab) => {
    this.setState({
      tab
    })
  }
  changeValueTitlte = (val) => {
    this.setState({
      title: val
    })
  }
  changeValueContent = (val) => {
    this.setState({
        content: val
      })
  }
  publishHandle = () => {
    let title = this.state.title
    let content = this.state.content
    let tab = this.state.tab[0]
    let { getPublish, history } = this.props
    // console.log(tab)
    let accessToken = getAccessToken()
    if (!title.length) {
      showToast('标题')
      return false
    }
    if (!content.length) {
      showToast('内容')
      return false
    }
    getPublish(accessToken,title,tab,content)
      .then( response => {
        let topic_id = response.data.topic_id
        Toast.success('发布成功', 1, () => {
          history.replace(`/topic/${topic_id}`)
        })
      })
      .catch( error => {
        if (error.request.statusText) {
          Toast.fail('Publish fail: '+ error.request.statusText, 1, () => {
            history.replace('/publish')
          })
        }
      })
  }
  render () {
    return (
      <Fragment>
        <WhiteSpace />
        <Picker
          data={tabs}
          value={this.state.tab}
          cols={1}
          onChange={this.onChangeTab}
        >
          <List.Item arrow="horizontal">选择版块</List.Item>
        </Picker>
        <InputItem
            placeholder="文章标题" value={this.state.title} onChange={this.changeValueTitlte}
          />
        <TextareaItem
            placeholder="文本内容"
            data-seed="logId"
            rows={10}
            autoHeight
            ref={el => this.customFocusInst = el}
            value={this.state.content}
            onChange={this.changeValueContent}
          />
          <Button onClick={this.publishHandle}>发布</Button>
        <WhiteSpace />
      </Fragment>
    )
  }
}

export default withRouter(connect(null,{ getPublish })(Publish))
