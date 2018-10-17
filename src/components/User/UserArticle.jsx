import React, { Fragment } from 'react'
import { WhiteSpace, Card, List } from 'antd-mobile'
import { getDateTimeStamp, timeago } from '../../utils/timeHandle'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
const Item = List.Item

const UserArticle = ({ user }) => {
  return (
    <Fragment>
      <Card>
        <Card.Header
          title={user.loginname}
          thumb={user.avatar_url}
          extra={
            <span>
              积分：
              {user.score}
            </span>
          }
        />
      </Card>
      <WhiteSpace />
      <Card>
        <Card.Body>
          <div>最近发表</div>
          <WhiteSpace />
          {user.recent_topics.length ? (
            <List className='my-list'>
              {user.recent_topics.map(item => (
                <Item
                  key={item.id}
                  extra={timeago(getDateTimeStamp(item.last_reply_at))}
                >
                  <Link to={`/topic/${item.id}`} style={{ display: 'block' }}>
                    {item.title}
                  </Link>
                </Item>
              ))}
            </List>
          ) : (
            <div>暂无</div>
          )}
        </Card.Body>
      </Card>
      <WhiteSpace />
      <Card>
        <Card.Body>
          <div>最新回帖</div>
          <WhiteSpace />
          {user.recent_replies.length ? (
            <List className='my-list'>
              {user.recent_replies.map(item => (
                <Item
                  key={item.id}
                  extra={timeago(getDateTimeStamp(item.last_reply_at))}
                >
                  <Link to={`/topic/${item.id}`} style={{ display: 'block' }}>
                    {item.title}
                  </Link>
                </Item>
              ))}
            </List>
          ) : (
            <div>暂无</div>
          )}
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default UserArticle

if (process.env.NODE_ENV === 'development') {
  // 类型校验
  UserArticle.propTypes = {
    user: PropTypes.object.isRequired
  }
}
