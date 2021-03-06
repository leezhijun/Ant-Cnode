import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TopicList from '../components/TopicList/TopList' // 列表组件
import TopicArticle from '../components/TopicArticle/TopicArticle' // 文章组件
import FootNavBar from '../components/FootNavBar/FootNavBar' // 底部组件
import TopNavBar from '../components/TopNavBar/TopNavBar' // 头部组件
import Login from '../components/Login/Login' // 登录组件
import User from '../components/User/User' // 用户组件
import Publish from '../components/Publish/Publish' // 话题发布组件
import Message from '../components/Message/Message' // 消息组件
const Routes = () => {
  return (
    <Router>
      <Fragment>
        <TopNavBar />
        <Route exact path='/' component={TopicList} />
        <Route exact path='/topic/:id' component={TopicArticle} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/user' component={User} />
        <Route exact path='/user/:loginname' component={User} />
        <Route exact path='/publish' component={Publish} />
        <Route exact path='/message' component={Message} />
        {/* eslint-disable react/self-closing-comp */}
        <div style={{ height: '2.5rem' }}>
        </div>
        <FootNavBar />
      </Fragment>
    </Router>
  )
}

export default Routes
