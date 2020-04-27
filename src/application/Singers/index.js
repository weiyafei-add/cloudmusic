import React, { useContext, useEffect } from 'react'
import Horizen from '../../baseUI/horizen-item/index'
import { categoryTypes, alphaTypes } from '../../api/config'
import { Content, SingerListContainer, List, ListItem } from './style'
import Scroll from '../../baseUI/scroll'
import {
  getHotSingerList,
  refreshMoreHotSingerList,
  changeEnterLoading,
  changePageCount,
  changePullDownLoading,
  changePullUpLoading,
  getSingerList,
  refreshMoreSingerList,
} from './store/actionCreators'
import { connect } from 'react-redux'
import LazyLoad, { forceCheck } from 'react-lazyload'
import Loading from '../../baseUI/loading'
import { CategoryDataContext, CHANGE_ALPHA, CHANGE_CATEGORY } from './data'
import { renderRoutes } from 'react-router-config'
function Singers(props) {
  // const [category, setCategory] = useState('')
  // const [alpha, setAlpha] = useState('')
  const { data, dispatch } = useContext(CategoryDataContext)
  const { category, alpha } = data.toJS()
  // 获取props
  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount,
    songsCount,
  } = props
  const {
    getHotSingerDispatch,
    refreshMoreHotSingerListDispatch,
    UpdateDispatch,
    pullDownRefreshGetSingerDispatch,
  } = props
  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch()
    }
    // eslint-disable-next-line
  }, [])
  let handleCateUpdata = (val) => {
    dispatch({ type: CHANGE_CATEGORY, data: val })
    UpdateDispatch(val, alpha)
  }
  let handleAlphaUpdate = (val) => {
    dispatch({ type: CHANGE_ALPHA, data: val })
    UpdateDispatch(category, val)
  }
  let handlePullUp = () => {
    refreshMoreHotSingerListDispatch(
      category,
      alpha,
      category === '',
      pageCount
    )
  }
  let handlePullDown = () => {
    pullDownRefreshGetSingerDispatch(category, alpha)
  }
  const handleOnClick = (id) => {
    console.log(id)
    props.history.push(`singers/${id}`)
  }
  const renderSingerList = () => {
    // 数据
    const list = singerList ? singerList.toJS() : []
    return (
      <List>
        {list.map((item, index) => {
          return (
            <ListItem
              onClick={() => handleOnClick(item.id)}
              key={item.accountId + '' + index}
            >
              <div className="singerImg">
                <LazyLoad
                  placeholder={
                    <img
                      src={require('./singer.png')}
                      width={'100%'}
                      height={'100%'}
                      alt="singer"
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width={'100%'}
                    height={'100%'}
                    alt="singer"
                  />
                </LazyLoad>
              </div>
              <span>{item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }
  return (
    <div>
      <Content>
        <Horizen
          list={categoryTypes}
          title={'分类(默认分类):'}
          handleClick={(val) => handleCateUpdata(val)}
          oldVal={category}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={'首字母'}
          oldVal={alpha}
          handleClick={(val) => handleAlphaUpdate(val)}
        ></Horizen>
      </Content>
      {/* 歌手 */}
      <SingerListContainer play={songsCount}>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          onScroll={forceCheck}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          direction={'vertical'}
        >
          {renderSingerList()}
        </Scroll>
        {enterLoading ? <Loading></Loading> : ''}
      </SingerListContainer>
      {renderRoutes(props.route.routes)}
    </div>
  )
}
// enterLoading: true, //进场动画
// pullUpLoading: false, //控制上拉加载动画
// pullDownLoading: false, // 控制下拉加载动画
// pageCount: 0 //我们即将实现分页功能
// 将state暴露给组件
const mapStateToProps = (state) => ({
  singerList: state.getIn(['singer', 'singerList']),
  enterLoading: state.getIn(['singer', 'enterLoading']),
  pullUpLoading: state.getIn(['singer', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singer', 'pullDownLoading']),
  pageCount: state.getIn(['singer', 'pageCount']),
  songsCount: state.getIn(['player', 'playList']).size,
})
// 将dispatch暴露给组件
const mapDispatchToProps = (dispatch) => {
  return {
    // 获取首次热门歌手
    getHotSingerDispatch() {
      dispatch(getHotSingerList())
    },
    // 更新选中的分类名称和首字母 并获取歌手数据
    UpdateDispatch(category, alpha) {
      // 选中任何分类后需要将页数置为0
      dispatch(changePageCount(0))
      dispatch(changeEnterLoading(true))
      dispatch(getSingerList(category, alpha))
    },
    // 滑动到最底部,获取更多热门歌手
    refreshMoreHotSingerListDispatch(catrgory, alpha, hot, count) {
      console.log(hot)
      dispatch(changeEnterLoading(true))
      dispatch(changePageCount(count + 1))
      if (hot) {
        dispatch(refreshMoreHotSingerList())
      } else {
        dispatch(refreshMoreSingerList(catrgory, alpha))
      }
    },
    // 顶部下拉刷新  az
    pullDownRefreshGetSingerDispatch(category, alpha) {
      dispatch(changePullDownLoading(true))
      dispatch(changePageCount(0))
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList())
      } else {
        dispatch(getSingerList(category, alpha))
      }
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
