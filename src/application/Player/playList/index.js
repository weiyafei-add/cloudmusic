import React, { useState, useRef, useCallback } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import {
  PlayListWrapper,
  ScrollWrapper,
  ListHeader,
  ListWrapper,
} from './style'
import {
  changeShowPlayList,
  changeCurrentIndex,
  changePlayMode,
  changePlayList,
  deleteSong,
  changeSequecePlayList,
  changePlayingState,
  changeCurrentSong,
} from '../Store/actionCreators'
import { prefixStyle, getName, FindIndex, shuffle } from '../../../api/utils'
import { playMode } from '../../../api/config'
import Scroll from '../../../baseUI/scroll'
import Confirm from '../../../baseUI/confirm'

function PlayList(props) {
  const dispatch = useDispatch()

  const {
    showPlayList,
    currentIndex,
    playList: immutablePlayList,
    sequencePlayList: immutableSequencePlayList,
    mode,
    currentSong: immutableCurrentSong,
  } = props
  const {
    togglePlayListDispatch,
    changeCurrentIndexDiapatch,
    changeModeDiapatch,
    changePlayListDispatch,
    deleteSongDispatch,
    clearDispatch,
  } = props
  const playListRef = useRef()
  const listWrapperRef = useRef()
  const confirmRef = useRef()
  const transform = prefixStyle('transform')
  // 是否允许滑动事件生效
  const [canTouch, setCanTouch] = useState(true)
  const listContentRef = useRef()
  const currentSong = immutableCurrentSong.toJS()
  const playList = immutablePlayList.toJS()
  const sequencePlayList = immutableSequencePlayList.toJS()

  const changeMode = () => {
    let newMode = (mode + 1) % 3
    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList)
      let index = FindIndex(currentSong, sequencePlayList)
      changeCurrentIndexDiapatch(index)
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList)
    } else {
      // 随机播放
      let newList = shuffle(sequencePlayList)
      let index = FindIndex(currentSong, newList)
      changePlayListDispatch(newList)
      changeCurrentIndexDiapatch(index)
    }
    changeModeDiapatch(newMode)
  }

  const getPlayMode = () => {
    let content, text
    if (mode === playMode.sequence) {
      content = '&#xe625;'
      text = '顺序播放'
    } else if (mode === playMode.loop) {
      content = '&#xe653;'
      text = '单曲循环'
    } else {
      content = '&#xe61b;'
      text = '随机播放'
    }
    return (
      <div>
        <i
          className="iconfont"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
          onClick={(e) => changeMode(e)}
        ></i>
        <span className="text">{text}</span>
      </div>
    )
  }
  // 定位当前歌曲再前面加上播放符号
  const getCurrentIcon = (item) => {
    const current = currentSong.id === item.id
    const className = current ? 'icon_play' : ''
    const content = current ? '&#xe6e3;' : ''
    return (
      <i
        className={`current iconfont ${className}`}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></i>
    )
  }
  const handleChangeCurrentIndex = (index) => {
    if (currentIndex === index) return
    changeCurrentIndexDiapatch(index)
  }
  const handleDeleteSong = (e, item) => {
    e.stopPropagation()
    deleteSongDispatch(item)
  }
  // 弹出confirm窗口
  const handleConfirm = () => {
    dispatch(changePlayList([]))
    dispatch(changeSequecePlayList([]))
    dispatch(changeCurrentIndex(-1))
    dispatch(changePlayingState(false))
    dispatch(changeShowPlayList(false))
    dispatch(changeCurrentSong({}))
  }
  const handleShowConfirm = () => {
    confirmRef.current.show()
  }
  // 首先初始化三个变量
  // 开始移动 记录Y值
  const [startY, setStartY] = useState(0)
  // touchStart事件是否以及被触发
  const [initialed, setInitialed] = useState(0)
  // 用户下滑的距离
  const [distance, setDistance] = useState(0)
  const handleTouchStart = (e) => {
    if (!canTouch || initialed) return
    // 记录值
    listWrapperRef.current.style['transition'] = ''
    setStartY(e.nativeEvent.touches[0].pageY)

    setInitialed(true)
  }
  const handleTOuchMove = (e) => {
    if (!canTouch || !initialed) return
    let distance = e.nativeEvent.touches[0].pageY - startY

    if (distance < 0) return
    setDistance(distance)
    listWrapperRef.current.style[transform] = `translate3d(0,${distance}px,0)`
  }
  const handleTouchEnd = (e) => {
    setInitialed(false)
    // 设置阈值为150px
    if (distance >= 150) {
      dispatch(changeShowPlayList(false))
    } else {
      // 反弹回去
      listWrapperRef.current.style['transition'] = `transform 0.3s`
      listWrapperRef.current.style[transform] = `translate3d(0px,0px,0px)`
      setDistance(0)
      setStartY(0)
    }
  }
  const handleScroll = (pos) => {
    let state = pos.y === 0
    setCanTouch(state)
  }
  return (
    <PlayListWrapper
      ref={playListRef}
      onClick={() => togglePlayListDispatch(false)}
    >
      <Confirm
        text="是否删除全部"
        cancelBtnText="取消"
        confirmBtnText="确定"
        handleConfirm={handleConfirm}
        ref={confirmRef}
      ></Confirm>
      <div
        className="list_wrapper"
        onClick={(e) => e.stopPropagation()}
        ref={listWrapperRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTOuchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ListHeader>
          <h1 className="title">
            {getPlayMode()}
            <span
              className="iconfont clear"
              onClick={() => handleShowConfirm()}
            >
              &#xe63d;
            </span>
          </h1>
        </ListHeader>
        <ScrollWrapper>
          <Scroll
            ref={listContentRef}
            bounceTop={false}
            onScroll={(pos) => handleScroll(pos)}
          >
            <ListWrapper>
              {playList.map((item, index) => {
                return (
                  <li
                    className="item"
                    key={item.id}
                    onClick={() => handleChangeCurrentIndex(index)}
                  >
                    {getCurrentIcon(item)}
                    <span className="text">
                      {item.name} - {getName(item.ar)}
                    </span>
                    <span className="like">
                      <i className="iconfont ">&#xe601;</i>
                    </span>
                    <span
                      className="delete"
                      onClick={(e) => handleDeleteSong(e, item)}
                    >
                      <i className="iconfont ">&#xe63d;</i>
                    </span>
                  </li>
                )
              })}
            </ListWrapper>
          </Scroll>
        </ScrollWrapper>
      </div>
    </PlayListWrapper>
  )
}
const mapStateToProps = (state) => ({
  showPlayList: state.getIn(['player', 'showPlayList']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
  mode: state.getIn(['player', 'mode']),
  currentSong: state.getIn(['player', 'currentSong']),
})
const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayListDispatch(data) {
      dispatch(changeShowPlayList(data))
    },
    // 切歌
    changeCurrentIndexDiapatch(data) {
      dispatch(changeCurrentIndex(data))
    },
    // 修改当前播放模式
    changeModeDiapatch(data) {
      dispatch(changePlayMode(data))
    },
    // 修改播放列表
    changePlayListDispatch(data) {
      dispatch(changePlayList(data))
    },
    // 删除一首歌曲
    deleteSongDispatch(data) {
      dispatch(deleteSong(data))
    },
    // 清除全部歌曲
    clearDispatch() {
      dispatch(changePlayList([]))
      dispatch(changeSequecePlayList([]))
      dispatch(changeCurrentIndex(-1))
      dispatch(changePlayingState(false))
      dispatch(changeShowPlayList(false))
      dispatch(changeCurrentSong({}))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PlayList))
