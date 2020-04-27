import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { playMode } from '../../../api/config'
import { FindIndex } from '../../../api/utils'
const defaultState = fromJS({
  fullScreen: false, // 播放器是否为全屏模式
  playing: false, // 当前歌曲是否播放
  sequencePlayList: [], // 顺序列表(随机模式会打乱顺序,这里保存顺序)
  playList: [],
  mode: playMode.sequence, //播放模式
  currentIndex: -1, //当前歌曲在播放列表的索引位置
  showPlayList: false, // 是否展示播放列表
  currentSong: {},
})
const handleDeleteSong = (state, song) => {
  // 深拷贝一份歌曲列表数据
  const playList = JSON.parse(JSON.stringify(state.get('playList').toJS()))
  const sequenceList = JSON.parse(
    JSON.stringify(state.get('sequencePlayList').toJS())
  )
  let currentIndex = state.get('currentIndex')
  // 找到对应歌曲再播放列表中的索引
  const fpIndex = FindIndex(song, playList)
  // 将其删除
  playList.splice(fpIndex, 1)
  // 如果删除的歌曲在当前播放列表的前面, 那么currentIndex-- ,让当前的歌曲正常播放
  if (fpIndex < currentIndex) currentIndex--

  // 在sequence列表中直接删除即可
  const fsindex = FindIndex(song, sequenceList)
  sequenceList.splice(fsindex, 1)

  return state.merge({
    playList: fromJS(playList),
    sequencePlayList: fromJS(sequenceList),
    currentIndex: fromJS(currentIndex),
  })
}
// 插入歌曲
const handleInsertSong = (state, song) => {
  // 拷贝两份数据
  const playList = JSON.parse(JSON.stringify(state.get('playList').toJS()))
  const sequenceList = JSON.parse(
    JSON.stringify(state.get('sequencePlayList').toJS())
  )
  let currentIndex = state.get('currentIndex')
  // 看看有没有同款
  let fpIndex = FindIndex(song, playList)
  // 如果是当前歌曲则不处理
  if (fpIndex === currentIndex && currentIndex !== -1) return state
  // 把歌曲放到当前播放曲目的下一个位置
  currentIndex++
  playList.splice(currentIndex, 1, song)
  // 如果列表中已经存在要添加的歌曲
  if (fpIndex > -1) {
    // 如果oldSong的索引比目前播放的歌曲的索引小, 那么删除它, 同时当前index--
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      // 否则直接删掉oldSOng
      playList.splice(fpIndex + 1, 1)
    }
  }
  // 处理sequenceList
  let sequenceIndex = FindIndex(playList[currentIndex], sequenceList) + 1
  let fsIndex = FindIndex(song, sequenceList)
  // 插入歌曲
  sequenceList.splice(sequenceIndex, 0, song)
  if (fsIndex > -1) {
    // 如果在前面就删掉, index--, 在后面就直接删掉
    if (sequenceIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
      sequenceIndex--
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  return state.merge({
    playList: fromJS(playList),
    sequencePlayList: fromJS(sequenceList),
    currentIndex: fromJS(currentIndex),
  })
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      return state.set('currentSong', action.data)
    case actionTypes.SET_FULL_SCREEN:
      return state.set('fullScreen', action.data)
    case actionTypes.SET_PALYING_STATE:
      return state.set('playing', action.data)
    case actionTypes.SET_SEQUENCE_PLAYLIST:
      return state.set('sequencePlayList', action.data)
    case actionTypes.SET_PLAYLIST:
      return state.set('playList', action.data)
    case actionTypes.SET_PLAY_MODE:
      return state.set('mode', action.data)
    case actionTypes.SET_CURRENT_INDEX:
      return state.set('currentIndex', action.data)
    case actionTypes.SET_SHOW_PLAYLIST:
      return state.set('showPlayList', action.data)
    case actionTypes.DELETE_SONG:
      return handleDeleteSong(state, action.data)
    case actionTypes.INSERT_SONG:
      return handleInsertSong(state, action.data)
    default:
      return state
  }
}
