import React,{ Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TopicList from '../components/TopicList/TopList'
import TopicArticle from '../components/TopicArticle/TopicArticle'
import FootNavBar from '../components/FootNavBar/FootNavBar'
import TopNavBar from '../components/TopNavBar/TopNavBar'
import Login from '../components/Login/Login'
const Routes = () => {
  return (
    <Router>
      <Fragment>
        {/* <div className='ui three item menu'>
          <NavLink exact activeClassName='active' className='item' to='/'>列表</NavLink>
          <NavLink activeClassName='active' className='item' to='/topic'>文章</NavLink>
        </div> */}
        <TopNavBar />
        <Route exact path='/' component={TopicList} />
        <Route exact path='/topic/:id' component={TopicArticle} />
        <Route exact path='/login' component={Login} />
        <div style={{ marginTop: '3rem' }}>
          <FootNavBar />
        </div>
      </Fragment>
    </Router>
  )
}

export default Routes
