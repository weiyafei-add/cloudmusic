import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getRankList } from './store/index'
import Loading from '../../baseUI/loading'
import { filterIndex } from '../../api/utils'
import { Container, List, ListItem, SongList } from './style'
import Scroll from '../../baseUI/scroll'
import { renderRoutes } from 'react-router-config'
function Rank(props) {
  const { rankList: list, loading } = props
  const { getRankListDispatch } = props
  // 将数据转换为js数据
  let rankList = list ? list.toJS() : []
  // 进入页面获取排行榜列表?
  useEffect(() => {
    getRankListDispatch()
    // eslint-disable-next-line
  }, [])
  // 点击事件
  const handleClick = (id) => {
    props.history.push(`/rank/${id}`)
  }
  // 过滤出官方榜和全球榜x
  let globalStartIndex = filterIndex(rankList)
  let officialList = rankList.slice(0, globalStartIndex)
  let globalList = rankList.slice(globalStartIndex)
  // 渲染排行榜
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item) => (
          <ListItem
            tracks={item.tracks}
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            <div className="imgWrap">
              <img src={item.coverImgUrl} alt="图片"></img>
              <span className="updateFrequency">{item.updateFrequency}</span>
              <div className="decorate"></div>
            </div>
            {!global ? renderSongList(item.tracks) : ''}
          </ListItem>
        ))}
      </List>
    )
  }
  // 渲染tranks列表
  const renderSongList = (list) => {
    return (
      <SongList>
        {list.map((item, index) => {
          return (
            <span key={item.first}>
              {`${index + 1}. ${item.first}-${item.second}`}
            </span>
          )
        })}
      </SongList>
    )
  }
  // 控制标题的显示与隐藏
  const showTitile = !loading ? { display: '' } : { display: 'none' }
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="official" style={showTitile}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={showTitile}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
          {loading ? <Loading></Loading> : ''}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  )
}
// 映射state到props
const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
})
// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDispatch() {
      dispatch(getRankList())
    },
  }
}
// 将ui组件包装为容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))
