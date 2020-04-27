import React from 'react'
import { renderRoutes } from 'react-router-config'
// 导入样式
import { Top, Tab, TabItem } from './style'
import { NavLink } from 'react-router-dom'
import Player from '../Player/index'
import Search from '../Search'
function Home(props) {
  const { route } = props
  return (
    <div>
      {/* 头部 */}
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">我的云音乐</span>
        <span
          className="iconfont search"
          onClick={() => {
            props.history.push('/search')
          }}
        >
          &#xe62b;
        </span>
      </Top>
      {/* 导航 */}
      <Tab>
        <NavLink to="/recommend" activeClassName="selected">
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to="/singers" activeClassName="selected">
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to="/rank" activeClassName="selected">
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>

      {renderRoutes(route.routes)}
      <Player></Player>
    </div>
  )
}
export default React.memo(Home)
