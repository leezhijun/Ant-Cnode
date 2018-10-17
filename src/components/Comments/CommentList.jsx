import React from 'react'
import Comment from './Comment'
import PropTypes from 'prop-types'
import { WhiteSpace } from 'antd-mobile'
import './comment.less'
const CommentList = ({ replyCount, replies, topicId }) => {
  return (
    <div className='comment-list'>
      <WhiteSpace />
      <h4>{replyCount}条回复</h4>
      <ul>
        { replies.map(item => <Comment key={item.id} {...item} topicId={topicId} />) }
      </ul>
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
