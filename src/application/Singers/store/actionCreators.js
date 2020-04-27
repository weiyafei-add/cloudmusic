import {
  getHotSingerListRequest,
  getSingerListRequest
} from '../../../api/request'
import {
  CHANGE_ENTER_LOADING,
  CHANGE_PAGE_COUNT,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_PULLUP_LOADING,
  CHANGE_SINGER_LIST
} from './constants'
import { fromJS } from 'immutable'

// 歌手数据
const changeSingerList = data => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data)
})
// 页面变化
export const changePageCount = data => ({
  type: CHANGE_PAGE_COUNT,
  data
})
// 进场loading
export const changeEnterLoading = data => ({
  type: CHANGE_ENTER_LOADING,
  data
})
// 是否上拉加载
export const changePullUpLoading = data => ({
  type: CHANGE_PULLUP_LOADING,
  data
})
// 是否下拉刷新
export const changePullDownLoading = data => ({
  type: CHANGE_PULLDOWN_LOADING,
  data
})

// 第一次加载热门歌手
export const getHotSingerList = () => {
  return dispatch => {
    getHotSingerListRequest(0)
      .then(res => {
        dispatch(changeSingerList(res.artists))
        dispatch(changeEnterLoading(false))
        // 下拉刷新也设置为false
        dispatch(changePullDownLoading(false))
      })
      .catch(err => {
        console.log('获取热门歌手失败', err)
      })
  }
}

// 加载更多热门歌手
export const refreshMoreHotSingerList = () => {
  return (dispatch, getState) => {
    let pageCount = getState().getIn(['singer', 'pageCount'])
    const singerList = getState()
      .getIn(['singer', 'singerList'])
      .toJS()

    getHotSingerListRequest(pageCount).then(res => {
      const newSingerList = [...singerList, ...res.artists]
      dispatch(changeSingerList(newSingerList))
      dispatch(changeEnterLoading(false))
    })
  }
}
// 加载选中分类后的歌手列表
export const getSingerList = (category, alpha) => {
  return dispatch => {
    getSingerListRequest(category, alpha, 0)
      .then(res => {
        dispatch(changeSingerList(res.artists))
        dispatch(changeEnterLoading(false))
        dispatch(changePullDownLoading(false))
      })
      .catch(err => {
        console.log('获取歌手数据失败', err)
      })
  }
}
export const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    let oldSingerList = getState()
      .getIn(['singer', 'singerList'])
      .toJS()
    let count = getState().getIn(['singer', 'pageCount'])
    getSingerListRequest(category, alpha, count)
      .then(res => {
        let newSingerList = [...oldSingerList, ...res.artists]
        dispatch(changeSingerList(newSingerList))
        dispatch(changeEnterLoading(false))
      })
      .catch(err => {
        console.log('获取更多分类数据失败', err)
      })
  }
}
