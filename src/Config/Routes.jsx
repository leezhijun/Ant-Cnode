import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TopicList from '../components/TopicList/TopList'
import TopicArticle from '../components/TopicArticle/TopicArticle'
import FootNavBar from '../components/FootNavBar/FootNavBar'
import TopNavBar from '../components/TopNavBar/TopNavBar'
const Routes = () => {
  return (
    <Router>
      <div className='ui container'>
        {/* <div className='ui three item menu'>
          <NavLink exact activeClassName='active' className='item' to='/'>列表</NavLink>
          <NavLink activeClassName='active' className='item' to='/topic'>文章</NavLink>
        </div> */}
        <TopNavBar />
        <Route exact path='/' component={TopicList} />
        <Route exact path='/topic' component={TopicArticle} />
        <FootNavBar />
      </div>
    </Router>
  )
}

export default Routes
