import React, { useRef, useEffect } from 'react'
import {
  NomalPlayerContainer,
  TopWrapper,
  Middle,
  Bottom,
  ProgressBarWrapper,
  LyricContainer,
  LyricWrapper,
} from './style'
import { getName } from '../../../api/utils'
import { CSSTransition } from 'react-transition-group'
import animations from 'create-keyframe-animation'
import { prefixStyle } from '../../../api/utils'
import ProgressBar from '../../../baseUI/progressBar'
import { formatPlayTime } from '../../../api/utils'
import { playMode } from '../../../api/config'
import Scroll from '../../../baseUI/scroll'
function NomalPlayer(props) {
  const {
    song,
    fullScreen,
    playing,
    percent,
    duration,
    currentTime,
    mode,
    currentLyric,
    currentLineNum,
    currentPlayingLyric,
  } = props
  const {
    toggleFullScree,
    clickPlaying,
    onProgressChange,
    handlePrev,
    handleNext,
    changeMode,
    togglePlayList,
  } = props
  const nomalPlayRef = useRef()
  const cdWrapperRef = useRef()
  const transform = prefixStyle('transform')
  const currentState = useRef('')
  const lyricScrollRef = useRef()
  const lyricLineRefs = useRef([])
  useEffect(() => {
    if (!lyricScrollRef.current) return
    let bScroll = lyricScrollRef.current.getBScroll()
    if (currentLineNum > 5) {
      // 保持当前歌词在第 5 条的位置
      let lineEl = lyricLineRefs.current[currentLineNum - 5].current
      bScroll.scrollToElement(lineEl, 1000)
    } else {
      // 当前歌词行数 <=5, 直接滚动到最顶端
      bScroll.scrollTo(0, 0, 1000)
    }
  }, [currentLineNum])
  // 启用帧动画
  const enter = () => {
    nomalPlayRef.current.style.display = 'block'
    const { x, y, scale } = _getPosAndScale()
    console.log(x, y, scale)
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0,0,0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0,0,0) scale(1)`,
      },
    }
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear',
      },
    })
    animations.runAnimation(cdWrapperRef.current, 'move')
  }
  // 计算偏移量 中心点到中心点的偏移
  const _getPosAndScale = () => {
    const targetWidth = 40
    const paddingLeft = 40
    const paddingBottom = 30
    const paddingTop = 80
    const width = window.innerWidth * 0.8
    const scale = targetWidth / width
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    return {
      x,
      y,
      scale,
    }
  }
  const afterEnter = () => {
    // 进入后解绑动画
    const cdWrapperDom = cdWrapperRef.current
    animations.unregisterAnimation('move')
    cdWrapperDom.style.animation = ''
  }
  const leave = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = 'all 0.4s'
    const { x, y, scale } = _getPosAndScale()
    cdWrapperDom.style[
      transform
    ] = `translate3d(${x}px,${y}px,0) scale(${scale})`
  }
  const afterLeave = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = ''
    cdWrapperDom.style[transform] = ''
    nomalPlayRef.current.style.display = 'none'
  }
  const getPlayMode = () => {
    let content
    if (mode === playMode.sequence) {
      content = '&#xe625;'
    } else if (mode === playMode.loop) {
      content = '&#xe653;'
    } else {
      content = '&#xe61b;'
    }
    return content
  }
  const touggleCurrentState = () => {
    if (currentState.current !== 'lyric') {
      currentState.current = 'lyric'
    } else {
      currentState.current = ''
    }
  }
  return (
    <CSSTransition
      in={fullScreen}
      timeout={400}
      classNames="nomal"
      mountOnEnter // 在元素enter的时候才挂载
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <NomalPlayerContainer ref={nomalPlayRef}>
        <div className={'background'}>
          <img
            src={song.al.picUrl + '?param=300x300'}
            width={'100%'}
            height={'100%'}
            alt="歌曲图片"
          ></img>
          <div className={'layer'}></div>
        </div>
        <TopWrapper className="top">
          <div className={'back'} onClick={() => toggleFullScree(false)}>
            <i className={'iconfont icon_back'}>&#xe662;</i>
          </div>
          <div className={'title'}>
            <p>{song.name}</p>
            <p>{getName(song.ar)}</p>
          </div>
        </TopWrapper>
        <Middle ref={cdWrapperRef} onClick={touggleCurrentState}>
          <CSSTransition
            in={currentState.current !== 'lyric'}
            classNames="fade"
            timeout={400}
          >
            <div
              className="cd"
              style={{
                visibility:
                  currentState.current !== 'lyric' ? 'visible' : 'hidden',
              }}
            >
              <img
                className={`play ${playing ? '' : 'pause'}`}
                src={song.al.picUrl + '?param=300x300'}
                alt="cd"
                width={'100%'}
                height={'100%'}
              ></img>
              <p className="playing_lyric">{currentPlayingLyric}</p>
            </div>
          </CSSTransition>
          <CSSTransition
            timeout={400}
            in={currentState.current === 'lyric'}
            classNames="fade"
          >
            <LyricContainer>
              <Scroll ref={lyricScrollRef}>
                <LyricWrapper
                  style={{
                    visibility:
                      currentState.current === 'lyric' ? 'visible' : 'hidden',
                  }}
                  className="lyric_wrapper"
                >
                  {currentLyric ? (
                    currentLyric.lines.map((item, index) => {
                      // 拿到每一行歌词的 DOM 对象，后面滚动歌词需要！
                      lyricLineRefs.current[index] = React.createRef()
                      return (
                        <p
                          className={`text ${
                            currentLineNum === index ? 'current' : ''
                          }`}
                          key={item + index}
                          ref={lyricLineRefs.current[index]}
                        >
                          {item.txt}
                        </p>
                      )
                    })
                  ) : (
                    <p className="text pure"> 纯音乐，请欣赏。</p>
                  )}
                </LyricWrapper>
              </Scroll>
            </LyricContainer>
          </CSSTransition>
        </Middle>
        <Bottom className="bottom">
          <ProgressBarWrapper>
            <span className="time time-1">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar
                percent={percent}
                percentChanges={onProgressChange}
              ></ProgressBar>
            </div>
            <span className="time time-2">{formatPlayTime(duration)}</span>
          </ProgressBarWrapper>

          <div className="control">
            <div>
              <i
                onClick={changeMode}
                className="iconfont"
                dangerouslySetInnerHTML={{
                  __html: getPlayMode(),
                }}
              ></i>
            </div>
            <div>
              <i className="iconfont" onClick={handlePrev}>
                &#xe6e1;
              </i>
            </div>
            <div className="center">
              <i
                className="iconfont"
                onClick={(e) => clickPlaying(e, !playing)}
                dangerouslySetInnerHTML={{
                  __html: playing ? '&#xe723;' : '&#xe731;',
                }}
              ></i>
            </div>
            <div>
              <i className="iconfont" onClick={handleNext}>
                &#xe718;
              </i>
            </div>
            <div>
              <i onClick={() => togglePlayList(true)} className="iconfont">
                &#xe640;
              </i>
            </div>
          </div>
        </Bottom>
      </NomalPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(NomalPlayer)
