import React from 'react'
import { List, ListItem, ListWrapper } from './style'
import { getCount } from '../../api/utils'
import LazyLoad from 'react-lazyload'
// 路由高阶组件
import { withRouter } from 'react-router-dom'
function RecommendList(props) {
  const handleDetail = id => {
    props.history.push(`/recommend/${id}`)
  }
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {props.recommendList.map((item, index) => {
          return (
            <ListItem
              onClick={() => handleDetail(item.id)}
              key={item.id + index}
            >
              <div className="img_wrap">
                <div className="decorate"></div>
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require('./music.png')}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.picUrl + '?param=300x300'}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          )
        })}
      </List>
    </ListWrapper>
  )
}

export default React.memo(withRouter(RecommendList))
