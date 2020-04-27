import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from './constants'
import { getAlbumDetailRequest } from '../../../api/request'
import { fromJS } from 'immutable'

const changeCurrentAlbum = (data) => ({
  type: CHANGE_CURRENT_ALBUM,
  data: fromJS(data),
})

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data,
})

export const getAlbumList = (id) => {
  return (dispatch) => {
    getAlbumDetailRequest(id).then((res) => {
      dispatch(changeCurrentAlbum(res.playlist))
      dispatch(changeEnterLoading(false))
    })
  }
}
