import * as actionTypes from './constants'
import { getSingerInfoRequest } from '../../../api/request'
import { fromJS } from 'immutable'

const changeArtist = (data) => ({
  type: actionTypes.CHANGE_ARTISTS,
  data: fromJS(data),
})
const changeSongsOfArtist = (data) => ({
  type: actionTypes.CHANGE_SONGS_OF_ARTISTS,
  data: fromJS(data),
})

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
})
export const getSingerInfo = (id) => {
  return (dispatch) => {
    getSingerInfoRequest(id).then((res) => {
      dispatch(changeEnterLoading(false))
      dispatch(changeArtist(res.artist))
      dispatch(changeSongsOfArtist(res.hotSongs))
    })
  }
}
