import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  changeCurrentIndex,
  changeCurrentSong,
  changeFullScreen,
  changePlayList,
  changePlayMode,
  changePlayingState,
  changeSequecePlayList,
  changeShowPlayList,
} from './Store/actionCreators'
import MiniPlayer from './miniPlayer/index'
import NomalPlayer from './nomalPlayer/index'
import { getSongUrl, isEmptyObject, FindIndex, shuffle } from '../../api/utils'
import Toast from '../../baseUI/Toast'
import { playMode } from '../../api/config'
import PlayList from './playList'
import { getLyricRequest } from '../../api/request'
import Lyric from '../../api/lyric-parse'
function Player(props) {
  const {
    fullScreen,
    playing,
    currentIndex,
    currentSong: immutableSongs,
    mode,
    sequencePlayList: immutableSequencePlayList,
    playList: immutablePlayList,
    showPlayList,
  } = props
  const {
    toggleFullScreenDispatch,
    togglePlayingDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changePlayListDispatch,
    changeModeDispatch,
    togglePlayListDiapatch,
  } = props

  const currentSong = immutableSongs.toJS()
  const sequencePlayList = immutableSequencePlayList.toJS()
  const playList = immutablePlayList.toJS()
  const audioRef = useRef()
  const toastRef = useRef()
  const songReady = useRef(true)
  const currentLyric = useRef()
  const currentLineNum = useRef(0)
  const [modeText, setModeText] = useState('')
  const [currentPlayingLyric, setPlayingLyric] = useState('')
  // 目前播放时间
  const [currentTime, setCurrentTime] = useState(0)
  // 歌曲总时长
  const [duration, setDuration] = useState(0)
  // 歌曲播放进度
  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration
  // 记录当前的歌曲
  const [preSong, setPreSong] = useState({})

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady.current
    )
      return
    let current = playList[currentIndex]
    changeCurrentDispatch(current) //赋值currentSong
    setPreSong(current)
    songReady.current = false // 把标志位置为false, 表示现在新的资源没有缓冲完成, 不能切歌
    audioRef.current.src = getSongUrl(current.id)
    setTimeout(() => {
      audioRef.current.play().then(() => {
        songReady.current = true
      })
    })
    togglePlayingDispatch(true) //播放状态
    getLyric(current.id)
    setCurrentTime(0) //从头开始播放
    setDuration((current.dt / 1000) | 0) //时长
  }, [playList, currentIndex])
  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause()
  }, [playing])
  // 获取歌词
  const getLyric = (id) => {
    let lyric = ''
    getLyricRequest(id)
      .then((res) => {
        lyric = res.lrc.lyric
        // 如果没有歌词,置为null 并返回
        if (!lyric) {
          currentLyric.current = null
          return
        }
        // 这里 currentLyric.current 是Lyric的实例对象
        currentLyric.current = new Lyric(lyric, handleLyric)
        // 播放
        console.log('1', currentLyric.current)
        currentLyric.current.play()
        currentLineNum.current = 0
        currentLyric.current.seek(0)
      })
      .catch(() => {
        songReady.current = true
        audioRef.current.play()
      })
  }
  const handleLyric = ({ lineNum, txt }) => {
    if (!currentLyric.current) return
    currentLineNum.current = lineNum
    setPlayingLyric(txt)
  }
  const clickPlaying = (e, bool) => {
    e.stopPropagation()
    togglePlayingDispatch(bool)
    if (currentLyric.current) {
      currentLyric.current.togglePlay(currentTime * 1000)
    }
  }
  const updateTime = (e) => {
    setCurrentTime(e.target.currentTime)
  }
  const onProgressChange = (curPercent) => {
    const newTime = curPercent * duration
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
    if (!playing) {
      togglePlayingDispatch(true)
    }
    if (currentLyric.current) {
      currentLyric.current.seek(newTime * 1000)
    }
  }
  // 一首歌循环播放
  const handleLoop = () => {
    audioRef.current.currentTime = 0
    togglePlayingDispatch(true)
    audioRef.current.play()
  }
  const handlePrev = () => {
    // 当播放列表只有一首歌曲
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex - 1
    if (index < 0) index = playList.length - 1
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
  }
  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex + 1
    if (index === playList.length) index = 0
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
  }
  const changeMode = () => {
    let newMode = (mode + 1) % 3
    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList)
      let index = FindIndex(currentSong, sequencePlayList)
      changeCurrentIndexDispatch(index)
      setModeText('顺序播放')
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList)
      setModeText('单曲循环')
    } else if (newMode === 2) {
      // 随机播放
      let newList = shuffle(sequencePlayList)
      let index = FindIndex(currentSong, newList)
      changePlayListDispatch(newList)
      changeCurrentIndexDispatch(index)
      setModeText('随机播放')
    }
    changeModeDispatch(newMode)
    toastRef.current.show()
  }
  // 播放完成之后
  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop()
    } else {
      handleNext()
    }
  }
  const handleError = () => {
    songReady.current = true
    alert('播放出错')
  }
  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          song={currentSong}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          playing={playing}
          percent={percent}
          togglePlayList={togglePlayListDiapatch}
        ></MiniPlayer>
      )}
      {isEmptyObject(currentSong) ? null : (
        <NomalPlayer
          song={currentSong}
          fullScreen={fullScreen}
          toggleFullScree={toggleFullScreenDispatch}
          playing={playing}
          clickPlaying={clickPlaying}
          percent={percent} // 进度
          duration={duration} // 总时长
          onProgressChange={onProgressChange}
          currentTime={currentTime} // 播放时长
          handlePrev={handlePrev}
          handleNext={handleNext}
          mode={mode}
          changeMode={changeMode}
          togglePlayList={togglePlayListDiapatch}
          currentLyric={currentLyric.current}
          currentLineNum={currentLineNum.current}
          currentPlayingLyric={currentPlayingLyric}
        ></NomalPlayer>
      )}

      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
      <Toast ref={toastRef} text={modeText}></Toast>
      {showPlayList ? <PlayList></PlayList> : ''}
    </div>
  )
}
const mapStateToProps = (state) => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
  playList: state.getIn(['player', 'playList']),
  mode: state.getIn(['player', 'mode']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  showPlayList: state.getIn(['player', 'showPlayList']),
  currentSong: state.getIn(['player', 'currentSong']),
})
const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayingDispatch(data) {
      dispatch(changePlayingState(data))
    },
    toggleFullScreenDispatch(data) {
      dispatch(changeFullScreen(data))
    },
    togglePlayListDiapatch(data) {
      dispatch(changeShowPlayList(data))
    },
    changeCurrentIndexDispatch(data) {
      dispatch(changeCurrentIndex(data))
    },
    changeCurrentDispatch(data) {
      dispatch(changeCurrentSong(data))
    },
    changeModeDispatch(data) {
      dispatch(changePlayMode(data))
    },
    changePlayListDispatch(data) {
      dispatch(changePlayList(data))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))
