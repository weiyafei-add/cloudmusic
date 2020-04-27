import React, { useRef } from 'react'
import { MiniPlayerWrapper } from './style'
import { getName } from '../../../api/utils'
import { CSSTransition } from 'react-transition-group'
import ProgressCircle from '../../../baseUI/progress-circle'
function MiniPlayer(props) {
  const miniPlayerRef = useRef()
  const {
    song,
    fullScreen,
    toggleFullScreen,
    playing,
    percent,
    clickPlaying,
    togglePlayList,
  } = props
  const handleTogglePlayList = (e) => {
    togglePlayList(true)
    e.stopPropagation()
  }
  // mock数据
  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames={'mini'}
      onEnter={() => {
        miniPlayerRef.current.style.display = 'flex'
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = 'none'
      }}
    >
      <MiniPlayerWrapper
        ref={miniPlayerRef}
        onClick={() => toggleFullScreen(true)}
      >
        <div className="imgWrapper">
          <img
            className={`cdImg ${playing ? '' : 'pause'}`}
            width={'100%'}
            height={'100%'}
            src={song.al.picUrl}
            alt={'专辑图'}
          ></img>
        </div>
        <div className={'songInfo'}>
          <p>{song.name}</p>
          <p>{getName(song.ar)}</p>
        </div>
        <div className={'control'}>
          <ProgressCircle radius={32} percent={percent}>
            {playing ? (
              <i
                className="iconfont icon_mini"
                onClick={(e) => clickPlaying(e, false)}
              >
                &#xe650;
              </i>
            ) : (
              <i
                className="iconfont icon_mini icon-puased"
                onClick={(e) => clickPlaying(e, true)}
              >
                &#xe61e;
              </i>
            )}
          </ProgressCircle>
        </div>

        <div className={'control'} onClick={handleTogglePlayList}>
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerWrapper>
    </CSSTransition>
  )
}
export default React.memo(MiniPlayer)
