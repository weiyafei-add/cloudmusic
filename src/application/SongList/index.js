import React from 'react'
import { SongList, SongItem } from './style'
import { getName } from '../../api/utils'
import { connect } from 'react-redux'
import {
  changeSequecePlayList,
  changeCurrentIndex,
  changePlayList,
} from '../Player/Store/actionCreators'
const SongsList = React.forwardRef((props, refs) => {
  const { songs, showCollect } = props
  // const { collectCount, showCollect, songs } = props
  // const totalCount = songs.length
  // 接受触发动画的函数
  const {
    changePlayListDispatch,
    changeCurrentIndexDispatch,
    changeSequecePlayListDispatch,
  } = props
  const { musicAnimation } = props
  const selectItem = (e, index) => {
    changePlayListDispatch(songs)
    changeSequecePlayListDispatch(songs)
    changeCurrentIndexDispatch(index)
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY)
  }
  const songItem = (song) => {
    return song.map((item, index) => (
      <div key={item.name + index} onClick={(e) => selectItem(e, index)}>
        <div className="index">{index + 1}</div>
        <div className="songDesc">
          <h1>{item.name}</h1>
          <h1>{getName(item.ar, item.al)}</h1>
        </div>
      </div>
    ))
  }
  const renderCollect = () => {
    return (
      <div className="Collect">
        <i className="iconfont add">&#xe62d;</i>

        <span>{`收藏(22.7万)`}</span>
      </div>
    )
  }
  return (
    <SongList ref={refs} showBackground={props.showBackground}>
      <div className="first_line">
        <div className="playALl">
          <i className="iconfont">&#xe6e3;</i>
          <span>播放全部</span>
          <span className="songCount">{`(共${10}首)`}</span>
        </div>
        {showCollect ? renderCollect() : null}
      </div>
      <SongItem>{songItem(songs)}</SongItem>
    </SongList>
  )
})
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    changePlayListDispatch(data) {
      dispatch(changePlayList(data))
    },
    changeCurrentIndexDispatch(data) {
      dispatch(changeCurrentIndex(data))
    },
    changeSequecePlayListDispatch(data) {
      dispatch(changeSequecePlayList(data))
    },
  }
}
export default connect(null, mapDispatchToProps)(React.memo(SongsList))
