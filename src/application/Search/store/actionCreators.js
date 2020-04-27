import {
  SET_ENTER_LOADING,
  SET_HOT_KEYWORDS,
  SET_RESULT_SONGS_LIST,
  SET_SUGGEST_LIST,
} from './constans'
import {
  getHotKeyWordsRequest,
  getSuggeetListRequest,
  getResultSongsListRequest,
} from '../../../api/request'
import { fromJS } from 'immutable'
const changeHotKeyWords = (data) => ({
  type: SET_HOT_KEYWORDS,
  data: fromJS(data),
})
const changeSuggestList = (data) => ({
  type: SET_SUGGEST_LIST,
  data: fromJS(data),
})
const changeResultSongsList = (data) => ({
  type: SET_RESULT_SONGS_LIST,
  data: fromJS(data),
})

export const changeEnterLoading = (data) => ({
  type: SET_ENTER_LOADING,
  data,
})
export const getHotKeyWords = () => {
  return (dispatch) => {
    getHotKeyWordsRequest().then((res) => {
      dispatch(changeHotKeyWords(res.result.hots))
    })
  }
}
export const getSuggeetList = (query) => {
  return (dispatch) => {
    getSuggeetListRequest(query).then((data) => {
      if (!data) return
      let res = data.result || []
      dispatch(changeSuggestList(res))
    })
    getResultSongsListRequest(query).then((data) => {
      if (!data) return
      let res = data.result.songs || []
      dispatch(changeResultSongsList(res))
      dispatch(changeEnterLoading(false))
    })
  }
}
