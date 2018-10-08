import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import TopicList from '../components/TopicList/TopList'
import TopicArticle from '../components/TopicArticle/TopicArticle'

const Routes = () => {
  return (
    <Router>
      <div className='ui container'>
        <div className='ui three item menu'>
          <NavLink exact activeClassName='active' className='item' to='/'>列表</NavLink>
          <NavLink activeClassName='active' className='item' to='/topic'>文章</NavLink>
        </div>
        <Route exact path='/' component={TopicList} />
        <Route exact path='/topic' component={TopicArticle} />
      </div>
    </Router>
  )
}

export default Routes
