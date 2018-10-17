import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Flex, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'
/* eslint-disable react/self-closing-comp */
export default class Comment extends Component {
  render () {
    return (
      <li>
        <WhiteSpace />
        <Flex className='comment-title' justify='between' align='baseline'>
          <div className='comment-title-left'>
            <img src={this.props.author.avatar_url} />
            <Link to={'/user/' + this.props.author.loginname}>{this.props.author.loginname}</Link>
          </div>
          <div className='comment-title-right'>
            {
              this.props.ups.length ? <Fragment><i className='iconfont icon-like'></i>{this.props.ups.length}&nbsp;&nbsp;</Fragment> : ''
            }
            <i className='iconfont icon-chehuisekuai'></i>
          </div>
        </Flex>
        <WhiteSpace />
        <article className='markdown-body' dangerouslySetInnerHTML={{ __html: this.props.content }}></article>
      </li>
    )
  }
}

if (process.env.NODE_ENV === 'development') {
  // 类型校验
  Comment.propTypes = {
    author: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    ups: PropTypes.array.isRequired
  }
}
