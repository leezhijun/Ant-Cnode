import React from 'react'
import Comment from './Comment'
import PropTypes from 'prop-types'
import { WhiteSpace } from 'antd-mobile'
import Reply from './Reply'
import { getAccessToken } from '../../utils/tokenHandle'
import { Link } from 'react-router-dom'
import './comment.less'
const CommentList = ({ replyCount, replies }) => {
  const accessToken = getAccessToken()
  return (
    <div className='comment-list'>
      <WhiteSpace />
      <h4>{replyCount}条回复</h4>
      <ul>
        { replies.map(item => <Comment key={item.id} {...item} />) }
      </ul>
      <WhiteSpace />
      { accessToken ? <Reply replyId={null} reply /> : <Link to='/login'><div style={{ textAlign: 'center' }}>您没有登录,请先登录</div></Link>}
    </div>
  )
}

if (process.env.NODE_ENV === 'development') {
  // 类型校验
  CommentList.propTypes = {
    replyCount: PropTypes.number.isRequired,
    replies: PropTypes.array.isRequired,
    topicId: PropTypes.string.isRequired
  }
}

export default CommentList
