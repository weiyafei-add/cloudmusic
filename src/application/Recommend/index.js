import React, { useEffect } from 'react'
// 轮播组件
import Slider from '../../components/slider'
// 推荐列表组件
import RecommendList from '../../components/list/index'
// 导入滚动组件
import Scroll from '../../baseUI/scroll'
// 导入滚动组件的固定父组件
import { Content } from './style'
import { connect } from 'react-redux'
import * as actionCreators from './store/actionCreators'
// 下拉时强制刷新
import { forceCheck } from 'react-lazyload'
// loading动画
import Loading from '../../baseUI/loading'
import { renderRoutes } from 'react-router-config'
function Recommend(props) {
  const { bannerList, recommendList, enterLoading, songsCount } = props

  const { getBannerListDispatch, getRecommendListDispatch } = props

  // 进入页面获取轮播图数据以及推荐列表数据
  useEffect(() => {
    if (!bannerList.size) {
      getBannerListDispatch()
    }
    if (!recommendList.size) {
      getRecommendListDispatch()
    }
    //eslint-disable-next-line
  }, [])

  // 将immutable数据转换为JS结构的数据
  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []
  return (
    <Content play={songsCount}>
      {enterLoading ? <Loading></Loading> : null}
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
        {renderRoutes(props.route.routes)}
      </Scroll>
    </Content>
  )
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading']),
  // 尽量减少toJS()操作, 直接取size就代表list的长度
  songsCount: state.getIn(['player', 'playList']).size,
})
// 映射disPatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerListDispatch() {
      dispatch(actionCreators.getBannerList())
    },
    getRecommendListDispatch() {
      dispatch(actionCreators.getRecommendList())
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend))
