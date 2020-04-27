import { fromJS } from 'immutable'
import { getRankListRequest } from '../../../api/request'

// action.type
export const CHANGE_RANKLIST = 'rank/CHANGE_RANKLIST'
export const CHANGE_LOADING = 'rank/CHANGE_LOADING'

// actionCreators
const changeRankList = data => ({
  type: CHANGE_RANKLIST,
  data: fromJS(data)
})
const changeLoading = data => ({
  type: CHANGE_LOADING,
  data
})
export const getRankList = () => {
  return dispatch => {
    dispatch(changeLoading(true))
    getRankListRequest().then(res => {
      let list = res && res.list
      console.log(list)
      dispatch(changeRankList(list))
      dispatch(changeLoading(false))
    })
  }
}
// reducer
const defaultState = fromJS({
  rankList: [],
  loading: false
})
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_RANKLIST:
      return state.set('rankList', action.data)
    case CHANGE_LOADING:
      return state.set('loading', action.data)
    default:
      return state
  }
}
