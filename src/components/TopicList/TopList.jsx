import React, { Component, Fragment } from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile'
import ListItem from './ListItem'

export default class TopicList extends Component {
  renderContent = tab => (
      <ListItem tab={tab} /> //tab内容并不是按需加载
    );

  render() {
    const tabs = [
      { title: '全部', tab: 'all' },
      { title: '精华', tab: 'good' },
      { title: '分享', tab: 'share' },
      { title: '问答', tab: 'ask' },
      { title: '招聘', tab: 'job' }
    ];

    return (
      <Fragment >
        <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}>
          {this.renderContent}
        </Tabs>
        <WhiteSpace />

      </Fragment >
    );
  }
}

